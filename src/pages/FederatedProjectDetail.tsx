import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Users, TrendingUp, Lock, Upload, Download, BarChart3, Bell, BellOff, Settings, Award, Play, CheckCircle, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import { useFederatedProject, useFederatedLearning } from "@/hooks/useFederatedLearning";
import { useAuth } from "@/contexts/AuthContext";
import { AggregateModelButton } from "@/components/federated/AggregateModelButton";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { TrainingDashboard } from "@/components/federated/TrainingDashboard";
import { useModelQualityMonitor } from "@/hooks/useModelQualityMonitor";
import { QualityAlertsConfig } from "@/components/federated/QualityAlertsConfig";
import { ReputationLeaderboard } from "@/components/federated/ReputationLeaderboard";
import { ReputationBadge } from "@/components/federated/ReputationBadge";
import { MyReputationCard } from "@/components/federated/MyReputationCard";
import { SubmitModelUpdateDialog } from "@/components/federated/SubmitModelUpdateDialog";
import { TrainingInstructions } from "@/components/federated/TrainingInstructions";
import { NotificationsDropdown } from "@/components/federated/NotificationsDropdown";
import { PrivacyBudgetTracker } from "@/components/federated/PrivacyBudgetTracker";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNotifications } from "@/hooks/useNotifications";
import { usePrivacyBudget } from "@/hooks/usePrivacyBudget";

const FederatedProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useRoleAccess();
  const { joinProject, updateProjectStatus, advanceRound } = useFederatedLearning();
  const { project, projectLoading, participants, participantsLoading, modelUpdates, updatesLoading, aggregatedModels } = useFederatedProject(id!);
  const { toast } = useToast();
  const { createNotification } = useNotifications();
  const privacyBudget = usePrivacyBudget(id!);
  
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [minAccuracyThreshold, setMinAccuracyThreshold] = useState(0.5);
  const [convergenceThreshold, setConvergenceThreshold] = useState(0.001);

  const isParticipant = participants?.some(p => p.user_id === user?.id);
  const isProjectOwner = project?.created_by === user?.id;
  const myParticipation = participants?.find(p => p.user_id === user?.id);
  const progress = project ? (project.current_round / project.total_rounds) * 100 : 0;
  const canManageProject = isProjectOwner || isAdmin;
  
  // Count updates for current round
  const currentRoundUpdates = modelUpdates?.filter(u => u.round_number === project?.current_round) || [];

  // Enable quality monitoring for project owners
  const { isMonitoring } = useModelQualityMonitor({
    projectId: id!,
    projectName: project?.name || 'Project',
    isOwner: (isProjectOwner || isAdmin) && monitoringEnabled,
    minAccuracyThreshold,
    convergenceWindowSize: 3,
    convergenceThreshold
  });

  const statusColors = {
    recruiting: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    training: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    archived: "bg-gray-500/10 text-gray-500 border-gray-500/20"
  };

  if (projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const handleJoinProject = async () => {
    await joinProject.mutateAsync({ projectId: project.id });
  };

  const handleStartTraining = async () => {
    if (!canManageProject || !project) return;
    
    const participantCount = participants?.length || 0;
    if (participantCount < (project.min_participants || 3)) {
      toast({
        title: "Cannot Start Training",
        description: `Need at least ${project.min_participants || 3} participants. Currently have ${participantCount}.`,
        variant: "destructive"
      });
      return;
    }

    try {
      await updateProjectStatus.mutateAsync({ projectId: project.id, status: 'training' });
      
      // Notify all participants
      for (const participant of participants || []) {
        await createNotification.mutateAsync({
          user_id: participant.user_id,
          title: "Training Started",
          message: `Federated learning project "${project.name}" has started training. Submit your model update for round 1!`,
          type: 'success',
          related_entity_type: 'federated_project',
          related_entity_id: project.id
        });
      }
      
      toast({
        title: "Training Started",
        description: "Participants can now submit model updates for round 1"
      });
    } catch (error) {
      toast({
        title: "Failed to Start Training",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleAdvanceRound = async () => {
    if (!canManageProject || !project) return;
    
    if (project.current_round >= project.total_rounds) {
      toast({
        title: "Cannot Advance",
        description: "Project has completed all rounds",
        variant: "destructive"
      });
      return;
    }

    try {
      await advanceRound.mutateAsync({ 
        projectId: project.id, 
        currentRound: project.current_round 
      });
      
      // Notify all participants
      for (const participant of participants || []) {
        await createNotification.mutateAsync({
          user_id: participant.user_id,
          title: "New Round Started",
          message: `Round ${project.current_round + 1} of "${project.name}" has begun. Submit your updated model!`,
          type: 'info',
          related_entity_type: 'federated_project',
          related_entity_id: project.id
        });
      }
      
      toast({
        title: "Round Advanced",
        description: `Now on round ${project.current_round + 1}`
      });
    } catch (error) {
      toast({
        title: "Failed to Advance Round",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleCompleteProject = async () => {
    if (!canManageProject || !project) return;

    try {
      await updateProjectStatus.mutateAsync({ projectId: project.id, status: 'completed' });
      toast({
        title: "Project Completed",
        description: "Federated learning project has been marked as complete"
      });
    } catch (error) {
      toast({
        title: "Failed to Complete Project",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleDownloadModel = async (modelUrl: string, fileName: string) => {
    try {
      // Extract the file path from the URL
      const urlParts = modelUrl.split('/fl-model-weights/');
      if (urlParts.length < 2) {
        throw new Error("Invalid model URL");
      }
      const filePath = urlParts[1];

      // Get signed URL for download
      const { data, error } = await supabase.storage
        .from('fl-model-weights')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) throw error;

      // Download the file
      const response = await fetch(data.signedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: `Downloading ${fileName}`
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download model",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/federated-learning')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <Badge className={statusColors[project.status]}>
                  {project.status}
                </Badge>
                {(isProjectOwner || isAdmin) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMonitoringEnabled(!monitoringEnabled)}
                    className="ml-2"
                  >
                    {monitoringEnabled ? (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Alerts On
                      </>
                    ) : (
                      <>
                        <BellOff className="h-4 w-4 mr-2" />
                        Alerts Off
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <NotificationsDropdown />
              
              {!isParticipant && project.status === 'recruiting' && (
                <Button onClick={handleJoinProject} disabled={joinProject.isPending}>
                  <Users className="h-4 w-4 mr-2" />
                  {joinProject.isPending ? "Joining..." : "Join Project"}
                </Button>
              )}
              
              {canManageProject && project.status === 'recruiting' && (
                <Button onClick={handleStartTraining} variant="default">
                  <Play className="h-4 w-4 mr-2" />
                  Start Training
                </Button>
              )}
              
              {canManageProject && project.status === 'training' && (
                <Button onClick={handleCompleteProject} variant="secondary">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Project
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Training Progress</CardTitle>
                <CardDescription>
                  Round {project.current_round} of {project.total_rounds}
                </CardDescription>
              </div>
              {(isProjectOwner || isAdmin) && project.status === 'training' && (
                <div className="flex gap-2">
                  {currentRoundUpdates.length > 0 && (
                    <AggregateModelButton 
                      projectId={project.id} 
                      roundNumber={project.current_round}
                      disabled={currentRoundUpdates.length < project.min_participants}
                    />
                  )}
                  {aggregatedModels && aggregatedModels.length > 0 && project.current_round < project.total_rounds && (
                    <Button 
                      onClick={handleAdvanceRound}
                      variant="outline"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Advance to Round {project.current_round + 1}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{project.current_round} rounds completed</span>
                <span>{project.total_rounds - project.current_round} remaining</span>
              </div>
            </div>
            
            {project.status === 'training' && (
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm">
                <span className="text-muted-foreground">Current round updates:</span>
                <Badge variant={currentRoundUpdates.length >= project.min_participants ? "default" : "secondary"}>
                  {currentRoundUpdates.length} / {project.min_participants} minimum
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Model Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model Type:</span>
                <span className="font-medium">{project.model_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Objective:</span>
                <span className="font-medium">{project.learning_objective}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aggregation:</span>
                <span className="font-medium">{project.aggregation_method}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Privacy Budget (ε):</span>
                <span className="font-medium">{project.privacy_budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Participants:</span>
                <span className="font-medium">{project.min_participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current:</span>
                <span className="font-medium">{participants?.length || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Latest Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updates Submitted:</span>
                <span className="font-medium">{modelUpdates?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Accuracy:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Loss:</span>
                <span className="font-medium">-</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Award className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            {(isProjectOwner || isAdmin) && (
              <TabsTrigger value="alerts">
                <Settings className="h-4 w-4 mr-2" />
                Alert Settings
              </TabsTrigger>
            )}
            <TabsTrigger value="participants">
              Participants ({participants?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="updates">
              Model Updates ({modelUpdates?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="aggregated">
              Aggregated Models ({aggregatedModels?.length || 0})
            </TabsTrigger>
            {isParticipant && <TabsTrigger value="contribute">Contribute</TabsTrigger>}
            <TabsTrigger value="instructions">
              <BookOpen className="h-4 w-4 mr-2" />
              Instructions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <TrainingDashboard 
              projectId={project.id}
              aggregatedModels={aggregatedModels || []}
              modelUpdates={modelUpdates || []}
              participants={participants || []}
            />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ReputationLeaderboard participants={participants || []} />
              </div>
              <div>
                <MyReputationCard participant={myParticipation || null} />
              </div>
            </div>
          </TabsContent>

          {(isProjectOwner || isAdmin) && (
            <TabsContent value="alerts" className="mt-6">
              <QualityAlertsConfig
                minAccuracyThreshold={minAccuracyThreshold}
                setMinAccuracyThreshold={setMinAccuracyThreshold}
                convergenceThreshold={convergenceThreshold}
                setConvergenceThreshold={setConvergenceThreshold}
                monitoringEnabled={monitoringEnabled}
                setMonitoringEnabled={setMonitoringEnabled}
              />
            </TabsContent>
          )}

          <TabsContent value="participants" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Participants</CardTitle>
                <CardDescription>
                  Researchers collaborating on this federated learning project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {participantsLoading ? (
                  <p className="text-muted-foreground">Loading participants...</p>
                ) : participants && participants.length > 0 ? (
                  <div className="space-y-4">
                    {participants.map((participant: any) => (
                      <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={participant.profile?.avatar_url} />
                            <AvatarFallback>
                              {participant.profile?.full_name?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{participant.profile?.full_name || 'Anonymous'}</p>
                              {participant.reputation_score !== null && (
                                <ReputationBadge
                                  reputation={participant.reputation_score}
                                  quality={participant.quality_score || 0}
                                  consistency={participant.consistency_score || 0}
                                  impact={participant.impact_score || 0}
                                  size="sm"
                                />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {participant.contribution_count} contributions
                            </p>
                          </div>
                        </div>
                        <Badge variant={participant.status === 'active' ? 'default' : 'secondary'}>
                          {participant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No participants yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Updates</CardTitle>
                <CardDescription>
                  History of model weight updates from participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                {updatesLoading ? (
                  <p className="text-muted-foreground">Loading updates...</p>
                ) : modelUpdates && modelUpdates.length > 0 ? (
                  <div className="space-y-4">
                    {modelUpdates.map((update) => (
                      <div key={update.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Round {update.round_number}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(update.submitted_at).toLocaleString()}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Accuracy: </span>
                            <span className="font-medium">{update.accuracy?.toFixed(4) || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Loss: </span>
                            <span className="font-medium">{update.loss?.toFixed(4) || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Samples: </span>
                            <span className="font-medium">{update.training_samples || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No model updates yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aggregated" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Aggregated Models</CardTitle>
                <CardDescription>
                  AI-weighted global models produced from participant updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {aggregatedModels && aggregatedModels.length > 0 ? (
                  <div className="space-y-4">
                    {aggregatedModels.map((model: any) => (
                      <div key={model.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge>Round {model.round_number}</Badge>
                            <Badge variant="outline">{model.participating_clients} participants</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(model.created_at).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">Global Accuracy:</span>
                            <p className="font-medium text-lg">{model.global_accuracy?.toFixed(4) || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Global Loss:</span>
                            <p className="font-medium text-lg">{model.global_loss?.toFixed(4) || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Samples:</span>
                            <p className="font-medium text-lg">{model.aggregation_metadata?.total_samples || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Method:</span>
                            <p className="font-medium">{model.aggregation_metadata?.aggregation_method || 'N/A'}</p>
                          </div>
                        </div>

                        {model.aggregation_metadata?.weights && (
                          <div className="mt-3 p-3 bg-secondary/30 rounded">
                            <p className="text-sm text-muted-foreground mb-2">Quality Weights (AI-assigned):</p>
                            <div className="flex gap-2 flex-wrap">
                              {model.aggregation_metadata.weights.map((weight: number, idx: number) => (
                                <Badge key={idx} variant="secondary">
                                  Participant {idx + 1}: {(weight * 100).toFixed(1)}%
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end mt-3">
                          {model.model_weights_url ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadModel(
                                model.model_weights_url!,
                                `aggregated_round_${model.round_number}.pkl`
                              )}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Model
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              <Download className="h-4 w-4 mr-2" />
                              No File Available
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No aggregated models yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {isParticipant && (
            <TabsContent value="contribute" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Submit Model Update</CardTitle>
                      <CardDescription>
                        Upload your locally trained model weights for round {project.current_round || 1}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.status !== 'training' ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Training has not started yet. Wait for the project owner to start training.</p>
                        </div>
                      ) : (
                        <>
                          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                            <h4 className="font-semibold text-sm">Training Guidelines</h4>
                            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                              <li>Train your model locally using your private data</li>
                              <li>Export model weights in .pkl, .h5, .pt, or .onnx format</li>
                              <li>File size limit: 100MB</li>
                              <li>Report accurate training metrics (accuracy, loss, samples)</li>
                              <li>Set appropriate privacy parameters (epsilon, delta)</li>
                            </ul>
                          </div>
                          
                          <SubmitModelUpdateDialog
                            projectId={project.id}
                            participantId={myParticipation?.id || ''}
                            currentRound={project.current_round || 1}
                            onSuccess={() => {
                              // Refresh data after submission
                              window.location.reload();
                            }}
                          />
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  {!privacyBudget.isLoading && (
                    <PrivacyBudgetTracker
                      totalBudget={privacyBudget.totalBudget || 1.0}
                      usedBudget={privacyBudget.usedBudget || 0}
                      remainingBudget={privacyBudget.remainingBudget || 0}
                    />
                  )}
                </div>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="instructions" className="mt-6">
            <TrainingInstructions 
              modelType={project.model_type}
              privacyBudget={project.privacy_budget || 1.0}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FederatedProjectDetail;
