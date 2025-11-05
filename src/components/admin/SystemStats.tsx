import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { adminApi } from '@/lib/api/admin';
import { FileText, CheckCircle, FlaskConical, Users, HardDrive } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function SystemStats() {
  const [stats, setStats] = useState({
    totalProtocols: 0,
    verifiedProtocols: 0,
    totalExperiments: 0,
    totalUsers: 0,
    totalDevices: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      const { data, error } = await adminApi.getSystemStats();
      
      if (error) {
        toast({
          title: 'Error loading statistics',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data) {
        setStats(data);
      }
      
      setLoading(false);
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Protocols',
      value: stats.totalProtocols,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Verified Protocols',
      value: stats.verifiedProtocols,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Total Experiments',
      value: stats.totalExperiments,
      icon: FlaskConical,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'IoT Devices',
      value: stats.totalDevices,
      icon: HardDrive,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Statistics</CardTitle>
          <CardDescription>Loading system-wide statistics...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Statistics</CardTitle>
        <CardDescription>Platform-wide metrics and analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional metrics */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-2">Protocol Verification Rate</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${stats.totalProtocols > 0 ? (stats.verifiedProtocols / stats.totalProtocols) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {stats.totalProtocols > 0
                    ? Math.round((stats.verifiedProtocols / stats.totalProtocols) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Avg. Experiments per User</h4>
              <p className="text-2xl font-bold">
                {stats.totalUsers > 0
                  ? (stats.totalExperiments / stats.totalUsers).toFixed(1)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
