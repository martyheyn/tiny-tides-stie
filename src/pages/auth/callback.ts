import type { APIRoute } from 'astro'
import { createBEClient } from '../../lib/SupabaseServer'

// `next` is attacker-visible (it's a query param on a URL that gets emailed
// and clicked), so reject anything that would turn `/${next}` into an
// off-site redirect: a leading `/` (-> protocol-relative `//host`) or a URL
// scheme (`javascript:`, `http:`, etc).
function safeNextPath(raw: string | null): string {
  const next = raw ?? ''

  if (!next || next.startsWith('/') || next.startsWith('\\') || /^[a-z][a-z0-9+.-]*:/i.test(next)) {
    return '/'
  }

  return `/${next}`
}

export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {
  const supabase = createBEClient({ request, cookies })
  const authCode = url.searchParams.get('code')
  const next = safeNextPath(url.searchParams.get('next'))

  if (!authCode) {
    return new Response('No code provided', { status: 400 })
  }

  const { error } = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) {
    console.error('Auth error:', error.message)
    return redirect('/')
  }

  return redirect(next)
}
