import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

// Initialize the Supabase client with hardcoded fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uefzfpwbqpcvccwruavm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZnpmcHdicXBjdmNjd3J1YXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDc0NTUsImV4cCI6MjA1NzM4MzQ1NX0.q_QWJEhgJE9U_BiLOOAP7Is-Q4kPk9TAacXq7ITZiCE';

// Create the Supabase client with enhanced configuration for reliability
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'methodiq-auth',
    debug: true // Enable debug mode for auth issues
  },
  global: {
    fetch: (url, options) => {
      logger.log('Supabase API request:', url);
      return fetch(url, options);
    }
  }
});

// Log the connection status to help with debugging
logger.log('Supabase client initialized with URL:', supabaseUrl);
logger.log('Supabase client initialized with key:', supabaseAnonKey ? 'Valid key provided' : 'Missing key');

// Test the connection to ensure it's working
supabase.auth.onAuthStateChange((event, session) => {
  logger.log('Auth state changed:', event, session ? 'User authenticated' : 'No user');
});

// Export a helper function to check if the client is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
