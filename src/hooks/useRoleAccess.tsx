
import { useAuth } from "@/contexts/AuthContext";

type Permission = 'create:protocol' | 'edit:protocol' | 'manage:devices' | 
                 'view:all' | 'create:experiment' | 'run:experiment' | 
                 'read:blockchain' | 'receive:ai' | 'write:partial';

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'create:protocol',
    'edit:protocol',
    'manage:devices',
    'view:all',
    'create:experiment',
    'run:experiment',
    'read:blockchain',
    'receive:ai',
    'write:partial'
  ],
  researcher: [
    'create:experiment',
    'run:experiment',
    'read:blockchain',
    'receive:ai'
  ],
  collaborator: [
    'read:blockchain',
    'write:partial'
  ]
};

export const useRoleAccess = () => {
  const { user } = useAuth();
  
  const hasPermission = (permission: Permission): boolean => {
    // If no user or role, deny access
    if (!user?.role) return false;
    
    // Get permissions for the user's role
    const permissions = rolePermissions[user.role];
    
    // Check if the user's role has the required permission
    return permissions?.includes(permission) || false;
  };
  
  return {
    hasPermission,
    isAdmin: user?.role === 'admin',
    isResearcher: user?.role === 'researcher',
    isCollaborator: user?.role === 'collaborator'
  };
};
