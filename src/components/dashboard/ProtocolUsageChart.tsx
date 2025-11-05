import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Loader2 } from 'lucide-react';
import { useProtocolUsage } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export const ProtocolUsageChart = () => {
  const { data: usageResponse, isLoading } = useProtocolUsage();
  const usage = usageResponse?.data || [];

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
          <BarChart3 className="h-5 w-5 text-primary" />
          Most Used Protocols
        </CardTitle>
        <CardDescription>
          Top 10 protocols by experiment count
        </CardDescription>
      </CardHeader>
      <CardContent>
        {usage.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usage} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category"
                dataKey="protocol"
                width={150}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[0, 4, 4, 0]}
                name="Experiments"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No protocol usage data yet</p>
              <p className="text-sm">Run experiments to see which protocols you use most</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
