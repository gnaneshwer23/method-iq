import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useCreateProtocol } from '@/hooks/useProtocols';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const AVAILABLE_TAGS = [
  'molecular-biology',
  'protein-analysis',
  'cell-culture',
  'genomics',
  'immunology',
  'chemistry',
  'materials-science',
  'high-throughput',
  'microscopy',
  'spectroscopy'
];

export const CreateProtocolDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    tags: [] as string[],
    estimated_duration_minutes: '',
    estimated_cost: '',
  });

  const createProtocol = useCreateProtocol();
  const { user } = useAuth();

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    await createProtocol.mutateAsync({
      title: formData.title,
      summary: formData.summary,
      tags: formData.tags,
      estimated_duration_minutes: formData.estimated_duration_minutes ? parseInt(formData.estimated_duration_minutes) : null,
      estimated_cost: formData.estimated_cost ? parseFloat(formData.estimated_cost) : null,
      created_by: user.id,
      verified: false,
    } as any);

    setFormData({
      title: '',
      summary: '',
      tags: [],
      estimated_duration_minutes: '',
      estimated_cost: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Protocol
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Protocol</DialogTitle>
          <DialogDescription>
            Add a new research protocol to share with the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Western Blot Protein Analysis"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Describe the protocol's purpose and methodology..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.estimated_duration_minutes}
                onChange={(e) => setFormData({ ...formData, estimated_duration_minutes: e.target.value })}
                placeholder="e.g., 120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Estimated Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.estimated_cost}
                onChange={(e) => setFormData({ ...formData, estimated_cost: e.target.value })}
                placeholder="e.g., 250"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={createProtocol.isPending} className="flex-1">
              {createProtocol.isPending ? 'Creating...' : 'Create Protocol'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
