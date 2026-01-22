import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { encode } from "https://deno.land/std@0.190.0/encoding/base64url.ts";

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
const GOOGLE_REFRESH_TOKEN = Deno.env.get("GOOGLE_REFRESH_TOKEN") || "";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  console.warn("Warning: Google API credentials are not set. Sending will fail until set in env.");
}

const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@magneticmediamessaging.com";
const FROM_NAME = Deno.env.get("FROM_NAME") || "Magnetic Media & Messaging";
const RECIPIENT_EMAIL = Deno.env.get("RECIPIENT_EMAIL") || "jennifer@magneticmediamessaging.com";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to get access token:", error);
    throw new Error(`Google API error: ${response.statusText}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

async function sendGmail(
  accessToken: string,
  to: string,
  from: string,
  subject: string,
  body: string,
  replyTo?: string
) {
  const emailContent = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset="UTF-8"`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    ``,
    body,
  ].join("\n");

  const encodedEmail = encode(new TextEncoder().encode(emailContent));

  const response = await fetch(
    "https://www.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        raw: encodedEmail,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to send email:", error);
    throw new Error(`Gmail API error: ${response.statusText}`);
  }

  return response.json();
}


const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email from (submitter):", email, "to (owner):", RECIPIENT_EMAIL);

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, and message are required");
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
      throw new Error("Google API credentials are not configured in the environment. Cannot send email.");
    }

    const accessToken = await getAccessToken();

    // Build friendly from header using configured FROM_EMAIL/FROM_NAME
    const fromHeader = `${FROM_NAME} <${FROM_EMAIL}>`;

    // Send email to business owner
    let emailResponse;
    try {
      const ownerSubject = `New Contact Form Submission from ${name}`;
      const ownerBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from the Magnetic Media & Messaging contact form.</p>
      `;
      emailResponse = await sendGmail(accessToken, RECIPIENT_EMAIL, fromHeader, ownerSubject, ownerBody, email);
      console.log("Owner email sent. Gmail API response:", emailResponse);
    } catch (error) {
      console.error("CRITICAL: Failed to send owner notification email.", error);
      throw new Error(`Failed to send email to owner: ${error.message}`);
    }

    // Send confirmation email to the sender
    let confirmationResponse;
    try {
      const confirmationSubject = "We received your message!";
      const confirmationBody = `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>${FROM_NAME}</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          ${FROM_EMAIL}<br>
          Creating a stir with stories that inspire trust and visibility.
        </p>
      `;
      confirmationResponse = await sendGmail(accessToken, email, fromHeader, confirmationSubject, confirmationBody);
      console.log("Confirmation email sent to submitter. Gmail API response:", confirmationResponse);
    } catch (error) {
        // Non-critical error, just log it. The main function succeeded.
        console.warn("Warning: Failed to send confirmation email to submitter.", error);
    }

    return new Response(JSON.stringify({ owner: emailResponse, confirmation: confirmationResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);