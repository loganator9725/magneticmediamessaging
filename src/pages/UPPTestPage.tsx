import { useUPPEvaluator } from "@/hooks/useUPPEvaluator";
import sampleMetrics from "@/data/sample_metrics.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function UPPTestPage() {
  const { runEvaluation, isEvaluating, results, error } = useUPPEvaluator();

  const handleEvaluateWithSampleData = async () => {
    // Using the "metrics" array from the imported JSON
    await runEvaluation(sampleMetrics.metrics);
  };

  const handleEvaluateWithSyntheticData = async () => {
    // Pass no data to use the backend's synthetic data generation
    await runEvaluation();
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">UPP Strategy Evaluator</h1>
        <p className="text-lg text-muted-foreground">
          Test the Universal Predictive Protocol evaluator with sample or synthetic data.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Run Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <p>
              Click a button to run the simulation. The backend function will
              run 1000 iterations for each strategy and return a recommendation.
            </p>
            <Button onClick={handleEvaluateWithSampleData} disabled={isEvaluating}>
              {isEvaluating ? "Evaluating..." : "Evaluate with Sample Data"}
            </Button>
            <Button
              onClick={handleEvaluateWithSyntheticData}
              disabled={isEvaluating}
              variant="secondary"
            >
              {isEvaluating ? "Evaluating..." : "Evaluate with Synthetic Data"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isEvaluating && <p>Evaluating, please wait...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {results && (
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  Recommended Strategy: {results.recommendation.toUpperCase()}
                </h3>
                <p>
                  <strong>Combined Score:</strong>{" "}
                  {results.summary.combinedScore.toFixed(4)}
                </p>
                <p>
                  <strong>Avg Response Time:</strong>{" "}
                  {results.summary.avgResponseTime.toFixed(2)}ms
                </p>
                <p>
                  <strong>Avg Energy Cost:</strong>{" "}
                  {results.summary.avgEnergyCost.toFixed(4)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {results && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Detailed Strategy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.results.map((result) => (
                <Card key={result.strategy}>
                  <CardHeader>
                    <CardTitle className="capitalize">{result.strategy}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      <strong>Score:</strong> {result.combinedScore.toFixed(4)}
                    </p>
                    <p>
                      <strong>Avg Time:</strong> {result.avgResponseTime.toFixed(2)}ms
                    </p>
                    <p>
                      <strong>Avg Energy:</strong> {result.avgEnergyCost.toFixed(4)}
                    </p>
                     <p>
                      <strong>Sharpe (Reward):</strong> {result.sharpeRatioReward.toFixed(4)}
                    </p>
                     <p>
                      <strong>Sharpe (Latency):</strong> {result.sharpeRatioLatency.toFixed(4)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UPPTestPage;
