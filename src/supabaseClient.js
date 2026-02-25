import { createClient } from '@supabase/supabase-js';

// Supabase URL and Anon Key from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Validate that required environment variables are set
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create and export Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


