import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Target, Zap } from "lucide-react";
import { ReputationBadge } from "./ReputationBadge";

interface MyReputationCardProps {
  participant: {
    reputation_score: number | null;
    quality_score: number | null;
    consistency_score: number | null;
    impact_score: number | null;
    contribution_count: number;
  } | null;
}

export const MyReputationCard = ({ participant }: MyReputationCardProps) => {
  if (!participant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            My Reputation
          </CardTitle>
          <CardDescription>
            Join the project to start building your reputation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Not a participant yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const reputation = participant.reputation_score || 50;
  const quality = participant.quality_score || 0;
  const consistency = participant.consistency_score || 0;
  const impact = participant.impact_score || 0;

  const getNextTier = (score: number) => {
    if (score < 40) return { name: "Intermediate", threshold: 40, color: "text-yellow-500" };
    if (score < 60) return { name: "Advanced", threshold: 60, color: "text-green-500" };
    if (score < 75) return { name: "Expert", threshold: 75, color: "text-blue-500" };
    if (score < 90) return { name: "Elite", threshold: 90, color: "text-purple-500" };
    return { name: "Master", threshold: 100, color: "text-gold-500" };
  };

  const nextTier = getNextTier(reputation);
  const progressToNext = reputation >= 90 ? 100 : ((reputation % nextTier.threshold) / nextTier.threshold) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          My Reputation
        </CardTitle>
        <CardDescription>
          Track your contribution quality and impact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Reputation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Reputation</span>
            <ReputationBadge
              reputation={reputation}
              quality={quality}
              consistency={consistency}
              impact={impact}
            />
          </div>
          <Progress value={reputation} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{reputation.toFixed(0)}/100</span>
            <span>{participant.contribution_count} contributions</span>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {reputation < 90 && (
          <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-4 w-4 ${nextTier.color}`} />
              <span className="text-sm font-medium">Progress to {nextTier.name}</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {(nextTier.threshold - reputation).toFixed(0)} points needed
            </p>
          </div>
        )}

        {/* Score Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Score Breakdown</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Quality</span>
              </div>
              <Badge variant="outline">{quality.toFixed(0)}</Badge>
            </div>
            <Progress value={quality} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-sm">Consistency</span>
              </div>
              <Badge variant="outline">{consistency.toFixed(0)}</Badge>
            </div>
            <Progress value={consistency} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Impact</span>
              </div>
              <Badge variant="outline">{impact.toFixed(0)}</Badge>
            </div>
            <Progress value={impact} className="h-2" />
          </div>
        </div>

        {/* Tips */}
        <div className="p-3 bg-secondary/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>💡 Tip:</strong> Improve your reputation by:
          </p>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
            <li>• Submitting high-quality model updates consistently</li>
            <li>• Contributing more training samples</li>
            <li>• Maintaining good accuracy in your updates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
