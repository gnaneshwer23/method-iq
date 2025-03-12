
import { supabase } from '../supabase-client';

export const authApi = {
  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    console.log('Attempting to sign in with email:', email);
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Sign in response:', response);
      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string) => {
    console.log('Attempting to sign up with email:', email);
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        }
      });
      console.log('Sign up response:', response);
      return response;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    console.log('Attempting to sign out');
    try {
      const response = await supabase.auth.signOut();
      console.log('Sign out response:', response);
      return response;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    console.log('Getting current session');
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log('Session data:', data);
      if (error) console.error('Session error:', error);
      return { session: data.session, error };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error };
    }
  },

  /**
   * Get the current user
   */
  getCurrentUser: async () => {
    console.log('Getting current user');
    try {
      const { data, error } = await supabase.auth.getUser();
      console.log('User data:', data);
      if (error) console.error('Get user error:', error);
      return { user: data.user, error };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null, error };
    }
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string) => {
    console.log('Sending password reset email to:', email);
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });
      console.log('Reset password response:', response);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Update password with reset token
   */
  updatePassword: async (newPassword: string) => {
    console.log('Updating password');
    try {
      const response = await supabase.auth.updateUser({
        password: newPassword,
      });
      console.log('Update password response:', response);
      return response;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }
};
