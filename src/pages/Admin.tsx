import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { UserManagement } from '@/components/admin/UserManagement';
import { SystemStats } from '@/components/admin/SystemStats';

export default function Admin() {
  const { isAuthenticated, loading } = useAuth();
  const { isAdmin } = useRoleAccess();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-6">
        {/* Page Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">
                Manage users, roles, and system settings
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* System Statistics */}
          <SystemStats />

          {/* User Management */}
          <UserManagement />
        </div>
      </main>
      <Footer />
    </div>
  );
}
