import type { APIRoute } from 'astro'
import { createBEClient } from '../../lib/SupabaseServer'
import { safeNextPath, withAuthError } from '../../utils/safeNextPath'

// PKCE code exchange. Only works in the same browser that requested the
// link (the code verifier lives in a cookie there). Kept for OAuth and for
// old magic links still sitting in inboxes; new emails use /auth/confirm.
export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {
  const supabase = createBEClient({ request, cookies })
  const authCode = url.searchParams.get('code')
  const next = safeNextPath(url.searchParams.get('next'))

  if (!authCode) {
    return redirect(withAuthError(next, 'link_expired'))
  }

  const { error } = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) {
    console.error('Auth error:', error.message)
    return redirect(withAuthError(next, 'link_expired'))
  }

  return redirect(next)
}
