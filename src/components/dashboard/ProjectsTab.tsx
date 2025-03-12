
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Users, Beaker } from "lucide-react";

export const ProjectsTab = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Research Projects</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Project
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <Beaker className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Gene Expression Study</CardTitle>
              </div>
              <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Active</span>
            </div>
            <CardDescription>Analyzing differential expression in cancer cells</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <span className="flex items-center">
                <CalendarClock className="h-3 w-3 mr-1" />
                Updated 2 days ago
              </span>
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                5 members
              </span>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="border-dashed border-2 flex items-center justify-center p-6 hover:border-primary/70 transition-colors cursor-pointer" onClick={() => navigate('/new-project')}>
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Create New Project</h3>
            <p className="text-sm text-muted-foreground">Start a new research initiative</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
