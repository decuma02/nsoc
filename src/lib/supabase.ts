import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — only created when env vars are available (browser / runtime).
// Checks NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (Vercel standard) or NEXT_PUBLIC_SUPABASE_ANON_KEY.
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!_client) {
    _client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return _client;
}

// Convenience re-export
export { getSupabaseClient as supabase };
