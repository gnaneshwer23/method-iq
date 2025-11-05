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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateDigitalTwin } from '@/hooks/useDigitalTwins';
import { Plus, Loader2 } from 'lucide-react';

export const CreateTwinDialog = () => {
  const [open, setOpen] = useState(false);
  const createTwin = useCreateDigitalTwin();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    twin_type: 'equipment' as 'equipment' | 'system' | 'process',
    physical_id: '',
    temperature: '',
    pressure: '',
    flow_rate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const state: Record<string, any> = {};
    if (formData.temperature) state.temperature = parseFloat(formData.temperature);
    if (formData.pressure) state.pressure = parseFloat(formData.pressure);
    if (formData.flow_rate) state.flow_rate = parseFloat(formData.flow_rate);
    state.active = true;

    await createTwin.mutateAsync({
      name: formData.name,
      description: formData.description || undefined,
      twin_type: formData.twin_type,
      physical_id: formData.physical_id || undefined,
      state,
    });

    setOpen(false);
    setFormData({
      name: '',
      description: '',
      twin_type: 'equipment',
      physical_id: '',
      temperature: '',
      pressure: '',
      flow_rate: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Digital Twin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Digital Twin</DialogTitle>
          <DialogDescription>
            Create a virtual replica of a physical system or equipment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bioreactor A1"
              />
            </div>

            <div>
              <Label htmlFor="twin_type">Type *</Label>
              <Select
                value={formData.twin_type}
                onValueChange={(value: any) => setFormData({ ...formData, twin_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="process">Process</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the physical system or equipment..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="physical_id">Physical ID/Serial</Label>
            <Input
              id="physical_id"
              value={formData.physical_id}
              onChange={(e) => setFormData({ ...formData, physical_id: e.target.value })}
              placeholder="SN-12345"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Initial State Parameters</h4>
            <div className="grid grid-cols-3 gap-4">
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
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createTwin.isPending}>
              {createTwin.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Twin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
