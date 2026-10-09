import type { APIRoute } from 'astro'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createBEClient } from '../../lib/SupabaseServer'
import { safeNextPath, withAuthError } from '../../utils/safeNextPath'

// Fallback link from the sign-in email. Unlike /auth/callback, verifying a
// token_hash needs no code-verifier cookie, so it works no matter which
// browser or device opens the email (phone mail apps, in-app browsers, etc).
export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {
  const supabase = createBEClient({ request, cookies })
  const tokenHash = url.searchParams.get('token_hash')
  const type = (url.searchParams.get('type') ?? 'email') as EmailOtpType
  const next = safeNextPath(url.searchParams.get('next'))

  if (!tokenHash) {
    return redirect(withAuthError(next, 'link_expired'))
  }

  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (error) {
    console.error('[auth/confirm] verifyOtp failed', {
      status: error.status,
      code: error.code,
      message: error.message,
    })
    return redirect(withAuthError(next, 'link_expired'))
  }

  return redirect(next)
}
