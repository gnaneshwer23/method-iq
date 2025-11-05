import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CreateTwinDialog } from '@/components/digital-twins/CreateTwinDialog';
import { TwinCard } from '@/components/digital-twins/TwinCard';
import { useDigitalTwins } from '@/hooks/useDigitalTwins';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DigitalTwins = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filters = activeTab === 'all' ? {} : { twin_type: activeTab };
  const { data: twinsResponse, isLoading } = useDigitalTwins(filters);
  const twins = twinsResponse?.data || [];

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please <a href="/login" className="font-medium underline">sign in</a> to view and manage your digital twins.
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
              <Cpu className="h-8 w-8 text-primary" />
              Digital Twins
            </h1>
            <p className="text-muted-foreground">
              Create virtual replicas and run simulations before physical experiments
            </p>
          </div>
          <CreateTwinDialog />
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription>
            Digital twins are virtual representations of physical systems. Run simulations with AI predictions to optimize experiments before running them physically.
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Twins</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="system">Systems</TabsTrigger>
            <TabsTrigger value="process">Processes</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Twins Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : twins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {twins.map((twin: any) => (
              <TwinCard key={twin.id} twin={twin} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Cpu className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Digital Twins Yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first digital twin to start running simulations
              </p>
              <div className="flex gap-3 justify-center">
                <CreateTwinDialog />
                <Button variant="outline" onClick={() => navigate('/protocols')}>
                  Browse Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DigitalTwins;
