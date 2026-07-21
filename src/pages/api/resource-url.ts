import type { APIRoute } from 'astro'
import { createBEClient, createServiceRoleClient } from '../../lib/SupabaseServer'

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url)
  const resourceId = url.searchParams.get('resourceId')

  if (!resourceId) {
    return new Response(JSON.stringify({ error: 'Missing resourceId' }), {
      status: 400,
    })
  }

  // 1. Get the user session
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

  // 2. Lookup the resource + make sure user owns the course
  const { data: resource } = await supabase
    .from('resource')
    .select('id, name, storage_path, file_type, course_id')
    .eq('id', resourceId)
    .single()

  if (!resource) {
    return new Response(JSON.stringify({ error: 'Resource not found' }), {
      status: 400,
    })
  }

  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', resource.course_id)
    .maybeSingle()

  if (!purchase) {
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
    })
  }

  // 3. Mint a short-lived signed URL to the private storage object. `name` is
  // a free-typed display label and won't necessarily carry a file extension,
  // so fall back to appending `file_type` when it doesn't already have one.
  const downloadName = /\.[a-zA-Z0-9]+$/.test(resource.name)
    ? resource.name
    : resource.file_type
      ? `${resource.name}.${resource.file_type}`
      : resource.name

  const serviceRoleClient = createServiceRoleClient()
  const { data: signedUrlData, error } = await serviceRoleClient.storage
    .from('course-resources')
    .createSignedUrl(resource.storage_path, 60, { download: downloadName })

  if (error || !signedUrlData) {
    return new Response(JSON.stringify({ error: 'Resource Cannot Load' }), {
      status: 500,
    })
  }

  return new Response(
    JSON.stringify({ url: signedUrlData.signedUrl, name: downloadName }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
