import type { APIRoute } from 'astro'
import { createBEClient } from '../../lib/SupabaseServer'

export const POST: APIRoute = async (context) => {
  const supabase = createBEClient({
    request: context.request,
    cookies: context.cookies,
  })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
    })
  }

  const { courseId, text } = await context.request.json()

  if (!courseId || !text || !text.trim()) {
    return new Response(JSON.stringify({ error: 'Missing courseId or text' }), {
      status: 400,
    })
  }

  const { error } = await supabase.from('feedback').insert({
    course_id: courseId,
    user_id: user.id,
    text: text.trim(),
  })

  // Unique violation just means this user already gave feedback for this
  // course -- still a success from the client's point of view.
  if (error && error.code !== '23505') {
    return new Response(JSON.stringify({ error: 'Failed to save feedback' }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
