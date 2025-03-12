
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, CircuitBoard, FlaskConical, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="hover:border-primary/50 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export const StatsOverview = () => {
  const researchStats = [
    { title: 'Active Projects', value: '5', icon: <Beaker className="h-8 w-8 text-blue-500" /> },
    { title: 'Running Experiments', value: '3', icon: <FlaskConical className="h-8 w-8 text-green-500" /> },
    { title: 'Connected Devices', value: '7', icon: <CircuitBoard className="h-8 w-8 text-amber-500" /> },
    { title: 'Team Members', value: '12', icon: <Users className="h-8 w-8 text-purple-500" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {researchStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
