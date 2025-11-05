import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useSuccessDistribution } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // green, blue, amber, red

export const SuccessDistributionChart = () => {
  const { data: distributionResponse, isLoading } = useSuccessDistribution();
  const distribution = distributionResponse?.data || [];

  const totalExperiments = distribution.reduce((sum, item) => sum + item.value, 0);

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
          <PieChartIcon className="h-5 w-5 text-primary" />
          Success Rate Distribution
        </CardTitle>
        <CardDescription>
          Breakdown of experiment success rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totalExperiments > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => `${value}: ${entry.payload.value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <PieChartIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>No success data yet</p>
              <p className="text-sm">Complete experiments with success rates to see distribution</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
