import type { APIRoute } from 'astro'
import { createBEClient } from '../../../lib/SupabaseServer'

// Verifies the code from the sign-in email. Session cookies are set
// on this response via createBEClient's setAll, so the browser that typed
// the code is the one that ends up signed in.
export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => ({}))
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body.token === 'string' ? body.token.replace(/\s/g, '') : ''

  // Supabase's email OTP length is a project setting (6–10 digits)
  if (!email || !/^\d{6,10}$/.test(token)) {
    return new Response('Please enter the code from your email.', { status: 400 })
  }

  const supabase = createBEClient({ request, cookies })
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

  if (error) {
    console.error('[verify-otp] verifyOtp failed', {
      status: error.status,
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
    })
    return new Response('That code is incorrect or has expired. Try again or request a new code.', {
      status: 400,
    })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
