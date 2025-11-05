import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Award } from "lucide-react";
import { ReputationBadge } from "./ReputationBadge";

interface Participant {
  id: string;
  user_id: string;
  reputation_score: number | null;
  quality_score: number | null;
  consistency_score: number | null;
  impact_score: number | null;
  contribution_count: number;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ReputationLeaderboardProps {
  participants: Participant[];
}

export const ReputationLeaderboard = ({ participants }: ReputationLeaderboardProps) => {
  const sortedParticipants = [...participants]
    .filter(p => p.reputation_score !== null)
    .sort((a, b) => (b.reputation_score || 0) - (a.reputation_score || 0))
    .slice(0, 10);

  const getPositionIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Award className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-orange-500" />;
    return <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Reputation Leaderboard
        </CardTitle>
        <CardDescription>
          Top contributors ranked by reputation score
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedParticipants.length > 0 ? (
          <div className="space-y-4">
            {sortedParticipants.map((participant, index) => (
              <div key={participant.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 flex items-center justify-center">
                  {getPositionIcon(index)}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={participant.profile?.avatar_url || undefined} />
                  <AvatarFallback>
                    {participant.profile?.full_name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">
                      {participant.profile?.full_name || `User ${participant.user_id.substring(0, 8)}`}
                    </p>
                    <ReputationBadge
                      reputation={participant.reputation_score || 0}
                      quality={participant.quality_score || 0}
                      consistency={participant.consistency_score || 0}
                      impact={participant.impact_score || 0}
                      size="sm"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Progress 
                        value={participant.reputation_score || 0} 
                        className="h-2 flex-1" 
                      />
                      <span className="text-muted-foreground min-w-[3rem] text-right">
                        {(participant.reputation_score || 0).toFixed(0)}/100
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {participant.contribution_count} contributions
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-muted-foreground">Q</span>
                      <span className="font-medium">{(participant.quality_score || 0).toFixed(0)}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-muted-foreground">C</span>
                      <span className="font-medium">{(participant.consistency_score || 0).toFixed(0)}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-muted-foreground">I</span>
                      <span className="font-medium">{(participant.impact_score || 0).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No reputation data yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Reputation scores are calculated after contributions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
