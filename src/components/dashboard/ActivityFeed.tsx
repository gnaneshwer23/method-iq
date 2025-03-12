
import { Activity, Plus, RefreshCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  type: string;
  item: string;
  date: string;
}

export const ActivityFeed = () => {
  const recentActivity: ActivityItem[] = [
    { id: 1, type: 'Updated', item: 'PCR Protocol', date: '2 hours ago' },
    { id: 2, type: 'Created', item: 'New Experiment', date: 'Yesterday' },
    { id: 3, type: 'Connected', item: 'IoT Temperature Sensor', date: '3 days ago' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                {item.type === 'Updated' && <RefreshCcw className="h-4 w-4 text-blue-500" />}
                {item.type === 'Created' && <Plus className="h-4 w-4 text-green-500" />}
                {item.type === 'Connected' && <Share2 className="h-4 w-4 text-orange-500" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.type} <span className="text-primary">{item.item}</span></p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-sm">View All Activity</Button>
      </CardFooter>
    </Card>
  );
};
