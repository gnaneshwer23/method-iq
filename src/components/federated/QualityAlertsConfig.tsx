import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Bell, AlertTriangle, TrendingDown, Activity } from "lucide-react";

interface QualityAlertsConfigProps {
  minAccuracyThreshold: number;
  setMinAccuracyThreshold: (value: number) => void;
  convergenceThreshold: number;
  setConvergenceThreshold: (value: number) => void;
  monitoringEnabled: boolean;
  setMonitoringEnabled: (value: boolean) => void;
}

export const QualityAlertsConfig = ({
  minAccuracyThreshold,
  setMinAccuracyThreshold,
  convergenceThreshold,
  setConvergenceThreshold,
  monitoringEnabled,
  setMonitoringEnabled
}: QualityAlertsConfigProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Quality Alert Settings
        </CardTitle>
        <CardDescription>
          Configure automated alerts for model quality monitoring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Monitoring */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="monitoring-enabled">Enable Quality Monitoring</Label>
            <p className="text-sm text-muted-foreground">
              Receive real-time alerts when quality issues are detected
            </p>
          </div>
          <Switch
            id="monitoring-enabled"
            checked={monitoringEnabled}
            onCheckedChange={setMonitoringEnabled}
          />
        </div>

        {/* Alert Types */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-medium">Alert Triggers</h4>
          
          <div className="space-y-3">
            {/* Accuracy Threshold */}
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor="accuracy-threshold" className="text-sm font-medium">
                    Minimum Accuracy Threshold
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Alert when accuracy falls below this value
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="accuracy-threshold"
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={minAccuracyThreshold}
                    onChange={(e) => setMinAccuracyThreshold(parseFloat(e.target.value))}
                    className="w-24"
                    disabled={!monitoringEnabled}
                  />
                  <span className="text-sm text-muted-foreground">
                    ({(minAccuracyThreshold * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Convergence Stalling */}
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor="convergence-threshold" className="text-sm font-medium">
                    Convergence Threshold
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Alert when improvement is less than this over 3 rounds
                  </p>
                </div>
                <Input
                  id="convergence-threshold"
                  type="number"
                  min="0.0001"
                  max="0.1"
                  step="0.001"
                  value={convergenceThreshold}
                  onChange={(e) => setConvergenceThreshold(parseFloat(e.target.value))}
                  className="w-32"
                  disabled={!monitoringEnabled}
                />
              </div>
            </div>

            {/* Additional Checks */}
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Automatic Checks</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Accuracy drop &gt;5% from previous round</li>
                  <li>• Loss increasing significantly</li>
                  <li>• Low participant count (&lt;3)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground pt-4 border-t">
          <p>
            <strong>Note:</strong> Alerts appear as toast notifications in the bottom-right corner.
            They include quick actions to investigate issues.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
