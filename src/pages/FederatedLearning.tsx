import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Network, Shield, Users } from "lucide-react";
import { useFederatedLearning } from "@/hooks/useFederatedLearning";
import { CreateProjectDialog } from "@/components/federated/CreateProjectDialog";
import { ProjectCard } from "@/components/federated/ProjectCard";

const FederatedLearning = () => {
  const { projects, projectsLoading, myParticipations, participationsLoading } = useFederatedLearning();

  const myProjectIds = new Set(myParticipations?.map(p => p.project_id) || []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Brain className="h-10 w-10 text-primary" />
                Federated Learning
              </h1>
              <p className="text-lg text-muted-foreground">
                Collaborate on AI models while preserving data privacy and security
              </p>
            </div>
            <CreateProjectDialog />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Privacy-Preserving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Train models without sharing raw data using differential privacy and secure aggregation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-500" />
                  Distributed Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Collaborate across institutions without centralizing sensitive research data
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Collaborative Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Join forces with researchers worldwide to train more robust AI models
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="my">My Participations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {projectsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    isParticipant={myProjectIds.has(project.id)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No federated learning projects yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Create the first project to get started</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my" className="mt-6">
            {participationsLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading participations...</p>
              </div>
            ) : myParticipations && myParticipations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myParticipations.map((participation: any) => (
                  <ProjectCard 
                    key={participation.id} 
                    project={participation.project}
                    isParticipant={true}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You haven't joined any projects yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Browse available projects and join one to start collaborating</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FederatedLearning;
