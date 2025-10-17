import { createClient } from '@supabase/supabase-js';

// ===================================================================
// ENVIRONMENT VARIABLE VALIDATION
// ===================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate that required environment variables are present
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Missing required Supabase environment variables.\n\n' +
    'Please ensure the following are set in your .env.local file:\n' +
    '  • NEXT_PUBLIC_SUPABASE_URL\n' +
    '  • NEXT_PUBLIC_SUPABASE_ANON_KEY\n\n' +
    'Current values:\n' +
    `  • NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}\n` +
    `  • NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Set' : '✗ Missing'}`
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch {
  throw new Error(
    `❌ Invalid NEXT_PUBLIC_SUPABASE_URL format: "${supabaseUrl}"\n\n` +
    'The Supabase URL must be a valid URL (e.g., https://xxxxx.supabase.co)'
  );
}

// ===================================================================
// SUPABASE CLIENT CREATION
// ===================================================================

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No session persistence needed for contact form
    autoRefreshToken: false, // No token refresh needed
  },
});
