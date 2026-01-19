/**
 * UPP Strategy Evaluator - Backend Edge Function
 * Runs 1000 simulations across different strategies and calculates Sharpe ratios
 * to determine optimal performance/sustainability balance
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MetricData {
    strategy: string;
    responseTimeMs: number;
    energyCost: number;
    timestamp?: string;
}

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

/**
 * Calculate mean of an array
 */
const mean = (arr: number[]): number => {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
};

/**
 * Calculate standard deviation
 */
const stdDev = (arr: number[]): number => {
    const avg = mean(arr);
    const squareDiffs = arr.map(val => Math.pow(val - avg, 2));
    return Math.sqrt(mean(squareDiffs));
};

/**
 * Simulate strategy performance based on real data or synthetic generation
 */
const simulateStrategy = (strategy: string, iterations: number, realData?: MetricData[]): MetricData[] => {
    const results: MetricData[] = [];

    // Use real data if available and contains data for the current strategy
    const strategySpecificRealData = realData?.filter(d => d.strategy === strategy);
    if (strategySpecificRealData && strategySpecificRealData.length > 0) {
        console.log(`[UPP Evaluator] Using ${strategySpecificRealData.length} real data points for ${strategy} simulation.`);
        for (let i = 0; i < iterations; i++) {
            // Sample from the real data distribution
            const sample = strategySpecificRealData[Math.floor(Math.random() * strategySpecificRealData.length)];
            results.push(sample);
        }
        return results;
    }
    
    // Use real data if available, otherwise generate synthetic data
    const baseMetrics = {
        "cache-first": { responseTime: 50, energyCost: 0.1 },
        "db-priority": { responseTime: 120, energyCost: 0.3 },
        "edge-compute": { responseTime: 80, energyCost: 0.2 },
        "hybrid": { responseTime: 70, energyCost: 0.15 }
    };

    const base = baseMetrics[strategy as keyof typeof baseMetrics] || baseMetrics["hybrid"];

    for (let i = 0; i < iterations; i++) {
        // Add random variance to simulate real-world conditions
        const responseTime = base.responseTime + (Math.random() - 0.5) * 40;
        const energyCost = base.energyCost + (Math.random() - 0.5) * 0.1;
        
        results.push({
            strategy,
            responseTimeMs: Math.max(10, responseTime),
            energyCost: Math.max(0.01, energyCost)
        });
    }

    return results;
};

/**
 * Calculate Sharpe-style ratios for strategy evaluation
 */
const calculateSharpeRatios = (metrics: MetricData[]): StrategyResult => {
    const responseTimes = metrics.map(m => m.responseTimeMs);
    const energyCosts = metrics.map(m => m.energyCost);
    
    // Calculate reward as inverse of response time (higher = better)
    const rewards = responseTimes.map(rt => 1000 / rt);
    
    const avgResponseTime = mean(responseTimes);
    const avgEnergyCost = mean(energyCosts);
    const stdDevResponseTime = stdDev(responseTimes);
    const stdDevEnergyCost = stdDev(energyCosts);
    const avgReward = mean(rewards);
    const stdDevReward = stdDev(rewards);
    
    // Sharpe Ratio 1: mean(reward) / stddev(reward)
    const sharpeRatioReward = stdDevReward === 0 ? 0 : avgReward / stdDevReward;
    
    // Sharpe Ratio 2: mean(reward) / stddev(latency)
    const sharpeRatioLatency = stdDevResponseTime === 0 ? 0 : avgReward / stdDevResponseTime;
    
    // Get weights from environment variables, with defaults to maintain original behavior
    const rewardWeight = parseFloat(Deno.env.get("UPP_REWARD_WEIGHT") ?? "1");
    const latencyWeight = parseFloat(Deno.env.get("UPP_LATENCY_WEIGHT") ?? "1");
    const sustainabilityWeight = parseFloat(Deno.env.get("UPP_SUSTAINABILITY_WEIGHT") ?? "1");

    // Combined score: balance both ratios with sustainability factor
    const sustainabilityFactor = sustainabilityWeight / avgEnergyCost;
    const combinedScore = (rewardWeight * sharpeRatioReward + latencyWeight * sharpeRatioLatency) * sustainabilityFactor;
    
    return {
        strategy: metrics[0].strategy,
        avgResponseTime,
        avgEnergyCost,
        stdDevResponseTime,
        stdDevEnergyCost,
        sharpeRatioReward,
        sharpeRatioLatency,
        combinedScore
    };
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { realData, iterations = 1000 } = await req.json().catch(() => ({}));
        
        console.log("[UPP Evaluator] Starting strategy evaluation...");
        console.log(`[UPP Evaluator] Running ${iterations} iterations per strategy`);
        
        const strategies = ["cache-first", "db-priority", "edge-compute", "hybrid"];
        const results: StrategyResult[] = [];
        
        // Run simulations for each strategy
        for (const strategy of strategies) {
            console.log(`[UPP Evaluator] Simulating ${strategy}...`);
            
            const metrics = simulateStrategy(strategy, iterations, realData);
            const result = calculateSharpeRatios(metrics);
            results.push(result);
            
            console.log(`[UPP Evaluator] ${strategy} complete`);
            console.log(`  - Avg Response Time: ${result.avgResponseTime.toFixed(2)}ms`);
            console.log(`  - Avg Energy Cost: ${result.avgEnergyCost.toFixed(4)}`);
            console.log(`  - Sharpe Ratio (Reward): ${result.sharpeRatioReward.toFixed(4)}`);
            console.log(`  - Sharpe Ratio (Latency): ${result.sharpeRatioLatency.toFixed(4)}`);
            console.log(`  - Combined Score: ${result.combinedScore.toFixed(4)}`);
        }
        
        // Determine best strategy
        const bestStrategy = results.reduce((best, current) => 
            current.combinedScore > best.combinedScore ? current : best
        );
        
        console.log("\n[UPP Evaluator] ===== RECOMMENDATION =====");
        console.log(`[UPP Evaluator] Best Strategy: ${bestStrategy.strategy.toUpperCase()}`);
        console.log(`[UPP Evaluator] Combined Score: ${bestStrategy.combinedScore.toFixed(4)}`);
        console.log(`[UPP Evaluator] Avg Response Time: ${bestStrategy.avgResponseTime.toFixed(2)}ms`);
        console.log(`[UPP Evaluator] Avg Energy Cost: ${bestStrategy.avgEnergyCost.toFixed(4)}`);
        console.log("[UPP Evaluator] ===========================\n");
        
        return new Response(
            JSON.stringify({
                success: true,
                recommendation: bestStrategy.strategy,
                results,
                summary: {
                    bestStrategy: bestStrategy.strategy,
                    combinedScore: bestStrategy.combinedScore,
                    avgResponseTime: bestStrategy.avgResponseTime,
                    avgEnergyCost: bestStrategy.avgEnergyCost
                }
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.error("[UPP Evaluator] Error:", error);
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
