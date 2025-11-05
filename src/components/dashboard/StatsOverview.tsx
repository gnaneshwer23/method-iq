
import { Card, CardContent } from "@/components/ui/card";
import { Beaker, FlaskConical, CircuitBoard, Users, CheckCircle, FileText, AlertCircle, TrendingUp } from "lucide-react";
import { useRoleAccess } from "@/hooks/useRoleAccess";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
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

export const StatsOverview = () => {
  const { isAdmin, isResearcher, isReviewer } = useRoleAccess();

  // Admin sees system-wide stats
  const adminStats = [
    { title: 'Total Protocols', value: '156', icon: <FileText className="h-6 w-6 text-blue-500" />, trend: '+12%' },
    { title: 'Total Experiments', value: '342', icon: <FlaskConical className="h-6 w-6 text-green-500" />, trend: '+8%' },
    { title: 'Active Users', value: '47', icon: <Users className="h-6 w-6 text-purple-500" />, trend: '+5%' },
    { title: 'Verified Protocols', value: '89', icon: <CheckCircle className="h-6 w-6 text-emerald-500" />, trend: '+15%' },
  ];

  // Researcher sees their own stats
  const researcherStats = [
    { title: 'My Projects', value: '5', icon: <Beaker className="h-6 w-6 text-blue-500" /> },
    { title: 'My Experiments', value: '12', icon: <FlaskConical className="h-6 w-6 text-green-500" /> },
    { title: 'My Devices', value: '7', icon: <CircuitBoard className="h-6 w-6 text-amber-500" /> },
    { title: 'Success Rate', value: '87%', icon: <TrendingUp className="h-6 w-6 text-emerald-500" /> },
  ];

  // Reviewer sees review-focused stats
  const reviewerStats = [
    { title: 'Pending Reviews', value: '8', icon: <AlertCircle className="h-6 w-6 text-orange-500" /> },
    { title: 'Reviewed This Month', value: '24', icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { title: 'Total Protocols', value: '156', icon: <FileText className="h-6 w-6 text-blue-500" /> },
    { title: 'Verified Protocols', value: '89', icon: <CheckCircle className="h-6 w-6 text-emerald-500" /> },
  ];

  const stats = isAdmin 
    ? adminStats 
    : isResearcher 
      ? researcherStats 
      : reviewerStats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
