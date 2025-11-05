import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface PrivacyBudgetTrackerProps {
  totalBudget: number;
  usedBudget: number;
  remainingBudget: number;
}

export const PrivacyBudgetTracker = ({ 
  totalBudget, 
  usedBudget, 
  remainingBudget 
}: PrivacyBudgetTrackerProps) => {
  const usagePercentage = (usedBudget / totalBudget) * 100;
  
  const getStatusColor = () => {
    if (usagePercentage >= 90) return 'text-red-500';
    if (usagePercentage >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (usagePercentage >= 90) return XCircle;
    if (usagePercentage >= 70) return AlertTriangle;
    return CheckCircle2;
  };

  const getStatusText = () => {
    if (usagePercentage >= 100) return 'Budget Exhausted';
    if (usagePercentage >= 90) return 'Critical - Almost Exhausted';
    if (usagePercentage >= 70) return 'Warning - High Usage';
    return 'Good - Within Limits';
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return '';
  };

  const StatusIcon = getStatusIcon();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Budget Tracker
        </CardTitle>
        <CardDescription>
          Differential privacy budget (ε) consumption for this project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget Usage</span>
            <div className="flex items-center gap-2">
              <StatusIcon className={`h-4 w-4 ${getStatusColor()}`} />
              <span className={`font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
          </div>
          
          <Progress 
            value={Math.min(usagePercentage, 100)} 
            className={`h-3 ${getProgressColor()}`}
          />
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{usedBudget.toFixed(4)} used</span>
            <span>{usagePercentage.toFixed(1)}%</span>
            <span>{remainingBudget.toFixed(4)} remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Budget (ε)</p>
            <p className="text-xl font-bold">{totalBudget.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Used</p>
            <p className="text-xl font-bold">{usedBudget.toFixed(4)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-xl font-bold">{remainingBudget.toFixed(4)}</p>
          </div>
        </div>

        {usagePercentage >= 90 && remainingBudget > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Privacy Budget</AlertTitle>
            <AlertDescription>
              You have only {remainingBudget.toFixed(4)} ε remaining. Further submissions may be blocked.
            </AlertDescription>
          </Alert>
        )}

        {usagePercentage >= 70 && usagePercentage < 90 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Privacy Budget Warning</AlertTitle>
            <AlertDescription>
              You've used {usagePercentage.toFixed(1)}% of your privacy budget. Plan your remaining submissions carefully.
            </AlertDescription>
          </Alert>
        )}

        {remainingBudget <= 0 && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Privacy Budget Exhausted</AlertTitle>
            <AlertDescription>
              You have exhausted your privacy budget and cannot submit more model updates to this project.
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-2 border-t space-y-2">
          <p className="text-xs font-semibold">What is Privacy Budget?</p>
          <p className="text-xs text-muted-foreground">
            The privacy budget (epsilon, ε) measures privacy loss in differential privacy. 
            Lower values mean stronger privacy. Each model update consumes part of your budget.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
