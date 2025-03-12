
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const AnalyticsSummary = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <LineChart className="h-5 w-5 text-blue-500" />
          Research Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-36 flex items-center justify-center bg-slate-50 rounded-md mb-4">
          <p className="text-sm text-muted-foreground">Analytics visualization</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">Total Data Points</p>
            <p className="font-semibold">16.4k</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">Processing Time</p>
            <p className="font-semibold">12.3 hrs</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full text-sm">
          Full Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};
