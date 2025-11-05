import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIoTDevice, useSensorData, useSensorDataRealtime } from "@/hooks/useIoTDevices";
import { SensorDataChart } from "@/components/iot/SensorDataChart";
import { ArrowLeft, Activity, Wifi, WifiOff, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useState } from "react";

const IoTDeviceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: deviceResponse } = useIoTDevice(id!);
  const { data: sensorDataResponse } = useSensorData(id!, { limit: 50 });
  const [realtimeCount, setRealtimeCount] = useState(0);

  const handleRealtimeUpdate = useCallback(() => {
    setRealtimeCount(prev => prev + 1);
  }, []);

  useSensorDataRealtime(id!, handleRealtimeUpdate);

  const device = deviceResponse?.data;
  const sensorData = sensorDataResponse?.data || [];

  const getStatusIcon = () => {
    if (!device) return null;
    switch (device.connection_status) {
      case 'online':
        return <Wifi className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <WifiOff className="h-5 w-5 text-muted-foreground" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    if (!device) return 'secondary';
    switch (device.connection_status) {
      case 'online':
        return 'default' as const;
      case 'offline':
        return 'secondary' as const;
      case 'error':
        return 'destructive' as const;
    }
  };

  if (!device) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading device...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/iot-devices')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Activity className="h-10 w-10 text-primary" />
                {device.device_name}
              </h1>
              <p className="text-muted-foreground text-lg capitalize">{device.device_type}</p>
            </div>
            <Badge variant={getStatusVariant()} className="flex items-center gap-2 px-3 py-2">
              {getStatusIcon()}
              <span className="capitalize">{device.connection_status}</span>
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>Technical specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device ID:</span>
                  <span className="font-mono text-xs">{device.id}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Status</CardTitle>
                <CardDescription>Live monitoring data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">{device.connection_status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Points:</span>
                  <span className="font-medium">{sensorData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Real-time Updates:</span>
                  <span className="font-medium">{realtimeCount}</span>
                </div>
                {sensorData.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latest Reading:</span>
                    <span className="font-medium">
                      {sensorData[0].value} {sensorData[0].unit}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {sensorData.length > 0 && (
            <SensorDataChart 
              data={sensorData} 
              title={`${device.device_name} - Sensor Readings`}
            />
          )}

          {device.configuration && Object.keys(device.configuration).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Device settings and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(device.configuration, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IoTDeviceDetail;
