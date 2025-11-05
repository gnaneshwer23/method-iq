import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Loader2 } from 'lucide-react';
import { useExperimentTrends } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export const ExperimentTrendsChart = () => {
  const { data: trendsResponse, isLoading } = useExperimentTrends(30);
  const trends = trendsResponse?.data || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Experiment Trends (Last 30 Days)
        </CardTitle>
        <CardDescription>
          Track your daily experiment activity and success rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {trends.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="experiments" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Experiments"
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="avgSuccess" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                name="Avg Success %"
                dot={{ fill: 'hsl(var(--chart-2))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No experiment data yet</p>
              <p className="text-sm">Start running experiments to see trends</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
