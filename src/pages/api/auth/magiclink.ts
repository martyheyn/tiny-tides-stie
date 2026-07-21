import type { APIRoute } from 'astro'
import { createBEClient, createServiceRoleClient } from '../../../lib/SupabaseServer'

const EMAIL_COOLDOWN_MS = 60 * 1000
const IP_WINDOW_MS = 60 * 60 * 1000
const IP_REQUEST_LIMIT = 20

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email } = await request.json()

  const supabase = createBEClient({ request, cookies })

  if (!email) {
    return new Response('Email is required', { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const serviceClient = createServiceRoleClient()

  const { count: recentForEmail } = await serviceClient
    .from('otp_request_log')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', new Date(Date.now() - EMAIL_COOLDOWN_MS).toISOString())

  if ((recentForEmail ?? 0) > 0) {
    return new Response('Please wait a minute before requesting another magic link.', { status: 429 })
  }

  const { count: recentForIp } = await serviceClient
    .from('otp_request_log')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', new Date(Date.now() - IP_WINDOW_MS).toISOString())

  if ((recentForIp ?? 0) >= IP_REQUEST_LIMIT) {
    return new Response('Too many requests. Please try again later.', { status: 429 })
  }

  let redirectTo = `${request.headers.get('origin')}/auth/callback`

  const referer = request.headers.get('referer')

  if (referer) {
    try {
      const refUrl = new URL(referer)
      redirectTo += refUrl.pathname.startsWith('/')
        ? `/?next=${refUrl.pathname.slice(1)}`
        : `/?next=${refUrl.pathname}`
    } catch (e) {
      console.warn('Invalid referer header:', referer)
    }
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  })

  if (error) {
    console.error('[magiclink] signInWithOtp failed', {
      email,
      redirectTo,
      status: error.status,
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
    })
    return new Response(error.message, { status: 400 })
  }

  await serviceClient.from('otp_request_log').insert({ email, ip })

  return new Response(
    JSON.stringify({ message: 'Magic link sent! Check your email.' }),
    { status: 200 },
  )
}
