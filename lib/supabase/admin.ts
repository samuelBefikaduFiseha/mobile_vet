import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key. Bypasses RLS,
 * so it must never be exposed to the browser. Used inside Server Actions
 * triggered from authenticated /admin routes.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL env vars.",
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
