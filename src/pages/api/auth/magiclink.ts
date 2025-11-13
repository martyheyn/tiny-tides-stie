import type { APIRoute } from 'astro'
import { createBEClient } from '../../../lib/SupabaseServer'

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email } = await request.json()

  const supabase = createBEClient({ request, cookies })

  if (!email) {
    return new Response('Email is required', { status: 400 })
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

  console.log('error', error)

  if (error) {
    return new Response(error.message, { status: 400 })
  }

  return new Response(
    JSON.stringify({ message: 'Magic link sent! Check your email.' }),
    { status: 200 },
  )
}
