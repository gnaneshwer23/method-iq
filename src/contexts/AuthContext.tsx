
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-client';
import { authApi } from '@/lib/api/auth';
import { useToast } from '@/components/ui/use-toast';
import type { UserRole } from '@/types/auth.types';

// Extended user type with role
export type AuthUser = User & { role?: UserRole | null };

type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user role from user_roles table
  const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role || null;
    } catch (error) {
      console.error('Exception fetching user role:', error);
      return null;
    }
  };

  // Set user with role
  const setUserWithRole = async (authUser: User | null) => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const role = await fetchUserRole(authUser.id);
    setUser({ ...authUser, role });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Get initial session
      try {
        const { session: initialSession } = await authApi.getSession();
        console.log('Initial session:', initialSession);
        setSession(initialSession);
        
        if (initialSession?.user) {
          await setUserWithRole(initialSession.user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
      
      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          console.log('Auth state changed:', event, newSession);
          setSession(newSession);
          
          // Defer role fetching to avoid blocking
          if (newSession?.user) {
            setTimeout(() => {
              setUserWithRole(newSession.user);
            }, 0);
          } else {
            setUser(null);
          }
          
          setLoading(false);
        }
      );
      
      return () => {
        authListener?.subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt with email:', email);
      const { data, error } = await authApi.signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: 'Login failed',
          description: error.message || 'An error occurred during login',
          variant: 'destructive',
        });
        return { success: false, error: error.message };
      }
      
      console.log('Login successful:', data);
      toast({
        title: 'Login successful',
        description: 'Welcome back to MethodIQ!',
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Login exception:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
        variant: 'destructive',
      });
      
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      console.log('Registration attempt with email:', email);
      const { data, error } = await authApi.signUp(email, password);
      
      if (error) {
        console.error('Registration error:', error);
        toast({
          title: 'Registration failed',
          description: error.message || 'An error occurred during registration',
          variant: 'destructive',
        });
        return { success: false, error: error.message };
      }
      
      console.log('Registration data:', data);
      
      // Check if the sign up was successful
      if (data.user) {
        toast({
          title: 'Registration successful',
          description: 'Please check your email to confirm your account',
        });
        return { success: true };
      } else {
        console.error('Registration failed: No user data', data);
        toast({
          title: 'Registration failed',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });
        return { success: false, error: 'An unexpected error occurred' };
      }
    } catch (error: any) {
      console.error('Registration exception:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration',
        variant: 'destructive',
      });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('Logout attempt');
      const { error } = await authApi.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: 'Logout failed',
          description: error.message || 'An error occurred during logout',
          variant: 'destructive',
        });
        return { success: false, error: error.message };
      }
      
      console.log('Logout successful');
      toast({
        title: 'Logout successful',
        description: 'You have been logged out',
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Logout exception:', error);
      toast({
        title: 'Logout failed',
        description: error.message || 'An error occurred during logout',
        variant: 'destructive',
      });
      
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
