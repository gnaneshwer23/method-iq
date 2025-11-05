import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Wifi, WifiOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IoTDevice } from "@/types/database.types";
import { formatDistanceToNow } from "date-fns";

interface DeviceCardProps {
  device: IoTDevice;
}

export const DeviceCard = ({ device }: DeviceCardProps) => {
  const navigate = useNavigate();

  const getStatusIcon = () => {
    switch (device.connection_status) {
      case 'online':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-muted-foreground" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    switch (device.connection_status) {
      case 'online':
        return 'default' as const;
      case 'offline':
        return 'secondary' as const;
      case 'error':
        return 'destructive' as const;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {device.device_name}
            </CardTitle>
            <CardDescription className="capitalize">{device.device_type}</CardDescription>
          </div>
          <Badge variant={getStatusVariant()} className="flex items-center gap-1">
            {getStatusIcon()}
            {device.connection_status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          {device.manufacturer && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Manufacturer:</span>
              <span className="font-medium">{device.manufacturer}</span>
            </div>
          )}
          {device.model && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-medium">{device.model}</span>
            </div>
          )}
          {device.last_connected_at && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Connected:</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(device.last_connected_at), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/iot-devices/${device.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
