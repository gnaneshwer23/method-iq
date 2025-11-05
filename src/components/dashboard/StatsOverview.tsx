import { Card, CardContent } from "@/components/ui/card";
import { Beaker, FlaskConical, CheckCircle, TrendingUp } from "lucide-react";
import { useDashboardStats } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  isLoading?: boolean;
}

const StatCard = ({ title, value, icon, trend, isLoading }: StatCardProps) => {
  if (isLoading) {
    return (
      <Card className="border rounded-lg">
        <CardContent className="p-6">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-lg hover:border-primary/50 transition-colors">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <span className="text-xs font-medium text-emerald-500">{trend}</span>
            )}
          </div>
        </div>
        <div className="text-primary">{icon}</div>
      </CardContent>
    </Card>
  );
};

export const StatsOverview = () => {
  const { data: statsResponse, isLoading } = useDashboardStats();
  const stats = statsResponse?.data;

  const statCards = [
    { 
      title: 'Total Protocols', 
      value: stats?.totalProtocols || 0, 
      icon: <Beaker className="h-6 w-6" />
    },
    { 
      title: 'Total Experiments', 
      value: stats?.totalExperiments || 0, 
      icon: <FlaskConical className="h-6 w-6" />
    },
    { 
      title: 'Verified Protocols', 
      value: stats?.verifiedProtocols || 0, 
      icon: <CheckCircle className="h-6 w-6" />
    },
    { 
      title: 'Avg Success Rate', 
      value: stats?.averageSuccessRate ? `${stats.averageSuccessRate}%` : '0%', 
      icon: <TrendingUp className="h-6 w-6" />
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} isLoading={isLoading} />
      ))}
    </div>
  );
};
