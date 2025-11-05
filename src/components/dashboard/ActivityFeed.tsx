import { Activity, Beaker, FileText, CheckCircle, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecentActivity, useRealtimeActivity } from '@/hooks/useAnalytics';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

export const ActivityFeed = () => {
  const navigate = useNavigate();
  const { data: activityResponse, isLoading } = useRecentActivity(10);
  const activities = activityResponse?.data || [];
  
  // Subscribe to real-time updates
  useRealtimeActivity();

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMs = now.getTime() - then.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays}d ago`;
  };

  const handleViewActivity = (activity: any) => {
    if (activity.type === 'experiment') {
      navigate(`/experiments/${activity.id}`);
    } else if (activity.type === 'protocol') {
      navigate(`/protocols/${activity.id}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity: any) => (
              <div 
                key={`${activity.type}-${activity.id}`} 
                className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0 cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors"
                onClick={() => handleViewActivity(activity)}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'experiment' ? (
                    <Beaker className="h-4 w-4 text-primary" />
                  ) : (
                    <FileText className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                    {activity.metadata?.success_percentage !== undefined && activity.metadata.success_percentage !== null && (
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {activity.metadata.success_percentage}%
                      </Badge>
                    )}
                    {activity.metadata?.verified && (
                      <Badge variant="default" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No recent activity</p>
            <p className="text-xs">Start creating protocols or running experiments</p>
          </div>
        )}
      </CardContent>
      {activities.length > 0 && (
        <CardFooter>
          <Button variant="ghost" className="w-full text-sm" onClick={() => navigate('/experiments')}>
            View All Activity
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
