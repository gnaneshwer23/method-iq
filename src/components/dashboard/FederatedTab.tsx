
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFederatedLearning } from "@/hooks/useFederatedLearning";

export const FederatedTab = () => {
  const navigate = useNavigate();
  const { projects, myParticipations } = useFederatedLearning();

  const activeProjects = projects?.filter(p => p.status === 'recruiting' || p.status === 'training') || [];
  const myActiveParticipations = myParticipations?.filter((p: any) => 
    p.project?.status === 'training' || p.project?.status === 'recruiting'
  ) || [];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for collaboration
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Participations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myActiveParticipations.length}</div>
            <p className="text-xs text-muted-foreground">
              Ongoing collaborations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {myParticipations?.reduce((sum: number, p: any) => sum + (p.contribution_count || 0), 0) || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Model updates submitted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Federated Learning Projects</CardTitle>
              <CardDescription>Collaborate on AI models with privacy preservation</CardDescription>
            </div>
            <Button onClick={() => navigate('/federated-learning')}>
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.slice(0, 3).map((project) => {
                const isParticipant = myParticipations?.some((p: any) => p.project_id === project.id);
                return (
                  <div 
                    key={project.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => navigate(`/federated-learning/${project.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.model_type} • Round {project.current_round}/{project.total_rounds}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isParticipant && (
                        <Badge variant="secondary">Participating</Badge>
                      )}
                      <Badge variant={project.status === 'recruiting' ? 'default' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <BrainCircuit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No active federated learning projects</p>
              <Button onClick={() => navigate('/federated-learning')}>
                Browse Projects
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
