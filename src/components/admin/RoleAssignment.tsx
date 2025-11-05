import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { adminApi, type UserWithRole } from '@/lib/api/admin';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['app_role'];

interface RoleAssignmentProps {
  user: UserWithRole;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const roles: { value: UserRole; label: string; description: string }[] = [
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Full system access with user management capabilities',
  },
  {
    value: 'researcher',
    label: 'Researcher',
    description: 'Can create protocols, experiments, and manage own devices',
  },
  {
    value: 'reviewer',
    label: 'Reviewer',
    description: 'Can review and verify protocols submitted by others',
  },
];

export function RoleAssignment({ user, open, onClose, onSuccess }: RoleAssignmentProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role || 'researcher');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    
    const { error } = await adminApi.updateUserRole(user.id, selectedRole);
    
    if (error) {
      toast({
        title: 'Error updating role',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Role updated',
        description: `${user.email} is now a ${selectedRole}`,
      });
      onSuccess();
      onClose();
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>
          <DialogDescription>
            Update the role for <strong>{user.email}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.value} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={role.value} id={role.value} />
                  <Label htmlFor={role.value} className="cursor-pointer flex-1">
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Updating...' : 'Update Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
