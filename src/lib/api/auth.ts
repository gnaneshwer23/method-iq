import { supabase } from '../supabase-client';
import { logger } from '../logger';

export const authApi = {
  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    logger.log('Attempting to sign in with email:', email);
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      logger.log('Sign in response:', response);
      
      if (response.error) {
        logger.error('Sign in error details:', response.error);
        // Add more detailed error information
        if (response.error.message.includes('rate limited')) {
          return { ...response, error: { ...response.error, message: 'Too many login attempts. Please try again later.' } };
        }
      }
      
      return response;
    } catch (error) {
      logger.error('Sign in exception:', error);
      throw error;
    }
  },

  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string) => {
    logger.log('Attempting to sign up with email:', email);
    try {
      // First, check if user already exists
      const { data: existingUsers } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();
        
      if (existingUsers) {
        return { 
          data: { user: null }, 
          error: { message: 'A user with this email already exists.' } 
        };
      }
      
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            email: email,
          }
        }
      });
      
      logger.log('Sign up response:', response);
      
      if (response.error) {
        logger.error('Sign up error details:', response.error);
      } else {
        logger.log('Sign up successful! User created:', response.data.user?.id);
      }
      
      return response;
    } catch (error) {
      logger.error('Sign up exception:', error);
      return { 
        data: { user: null }, 
        error: { message: 'Registration failed. Please try again later.' } 
      };
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    logger.log('Attempting to sign out');
    try {
      const response = await supabase.auth.signOut();
      logger.log('Sign out response:', response);
      return response;
    } catch (error) {
      logger.error('Sign out error:', error);
      throw error;
    }
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    logger.log('Getting current session');
    try {
      const { data, error } = await supabase.auth.getSession();
      logger.log('Session data:', data);
      if (error) logger.error('Session error:', error);
      return { session: data.session, error };
    } catch (error) {
      logger.error('Get session error:', error);
      return { session: null, error };
    }
  },

  /**
   * Get the current user
   */
  getCurrentUser: async () => {
    logger.log('Getting current user');
    try {
      const { data, error } = await supabase.auth.getUser();
      logger.log('User data:', data);
      if (error) logger.error('Get user error:', error);
      return { user: data.user, error };
    } catch (error) {
      logger.error('Get current user error:', error);
      return { user: null, error };
    }
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string) => {
    logger.log('Sending password reset email to:', email);
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });
      logger.log('Reset password response:', response);
      return response;
    } catch (error) {
      logger.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Update password with reset token
   */
  updatePassword: async (newPassword: string) => {
    logger.log('Updating password');
    try {
      const response = await supabase.auth.updateUser({
        password: newPassword,
      });
      logger.log('Update password response:', response);
      return response;
    } catch (error) {
      logger.error('Update password error:', error);
      throw error;
    }
  }
};
