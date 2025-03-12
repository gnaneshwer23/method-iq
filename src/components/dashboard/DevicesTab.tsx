
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const DevicesTab = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Connect IoT Devices</CardTitle>
          <CardDescription>Link lab equipment to your digital workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" onClick={() => navigate('/iot-devices')}>
            Connect Device
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
