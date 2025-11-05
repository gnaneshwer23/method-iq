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
import { useCreateExperiment } from '@/hooks/useExperiments';
import { Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateExperimentDialogProps {
  protocolId?: string;
  protocolTitle?: string;
}

export const CreateExperimentDialog = ({ protocolId, protocolTitle }: CreateExperimentDialogProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const createExperiment = useCreateExperiment();

  const [formData, setFormData] = useState({
    protocol_id: protocolId || '',
    notes: '',
    time_taken_minutes: '',
    success_percentage: '',
    temperature: '',
    humidity: '',
    pressure: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const environmentConditions: Record<string, any> = {};
    if (formData.temperature) environmentConditions.temperature = parseFloat(formData.temperature);
    if (formData.humidity) environmentConditions.humidity = parseFloat(formData.humidity);
    if (formData.pressure) environmentConditions.pressure = parseFloat(formData.pressure);

    const result = await createExperiment.mutateAsync({
      protocol_id: formData.protocol_id,
      notes: formData.notes || undefined,
      time_taken_minutes: formData.time_taken_minutes ? parseInt(formData.time_taken_minutes) : undefined,
      success_percentage: formData.success_percentage ? parseFloat(formData.success_percentage) : undefined,
      environment_conditions: Object.keys(environmentConditions).length > 0 ? environmentConditions : undefined,
    });

    setOpen(false);
    setFormData({
      protocol_id: protocolId || '',
      notes: '',
      time_taken_minutes: '',
      success_percentage: '',
      temperature: '',
      humidity: '',
      pressure: '',
    });

    if (result.data) {
      navigate(`/experiments/${result.data.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Experiment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
          <DialogDescription>
            {protocolTitle ? `Run an experiment using: ${protocolTitle}` : 'Record a new research experiment'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!protocolId && (
            <div>
              <Label htmlFor="protocol_id">Protocol ID *</Label>
              <Input
                id="protocol_id"
                required
                value={formData.protocol_id}
                onChange={(e) => setFormData({ ...formData, protocol_id: e.target.value })}
                placeholder="Enter protocol ID"
              />
            </div>
          )}

          <div>
            <Label htmlFor="notes">Experiment Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe your experiment setup, observations, and findings..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time_taken">Time Taken (minutes)</Label>
              <Input
                id="time_taken"
                type="number"
                min="0"
                value={formData.time_taken_minutes}
                onChange={(e) => setFormData({ ...formData, time_taken_minutes: e.target.value })}
                placeholder="120"
              />
            </div>

            <div>
              <Label htmlFor="success">Success Rate (%)</Label>
              <Input
                id="success"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.success_percentage}
                onChange={(e) => setFormData({ ...formData, success_percentage: e.target.value })}
                placeholder="95.5"
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Environment Conditions (Optional)</h4>
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
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  step="0.1"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                  placeholder="60.0"
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
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createExperiment.isPending}>
              {createExperiment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Experiment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
