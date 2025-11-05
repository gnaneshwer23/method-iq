import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CreateExperimentDialog } from '@/components/experiments/CreateExperimentDialog';
import { ExperimentCard } from '@/components/experiments/ExperimentCard';
import { useExperiments, useExperimentStats } from '@/hooks/useExperiments';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, TrendingUp, Clock, FlaskConical, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Experiments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: experimentsResponse, isLoading } = useExperiments();
  const { data: statsResponse } = useExperimentStats();
  const experiments = experimentsResponse?.data || [];
  const stats = statsResponse?.data;

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please <a href="/login" className="font-medium underline">sign in</a> to view and manage your experiments.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Beaker className="h-8 w-8 text-primary" />
              My Experiments
            </h1>
            <p className="text-muted-foreground">
              Track and manage your research experiments
            </p>
          </div>
          <CreateExperimentDialog />
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Experiments</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <FlaskConical className="h-6 w-6 text-primary" />
                  {stats.totalExperiments}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Avg Success Rate</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  {stats.averageSuccessRate}%
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Time Spent</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  {stats.totalTimeSpent}
                  <span className="text-base font-normal text-muted-foreground">min</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/protocols')}>
            Browse Protocols to Start Experiments
          </Button>
        </div>

        {/* Experiments Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : experiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment: any) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Beaker className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Experiments Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your first experiment using a protocol from our library
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/protocols')}>
                  Browse Protocols
                </Button>
                <CreateExperimentDialog />
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Experiments;
