import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Users, TrendingUp, Lock, ChevronRight } from "lucide-react";
import { FederatedProject } from "@/hooks/useFederatedLearning";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: FederatedProject;
  isParticipant?: boolean;
}

export const ProjectCard = ({ project, isParticipant }: ProjectCardProps) => {
  const navigate = useNavigate();

  const statusColors = {
    recruiting: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    training: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    archived: "bg-gray-500/10 text-gray-500 border-gray-500/20"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/federated-learning/${project.id}`)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>
          <Badge className={statusColors[project.status]}>
            {project.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Model:</span>
            <span className="font-medium">{project.model_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Objective:</span>
            <span className="font-medium">{project.learning_objective}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Min participants:</span>
            <span className="font-medium">{project.min_participants}</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Privacy ε:</span>
            <span className="font-medium">{project.privacy_budget}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm text-muted-foreground">
            Round {project.current_round} / {project.total_rounds}
          </div>
          <Button variant="ghost" size="sm">
            {isParticipant ? "View Details" : "Learn More"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
