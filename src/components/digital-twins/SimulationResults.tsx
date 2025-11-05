import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Loader2
} from 'lucide-react';

interface SimulationResultsProps {
  simulation: any;
}

export const SimulationResults = ({ simulation }: SimulationResultsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'running': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {simulation.name}
              <Badge variant={getStatusColor(simulation.status)} className="gap-1">
                {getStatusIcon(simulation.status)}
                {simulation.status}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              {simulation.description || 'No description provided'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Parameters */}
        <div>
          <h4 className="font-medium text-sm mb-3">Input Parameters</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(simulation.input_parameters || {}).map(([key, value]: [string, any]) => (
              <div key={key} className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground capitalize">
                  {key.replace(/_/g, ' ')}
                </p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Outcome - Only if completed */}
        {simulation.status === 'completed' && simulation.predicted_outcome && (
          <>
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Predicted Outcome
              </h4>
              
              {/* Success Probability */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Success Probability</span>
                  <span className="font-medium">
                    {simulation.predicted_outcome.success_probability}%
                  </span>
                </div>
                <Progress value={simulation.predicted_outcome.success_probability} />
              </div>

              {/* Expected Results */}
              {simulation.predicted_outcome.expected_results && (
                <Alert className="mb-4">
                  <AlertDescription>
                    {simulation.predicted_outcome.expected_results}
                  </AlertDescription>
                </Alert>
              )}

              {/* Key Metrics */}
              {simulation.predicted_outcome.key_metrics && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(simulation.predicted_outcome.key_metrics).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                      <p className="text-xs text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="font-medium text-lg">{typeof value === 'number' ? value.toFixed(2) : value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confidence Score */}
            {simulation.confidence_score && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">AI Confidence Score</span>
                  <span className="font-medium">{simulation.confidence_score}%</span>
                </div>
                <Progress value={simulation.confidence_score} className="h-2" />
              </div>
            )}

            {/* Risks */}
            {simulation.result_data?.risks && simulation.result_data.risks.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Identified Risks
                </h4>
                <ul className="space-y-2">
                  {simulation.result_data.risks.map((risk: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {simulation.result_data?.recommendations && simulation.result_data.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {simulation.result_data.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Error Message */}
        {simulation.status === 'failed' && simulation.error_message && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{simulation.error_message}</AlertDescription>
          </Alert>
        )}

        {/* Timestamps */}
        <div className="text-xs text-muted-foreground flex gap-4 pt-4 border-t">
          <div>
            <span className="font-medium">Created:</span>{' '}
            {new Date(simulation.created_at).toLocaleString()}
          </div>
          {simulation.completed_at && (
            <div>
              <span className="font-medium">Completed:</span>{' '}
              {new Date(simulation.completed_at).toLocaleString()}
            </div>
          )}
          {simulation.simulation_duration_seconds && (
            <div>
              <span className="font-medium">Duration:</span>{' '}
              {simulation.simulation_duration_seconds}s
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
