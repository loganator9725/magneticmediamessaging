import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
if (!RESEND_API_KEY) {
  console.warn("Warning: RESEND_API_KEY is not set. Sending will fail until set in env.");
}
const resend = new Resend(RESEND_API_KEY);

const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@magneticmediamessaging.com";
const FROM_NAME = Deno.env.get("FROM_NAME") || "Magnetic Media & Messaging";

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
  recipientEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, recipientEmail }: ContactEmailRequest = await req.json();

    console.log("Sending contact email from (submitter):", email, "to (owner):", recipientEmail);

    // Validate required fields
    if (!name || !email || !message || !recipientEmail) {
      throw new Error("Missing required fields: name, email, message, recipientEmail are required");
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured in the environment. Cannot send email.");
    }

    // Build friendly from header using configured FROM_EMAIL/FROM_NAME
    const fromHeader = `${FROM_NAME} <${FROM_EMAIL}>`;

    // Send email to business owner
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: fromHeader,
        to: [recipientEmail],
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">This email was sent from the Magnetic Media & Messaging contact form.</p>
        `,
      });
      console.log("Owner email sent. Resend response:", emailResponse);
    } catch (error) {
      console.error("CRITICAL: Failed to send owner notification email.", error);
      throw new Error(`Failed to send email to owner: ${error.message}`);
    }

    // Send confirmation email to the sender
    let confirmationResponse;
    try {
      confirmationResponse = await resend.emails.send({
        from: fromHeader,
        to: [email],
        replyTo: FROM_EMAIL,
        subject: "We received your message!",
        html: `
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
        `,
      });
      console.log("Confirmation email sent to submitter. Resend response:", confirmationResponse);
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
