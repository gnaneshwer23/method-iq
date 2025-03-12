
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FederatedTab = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
            Federated Learning
          </CardTitle>
          <CardDescription>Collaborate on AI models while preserving data privacy</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => navigate('/federated-learning')}>
            Join Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
