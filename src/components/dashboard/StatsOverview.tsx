
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, FlaskConical, CircuitBoard, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="border rounded-lg hover:border-primary/50 transition-colors">
    <CardContent className="flex items-center justify-between p-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-primary">{icon}</div>
    </CardContent>
  </Card>
);

export const StatsOverview = () => {
  const researchStats = [
    { title: 'Active Projects', value: '5', icon: <Beaker className="h-6 w-6 text-blue-500" /> },
    { title: 'Running Experiments', value: '3', icon: <FlaskConical className="h-6 w-6 text-green-500" /> },
    { title: 'Connected Devices', value: '7', icon: <CircuitBoard className="h-6 w-6 text-amber-500" /> },
    { title: 'Team Members', value: '12', icon: <Users className="h-6 w-6 text-purple-500" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {researchStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
