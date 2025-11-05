
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Shield, BarChart3, TrendingUp, Beaker, Cpu } from 'lucide-react';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ExperimentTrendsChart } from '@/components/dashboard/ExperimentTrendsChart';
import { ProtocolUsageChart } from '@/components/dashboard/ProtocolUsageChart';
import { SuccessDistributionChart } from '@/components/dashboard/SuccessDistributionChart';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { NotificationsButton } from '@/components/dashboard/NotificationsButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { isAdmin, hasPermission } = useRoleAccess();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleTeamManagement = () => {
    navigate('/team');
  };

  const getRoleBadgeVariant = (role?: string | null) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'researcher':
        return 'default';
      case 'reviewer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleDisplayName = (role?: string | null) => {
    if (!role) return 'User';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-4 md:py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                <Badge variant={getRoleBadgeVariant(user?.role)}>
                  {getRoleDisplayName(user?.role)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
                {isAdmin && <span className="ml-2 text-xs">(Administrator Access)</span>}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <NotificationsButton />
              
              {/* Admin-only buttons */}
              {isAdmin && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/system-stats')}
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    System Stats
                  </Button>
                </>
              )}
              
              {/* Researcher and Admin can create projects */}
              {hasPermission('create:experiment') && (
                <Button onClick={() => navigate('/new-project')} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              )}
              
              {/* Admin can manage team */}
              {isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={handleTeamManagement}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Manage Team
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <StatsOverview />
        
        {/* Quick Actions */}
        <div className="flex gap-2 mb-6">
          <Button onClick={() => navigate('/protocols')} variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Browse Protocols
          </Button>
          <Button onClick={() => navigate('/experiments')} variant="outline" className="gap-2">
            <Beaker className="h-4 w-4" />
            View Experiments
          </Button>
          <Button onClick={() => navigate('/digital-twins')} variant="outline" className="gap-2">
            <Cpu className="h-4 w-4" />
            Digital Twins
          </Button>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ExperimentTrendsChart />
              <SuccessDistributionChart />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <ExperimentTrendsChart />
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <ProtocolUsageChart />
          </TabsContent>
        </Tabs>
        
        {/* Activity Feed */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ActivityFeed />
          </div>
          <div>
            <DashboardSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
