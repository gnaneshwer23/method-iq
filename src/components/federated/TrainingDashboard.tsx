import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users, Activity, Brain, CheckCircle, Radio } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TrainingDashboardProps {
  projectId: string;
  aggregatedModels: any[];
  modelUpdates: any[];
  participants: any[];
}

export const TrainingDashboard = ({ 
  projectId, 
  aggregatedModels = [], 
  modelUpdates = [], 
  participants = [] 
}: TrainingDashboardProps) => {
  const [realtimeModels, setRealtimeModels] = useState(aggregatedModels);
  const [realtimeUpdates, setRealtimeUpdates] = useState(modelUpdates);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setRealtimeModels(aggregatedModels);
  }, [aggregatedModels]);

  useEffect(() => {
    setRealtimeUpdates(modelUpdates);
  }, [modelUpdates]);

  // Set up realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel(`training-dashboard-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'federated_aggregated_models',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('New aggregated model:', payload);
          setRealtimeModels(prev => [...prev, payload.new]);
          toast.success('New aggregated model available!', {
            description: `Round ${payload.new.round_number} completed`
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'federated_model_updates',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('New model update:', payload);
          setRealtimeUpdates(prev => [...prev, payload.new]);
          toast.info('New model update submitted', {
            description: `Round ${payload.new.round_number}`
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log('Realtime connected for training dashboard');
        } else if (status === 'CLOSED') {
          setIsConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
      setIsConnected(false);
    };
  }, [projectId]);

  // Process data for charts
  const convergenceData = realtimeModels
    .sort((a, b) => a.round_number - b.round_number)
    .map(model => ({
      round: model.round_number,
      accuracy: model.global_accuracy ? (model.global_accuracy * 100) : null,
      loss: model.global_loss,
      participants: model.participating_clients
    }));

  const participantStats = participants.map(p => ({
    name: p.profile?.full_name?.substring(0, 15) || `User ${p.id.substring(0, 8)}`,
    contributions: p.contribution_count || 0,
    status: p.status
  })).sort((a, b) => b.contributions - a.contributions);

  const roundUpdatesDistribution = Array.from(
    realtimeUpdates.reduce((acc, update) => {
      const round = update.round_number;
      acc.set(round, (acc.get(round) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([round, count]) => ({
    round,
    updates: count
  })).sort((a, b) => a.round - b.round);

  const latestModel = convergenceData[convergenceData.length - 1];
  const previousModel = convergenceData[convergenceData.length - 2];
  
  const accuracyTrend = latestModel && previousModel 
    ? latestModel.accuracy - previousModel.accuracy 
    : 0;
  const lossTrend = latestModel && previousModel 
    ? previousModel.loss - latestModel.loss 
    : 0;

  return (
    <div className="space-y-6">
      {/* Real-time Status Badge */}
      <div className="flex justify-end">
        <Badge variant={isConnected ? "default" : "secondary"} className="gap-2">
          <Radio className={`h-3 w-3 ${isConnected ? 'animate-pulse' : ''}`} />
          {isConnected ? 'Live Updates Active' : 'Connecting...'}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestModel?.accuracy?.toFixed(2)}%
            </div>
            <div className={`flex items-center text-xs ${accuracyTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {accuracyTrend >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(accuracyTrend).toFixed(2)}% from previous
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Loss</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestModel?.loss?.toFixed(4)}
            </div>
            <div className={`flex items-center text-xs ${lossTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {lossTrend >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(lossTrend).toFixed(4)} improvement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {participants.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {participants.length} total enrolled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Updates</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {realtimeUpdates.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {convergenceData.length} rounds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="convergence" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="convergence">Convergence</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="distribution">Round Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="convergence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Accuracy Over Rounds</CardTitle>
              <CardDescription>
                Global model accuracy progression through training rounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              {convergenceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={convergenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="round" 
                      label={{ value: 'Round', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      formatter={(value: any) => `${value.toFixed(2)}%`}
                      labelFormatter={(label) => `Round ${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                      name="Accuracy"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No convergence data yet
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Loss Over Rounds</CardTitle>
              <CardDescription>
                Global model loss reduction through training
              </CardDescription>
            </CardHeader>
            <CardContent>
              {convergenceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={convergenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="round" 
                      label={{ value: 'Round', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value: any) => value.toFixed(4)}
                      labelFormatter={(label) => `Round ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="loss" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Loss"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No loss data yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Participant Contributions</CardTitle>
              <CardDescription>
                Number of model updates submitted by each participant
              </CardDescription>
            </CardHeader>
            <CardContent>
              {participantStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={participantStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="contributions" 
                      fill="#10b981" 
                      name="Contributions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  No participant data yet
                </div>
              )}

              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium">Participant Status</h4>
                <div className="flex gap-2 flex-wrap">
                  {participantStats.map((p, idx) => (
                    <Badge 
                      key={idx} 
                      variant={p.status === 'active' ? 'default' : 'secondary'}
                    >
                      {p.name}: {p.contributions} updates
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Updates per Round</CardTitle>
              <CardDescription>
                Distribution of model updates across training rounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              {roundUpdatesDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={roundUpdatesDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="round" 
                      label={{ value: 'Round', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      label={{ value: 'Updates', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      labelFormatter={(label) => `Round ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="updates" 
                      fill="#8b5cf6" 
                      name="Model Updates"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  No update distribution data yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
