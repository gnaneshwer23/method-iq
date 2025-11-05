import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { adminApi, type UserWithRole } from '@/lib/api/admin';
import { UserCog, Trash2, RefreshCw } from 'lucide-react';
import { RoleAssignment } from './RoleAssignment';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function UserManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);
  const { toast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await adminApi.getAllUsers();
    
    if (error) {
      toast({
        title: 'Error loading users',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setUsers(data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    const { error } = await adminApi.deleteUser(userToDelete.id);
    
    if (error) {
      toast({
        title: 'Error deleting user',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'User deleted',
        description: 'User has been successfully deleted',
      });
      loadUsers();
    }
    
    setUserToDelete(null);
  };

  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'researcher':
        return 'default';
      case 'reviewer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and roles</CardDescription>
            </div>
            <Button 
              onClick={loadUsers} 
              variant="outline" 
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.full_name || '-'}</TableCell>
                      <TableCell>{user.institution || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role || 'No Role'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <UserCog className="h-4 w-4 mr-1" />
                            Edit Role
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUserToDelete(user)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Assignment Dialog */}
      {selectedUser && (
        <RoleAssignment
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccess={loadUsers}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account for{' '}
              <strong>{userToDelete?.email}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
