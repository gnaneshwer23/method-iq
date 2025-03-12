
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const SimulationsTab = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Digital Twins</CardTitle>
          <CardDescription>Create virtual representations of experiments</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => navigate('/digital-twins')}>
            Create Digital Twin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
