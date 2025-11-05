
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Shield, BarChart3 } from 'lucide-react';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { NotificationsButton } from '@/components/dashboard/NotificationsButton';

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
        
        {/* Main content */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Left column */}
          <div className="md:col-span-2 lg:col-span-3">
            <DashboardTabs />
          </div>
          
          {/* Right column */}
          <div className="md:col-span-1">
            <DashboardSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
