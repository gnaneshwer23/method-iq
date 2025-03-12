
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { useAuth } from '@/contexts/AuthContext';
import type { Permission } from '@/types/auth.types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
}

export const ProtectedRoute = ({ 
  children, 
  requiredPermission 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasPermission } = useRoleAccess();
  
  // Show nothing while checking authentication
  if (loading) {
    return null;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If a specific permission is required, check it
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <>{children}</>;
};
