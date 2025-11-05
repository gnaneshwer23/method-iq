import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegisterDeviceDialog } from "@/components/iot/RegisterDeviceDialog";
import { DeviceCard } from "@/components/iot/DeviceCard";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { useAuth } from "@/contexts/AuthContext";
import { Activity } from "lucide-react";

const IoTDevices = () => {
  const { user } = useAuth();
  const { data: devicesResponse, isLoading } = useIoTDevices(user?.id);

  const devices = devicesResponse?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Activity className="h-10 w-10 text-primary" />
                IoT Devices
              </h1>
              <p className="text-muted-foreground text-lg">
                Connect and monitor your lab equipment in real-time
              </p>
            </div>
            <RegisterDeviceDialog />
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading devices...
            </div>
          ) : devices.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No devices registered</h3>
              <p className="text-muted-foreground mb-6">
                Register your first IoT device to start monitoring lab equipment
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IoTDevices;
