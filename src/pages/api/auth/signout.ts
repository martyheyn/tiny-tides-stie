import type { APIRoute } from 'astro'
import { createBEClient } from '../../../lib/SupabaseServer'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  console.log('in signout')
  const supabase = createBEClient({ request, cookies })
  await supabase.auth.signOut()

  // Clear locally (belt & suspenders)
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })

  return redirect('/')
}
