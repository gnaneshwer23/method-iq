import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateSimulation } from '@/hooks/useDigitalTwins';
import { useProtocols } from '@/hooks/useProtocols';
import { Play, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RunSimulationDialogProps {
  twinId: string;
  twinName: string;
}

export const RunSimulationDialog = ({ twinId, twinName }: RunSimulationDialogProps) => {
  const [open, setOpen] = useState(false);
  const createSimulation = useCreateSimulation();
  const { data: protocolsResponse } = useProtocols();
  const protocols = protocolsResponse?.data || [];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    protocol_id: '',
    temperature: '',
    pressure: '',
    flow_rate: '',
    duration: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputParameters: Record<string, any> = {};
    if (formData.temperature) inputParameters.temperature = parseFloat(formData.temperature);
    if (formData.pressure) inputParameters.pressure = parseFloat(formData.pressure);
    if (formData.flow_rate) inputParameters.flow_rate = parseFloat(formData.flow_rate);
    if (formData.duration) inputParameters.duration = parseInt(formData.duration);

    await createSimulation.mutateAsync({
      twin_id: twinId,
      protocol_id: formData.protocol_id || undefined,
      name: formData.name,
      description: formData.description || undefined,
      input_parameters: inputParameters,
    });

    setOpen(false);
    setFormData({
      name: '',
      description: '',
      protocol_id: '',
      temperature: '',
      pressure: '',
      flow_rate: '',
      duration: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          Run Simulation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Run Simulation</DialogTitle>
          <DialogDescription>
            Simulate outcomes for {twinName} before running physical experiments
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Simulation Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Temperature stress test"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what you're testing..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="protocol">Protocol (Optional)</Label>
            <Select
              value={formData.protocol_id}
              onValueChange={(value) => setFormData({ ...formData, protocol_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a protocol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No protocol</SelectItem>
                {protocols.map((protocol: any) => (
                  <SelectItem key={protocol.id} value={protocol.id}>
                    {protocol.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Simulation Parameters</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  placeholder="25.0"
                />
              </div>

              <div>
                <Label htmlFor="pressure">Pressure (kPa)</Label>
                <Input
                  id="pressure"
                  type="number"
                  step="0.1"
                  value={formData.pressure}
                  onChange={(e) => setFormData({ ...formData, pressure: e.target.value })}
                  placeholder="101.3"
                />
              </div>

              <div>
                <Label htmlFor="flow_rate">Flow Rate (L/min)</Label>
                <Input
                  id="flow_rate"
                  type="number"
                  step="0.1"
                  value={formData.flow_rate}
                  onChange={(e) => setFormData({ ...formData, flow_rate: e.target.value })}
                  placeholder="2.5"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="60"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createSimulation.isPending}>
              {createSimulation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Run Simulation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
