
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const AnalyticsSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-blue-500" />
          Research Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center bg-slate-50 rounded-md mb-4">
          <p className="text-sm text-muted-foreground">Analytics visualization will appear here</p>
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
        <Button variant="outline" className="w-full text-sm">Full Analytics</Button>
      </CardFooter>
    </Card>
  );
};
