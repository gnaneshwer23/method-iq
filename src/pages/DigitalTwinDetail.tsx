import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TwinVisualization3D } from '@/components/digital-twins/TwinVisualization3D';
import { RunSimulationDialog } from '@/components/digital-twins/RunSimulationDialog';
import { SimulationResults } from '@/components/digital-twins/SimulationResults';
import { useDigitalTwin, useSimulations, useTwinMetrics, useTwinRealtimeUpdates } from '@/hooks/useDigitalTwins';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Activity, 
  Calendar,
  Play,
  Settings,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DigitalTwinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: twinResponse, isLoading: twinLoading } = useDigitalTwin(id || '');
  const { data: simulationsResponse, isLoading: simsLoading } = useSimulations(id);
  const { data: metricsResponse } = useTwinMetrics(id || '', 'temperature');
  
  const twin = twinResponse?.data;
  const simulations = simulationsResponse?.data || [];
  const metrics = metricsResponse?.data || [];
  
  // Subscribe to real-time updates
  useTwinRealtimeUpdates(id || '');

  if (twinLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!twin) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Digital twin not found</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/digital-twins')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Digital Twins
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const metricsData = metrics.map(m => ({
    timestamp: new Date(m.timestamp).toLocaleTimeString(),
    value: m.metric_value,
  })).reverse();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/digital-twins')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Digital Twins
        </Button>

        {/* Twin Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{twin.name}</h1>
                <Badge variant={twin.is_active ? 'default' : 'secondary'}>
                  {twin.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {twin.twin_type}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {twin.description || 'No description provided'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <RunSimulationDialog twinId={twin.id} twinName={twin.name} />
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            {twin.physical_id && (
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Physical ID: {twin.physical_id}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(twin.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D Visualization */}
            <TwinVisualization3D twin={twin} metrics={metrics} />

            {/* Recent Simulations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-primary" />
                      Simulations
                    </CardTitle>
                    <CardDescription>
                      AI-powered simulation results and predictions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {simsLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map(i => <Skeleton key={i} className="h-32 w-full" />)}
                  </div>
                ) : simulations.length > 0 ? (
                  <div className="space-y-4">
                    {simulations.map((sim: any) => (
                      <SimulationResults key={sim.id} simulation={sim} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Play className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No simulations yet</p>
                    <p className="text-sm">Run a simulation to see AI predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Current State */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current State</CardTitle>
              </CardHeader>
              <CardContent>
                {twin.state && Object.keys(twin.state).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(twin.state).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No state data</p>
                )}
              </CardContent>
            </Card>

            {/* Metrics Chart */}
            {metricsData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Temperature Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="timestamp" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            {twin.metadata && Object.keys(twin.metadata).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                    {JSON.stringify(twin.metadata, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalTwinDetail;
