import type { APIRoute } from 'astro'
import { createBEClient } from '../../../lib/SupabaseServer'

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url)
  const supabase = createBEClient({ request, cookies })

  let redirectTo = `${url.origin}/auth/callback`

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

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    return new Response(error.message, { status: 400 })
  }

  // Redirect user to provider login page
  return redirect(data.url)
}
