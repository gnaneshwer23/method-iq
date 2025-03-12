
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create the Supabase client with better error handling and debugging
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'methodiq-auth',
      debug: true // Enable debug mode for auth issues
    }
  }
);

// Log the connection status to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl ? 'Valid URL' : 'Missing URL');

// In a production environment, you would handle this situation more gracefully
if (!supabaseUrl || !supabaseAnonKey) {
  // You can add additional handling here, perhaps disable certain features
  console.warn('Supabase client is running with placeholder values. Some features may not work correctly.');
}
