import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production environment, these should be in a .env file.
// Since we are in a browser-based ESM environment for this demo, we use the provided keys directly if env vars aren't present.
// We check typeof process !== 'undefined' to avoid ReferenceErrors in strict browser environments.

const getEnv = (key: string, fallback: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

const supabaseUrl = getEnv(
  'REACT_APP_SUPABASE_URL', 
  'https://msevbxbjllnwxorjtapd.supabase.co'
);

const supabaseAnonKey = getEnv(
  'REACT_APP_SUPABASE_ANON_KEY', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZXZieGJqbGxud3hvcmp0YXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3ODUzOTksImV4cCI6MjA4MDM2MTM5OX0.IpVp_dXTnN2lI5ZXdGbgsuAswwsJO_7nxfG2Bd5vLHY'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);