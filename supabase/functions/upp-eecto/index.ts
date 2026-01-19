import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FidelityRequest {
  latency_L: number;
  adjusted_T: number;
}

interface FidelityConstants {
  constant1: number;
  scaleFactor: number;
}

/**
 * Calculates the proprietary fidelity metric based on input values and secret constants.
 * This function isolates the core intellectual property.
 * @param latency_L - The observed latency.
 * @param adjusted_T - The adjusted target time.
 * @param constantsJson - A JSON string containing the constants for the formula.
 * @returns The calculated fidelity score.
 */
function calculate_proprietary_metric(latency_L: number, adjusted_T: number, constantsJson: string): number {
    const defaultConstants: FidelityConstants = { constant1: 1, scaleFactor: 1 };
    let constants: FidelityConstants = defaultConstants;

    if (constantsJson) {
        try {
            const parsedConstants = JSON.parse(constantsJson);
            // Basic validation to ensure the parsed object has the right shape
            if (typeof parsedConstants.constant1 === 'number' && typeof parsedConstants.scaleFactor === 'number') {
                constants = parsedConstants;
            } else {
                 console.warn("SECRET_CONSTANTS JSON is malformed, using default values.");
            }
        } catch (e) {
            console.warn("Could not parse SECRET_CONSTANTS JSON, using default values.", e.message);
        }
    }

    const { constant1, scaleFactor } = constants;
    return Math.max(0, constant1 - (latency_L / adjusted_T) * scaleFactor);
}


serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { latency_L, adjusted_T }: FidelityRequest = await req.json();

        if (latency_L === undefined || adjusted_T === undefined) {
            throw new Error("Missing required fields: latency_L and adjusted_T are required");
        }
        
        // Load the secret constants from environment variables.
        const constantsJson = Deno.env.get("SECRET_CONSTANTS") || "{}";
        
        // Calculate fidelity using the abstracted function.
        const fidelity = calculate_proprietary_metric(latency_L, adjusted_T, constantsJson);

        return new Response(
            JSON.stringify({ success: true, fidelity }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
