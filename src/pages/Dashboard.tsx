
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { NotificationsButton } from '@/components/dashboard/NotificationsButton';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleTeamManagement = () => {
    navigate('/team');
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
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <NotificationsButton />
              <Button onClick={() => navigate('/new-project')} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
              <Button 
                variant="outline" 
                onClick={handleTeamManagement}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Manage Team
              </Button>
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
