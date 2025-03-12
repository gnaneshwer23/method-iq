
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create the Supabase client with better error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', // Placeholder to prevent runtime errors
  supabaseAnonKey || 'placeholder-key', // Placeholder to prevent runtime errors
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// In a production environment, you would handle this situation more gracefully
if (!supabaseUrl || !supabaseAnonKey) {
  // You can add additional handling here, perhaps disable certain features
  console.warn('Supabase client is running with placeholder values. Some features may not work correctly.');
}
