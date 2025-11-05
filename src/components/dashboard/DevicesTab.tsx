
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, Wifi, WifiOff, AlertCircle } from "lucide-react";

export const DevicesTab = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: devicesResponse } = useIoTDevices(user?.id);
  
  const devices = devicesResponse?.data || [];
  const onlineDevices = devices.filter(d => d.connection_status === 'online').length;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
            <Wifi className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineDevices}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline Devices</CardTitle>
            <WifiOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length - onlineDevices}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Devices</CardTitle>
          <CardDescription>Your connected lab equipment</CardDescription>
        </CardHeader>
        <CardContent>
          {devices.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No devices registered yet</p>
              <Button onClick={() => navigate('/iot-devices')}>
                Register First Device
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {devices.slice(0, 5).map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => navigate(`/iot-devices/${device.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{device.device_name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{device.device_type}</p>
                    </div>
                  </div>
                  <Badge variant={device.connection_status === 'online' ? 'default' : 'secondary'}>
                    {device.connection_status === 'online' ? (
                      <Wifi className="h-3 w-3 mr-1" />
                    ) : device.connection_status === 'error' ? (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <WifiOff className="h-3 w-3 mr-1" />
                    )}
                    {device.connection_status}
                  </Badge>
                </div>
              ))}
              {devices.length > 5 && (
                <Button variant="outline" className="w-full" onClick={() => navigate('/iot-devices')}>
                  View All Devices
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
