import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Per-request Supabase client for Server Components, Server Actions and
 * Route Handlers. Uses the anon key — public reads only.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component — cookies are read-only here.
            // The middleware / Server Action layer will refresh tokens instead.
          }
        },
      },
    },
  );
}

/**
 * Returns `true` only when Supabase env vars look filled in. Useful for
 * graceful empty-state rendering before the project is provisioned.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
