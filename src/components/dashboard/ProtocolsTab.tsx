
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProtocolsTab = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            AI Protocol Suggestions
          </CardTitle>
          <CardDescription>Get protocols tailored to your research</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => navigate('/ai-protocols')}>
            Generate Protocol
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
