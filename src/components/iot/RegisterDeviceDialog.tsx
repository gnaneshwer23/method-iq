import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterDevice } from "@/hooks/useIoTDevices";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const RegisterDeviceDialog = () => {
  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [configuration, setConfiguration] = useState("{}");
  
  const { user } = useAuth();
  const registerDevice = useRegisterDevice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      const configJson = JSON.parse(configuration);
      await registerDevice.mutateAsync({
        user_id: user.id,
        device_name: deviceName,
        device_type: deviceType,
        manufacturer: manufacturer || undefined,
        model: model || undefined,
        configuration: configJson,
        metadata: {},
      });
      
      setOpen(false);
      setDeviceName("");
      setDeviceType("");
      setManufacturer("");
      setModel("");
      setConfiguration("{}");
    } catch (error) {
      console.error('Error registering device:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Register Device
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register IoT Device</DialogTitle>
          <DialogDescription>
            Connect a new lab device to your workspace
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="device-name">Device Name *</Label>
            <Input
              id="device-name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Lab Sensor 01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-type">Device Type *</Label>
            <Select value={deviceType} onValueChange={setDeviceType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature Sensor</SelectItem>
                <SelectItem value="pressure">Pressure Sensor</SelectItem>
                <SelectItem value="ph">pH Meter</SelectItem>
                <SelectItem value="microscope">Microscope</SelectItem>
                <SelectItem value="spectrometer">Spectrometer</SelectItem>
                <SelectItem value="centrifuge">Centrifuge</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Device manufacturer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Device model"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="configuration">Configuration (JSON)</Label>
            <Textarea
              id="configuration"
              value={configuration}
              onChange={(e) => setConfiguration(e.target.value)}
              placeholder='{"sampling_rate": 1000}'
              className="font-mono text-sm"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={registerDevice.isPending}>
            {registerDevice.isPending ? 'Registering...' : 'Register Device'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
