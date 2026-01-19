import { Config, Context } from "@netlify/edge-functions";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

// --- UPP CONFIGURATION (The "Secret Sauce") ---
const TASK_HORIZON_MS = 1500; // T: The standard "Hesitation Window"
const CONVERSION_THRESHOLD = 7.5; // The score required to fire the offer

// --- THE DSE SENSOR (Client-Side Injection) ---
// This Javascript payload is inserted into the user's browser automatically.
const DSE_SCRIPT = `
<script>
  (function() {
    console.log("👁️ EECTO System Active");
    let lastPos = { x: 0, y: 0, t: Date.now() };
    const endpoint = '/upp-decision';
    let offerTriggered = false;
    
    // Deep Signal Extraction: Track Velocity & Intent
    document.addEventListener('mousemove', (e) => {
      if (offerTriggered) return; // Stop tracking if we already sold them
      
      const now = Date.now();
      if (now - lastPos.t < 100) return; // Sample at 10hz (efficient)

      // Calculate pure pixel velocity
      const dist = Math.sqrt(Math.pow(e.clientX - lastPos.x, 2) + Math.pow(e.clientY - lastPos.y, 2));
      const velocity = dist / (now - lastPos.t);
      
      // TRIGGER: If "Hesitation" detected (Low Velocity + Not Stopped)
      if (velocity < 0.2 && velocity > 0.0) {
        fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            t_client: now,
            v: velocity,
            hover: e.target.tagName
          })
        })
        .then(r => r.json())
        .then(cmd => {
          if(cmd.action === 'TRIGGER_OFFER') {
            renderOffer(cmd);
            offerTriggered = true;
          }
        });
      }
      lastPos = { x: e.clientX, y: e.clientY, t: now };
    });

    function renderOffer(cmd) {
      if(document.getElementById('upp-modal')) return;
      const modal = document.createElement('div');
      modal.id = 'upp-modal';
      // High-contrast, "Terminal Style" offer box
      modal.style = "position:fixed; bottom:20px; right:20px; background:#111; color:#0f0; padding:20px; z-index:9999; border: 2px solid #0f0; font-family: monospace; box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);";
      modal.innerHTML = "<strong>⚡ " + cmd.type + "</strong><br>" + cmd.value;
      document.body.appendChild(modal);
    }
  })();
</script>
`;

// --- THE EDGE BRAIN (Server-Side Logic) ---
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // MODE 1: THE BRAIN (API Decision)
  // This runs when the browser "phones home" with hesitation data.
  if (url.pathname === "/upp-decision" && request.method === "POST") {
    try {
      const data = await request.json();
      
      // 1. Relativistic Correction (L)
      const now = Date.now();
      const latency_L = Math.max(0, now - data.t_client); 
      
      // 2. Contextual Adjustment (Geo-Spatial)
      // If user is far away (high latency risk), we widen the window
      let adjusted_T = TASK_HORIZON_MS;
      if (context.geo?.city === "Unknown" || !context.geo?.city) {
         adjusted_T += 200; 
      }

      // 3. THE PATENT FORMULA: Fidelity = 1 - (L / T)
      const fidelity = Math.max(0, 1 - (latency_L / adjusted_T));

      // 4. Interest Calculation (i)
      let interest_i = 0;
      if (data.v < 0.05) interest_i += 6.0; // Extreme focus (almost stopped)
      else if (data.v < 0.2) interest_i += 4.0; // Standard hesitation
      if (data.hover === "BUTTON" || data.hover === "A") interest_i += 4.0; // Intent to click

      // 5. Final UPP Signal
      const upp_signal = interest_i * fidelity;

      // Decision
      if (upp_signal > CONVERSION_THRESHOLD) {
        return new Response(JSON.stringify({
          action: "TRIGGER_OFFER",
          type: "UPP_DISCOUNT",
          value: `system_grant: 10% OFF<br>latency_comp: ${latency_L}ms`,
          confidence: upp_signal.toFixed(2)
        }), { headers: { "Content-Type": "application/json" }});
      }

      return new Response(JSON.stringify({ action: "MONITOR" }));
      
    } catch (e) {
      return new Response(JSON.stringify({ error: "Calculation Failed" }), { status: 500 });
    }
  }

  // MODE 2: THE SURGEON (Injection)
  // This runs on every normal page load.
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on("body", {
        append(element) {
          element.onContent(DSE_SCRIPT, { html: true });
        },
      })
      .transform(response);
  }

  return response;
};

// Apply to all routes
export const config: Config = {
  path: "/*",
  excludedPath: ["/*.css", "/*.js", "/*.png", "/*.jpg", "/*.svg", "/*.ico"]
};