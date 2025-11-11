import type { APIRoute } from 'astro'
import { createBEClient } from '../../lib/SupabaseServer'

export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {
  const supabase = createBEClient({ request, cookies })
  const authCode = url.searchParams.get('code')
  const next = url.searchParams.get('next') || '/'

  if (!authCode) {
    return new Response('No code provided', { status: 400 })
  }

  const { error } = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) {
    console.error('Auth error:', error.message)
    return redirect('/')
  }

  return redirect(`/${next}`)
}
