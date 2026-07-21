import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { AstroCookies } from 'astro'

// Bypasses RLS entirely -- only for trusted server-side paths (Stripe webhook,
// checkout-session verification fallback) that write to tables with no
// client-facing insert policy, e.g. `purchases`.
export function createServiceRoleClient() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}

export function createBEClient({
  request,
  cookies,
}: {
  request: Request
  cookies: AstroCookies
}) {
  const cookieHeader = request.headers.get('Cookie') || ''

  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(cookieHeader)
          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? '',
          }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookies.set(name, value, options),
          )
        },
      },
    },
  )
}
