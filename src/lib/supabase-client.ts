
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uefzfpwbqpcvccwruavm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZnpmcHdicXBjdmNjd3J1YXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDc0NTUsImV4cCI6MjA1NzM4MzQ1NX0.q_QWJEhgJE9U_BiLOOAP7Is-Q4kPk9TAacXq7ITZiCE';

// Create the Supabase client with better error handling and debugging
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'methodiq-auth',
    debug: true // Enable debug mode for auth issues
  }
});

// Log the connection status to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl);
console.log('Supabase client initialized with key:', supabaseAnonKey ? 'Valid key provided' : 'Missing key');
