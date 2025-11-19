import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StrategyResult {
  strategy: string;
  avgResponseTime: number;
  avgEnergyCost: number;
  stdDevResponseTime: number;
  stdDevEnergyCost: number;
  sharpeRatioReward: number;
  sharpeRatioLatency: number;
  combinedScore: number;
}

interface EvaluationResult {
  success: boolean;
  recommendation: string;
  results: StrategyResult[];
  summary: {
    bestStrategy: string;
    combinedScore: number;
    avgResponseTime: number;
    avgEnergyCost: number;
  };
}

/**
 * Hook to evaluate UPP strategies via backend edge function
 */
export const useUPPEvaluator = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runEvaluation = async (realData?: any[], iterations = 1000) => {
    setIsEvaluating(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "upp-evaluator",
        {
          body: { realData, iterations },
        }
      );

      if (functionError) throw functionError;

      setResults(data as EvaluationResult);
      console.log("[UPP] Evaluation complete:", data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[UPP] Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return {
    runEvaluation,
    isEvaluating,
    results,
    error,
  };
};
