import type { APIRoute } from 'astro'
import { createBEClient } from '../../lib/SupabaseServer'
import { getSignedUrl } from '@aws-sdk/cloudfront-signer'

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url)
  const videoId = url.searchParams.get('videoId')

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'Missing videoId' }), {
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

  // 2. Lookup the video + make sure user owns it
  const { data: video, error } = await supabase
    .from('video')
    .select('id, host_url, course_id')
    .eq('id', videoId)
    .single()

  if (!video) {
    return new Response(JSON.stringify({ error: 'Video not found' }), {
      status: 400,
    })
  }

  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', video.course_id)
    .maybeSingle()

  if (!purchase) {
    return new Response(JSON.stringify({ error: 'Access denied' }), {
      status: 403,
    })
  }

  // 3. Create the CloudFront signed URL
  const expires = new Date(Date.now() + 1000 * 60 * 5) // 5 minutes

  if (
    import.meta.env.CF_COURSE_VID_DOMAIN &&
    import.meta.env.CF_PUBLIC_KEY_ID &&
    import.meta.env.CF_PRIVATE_KEY
  ) {
    const signedUrl = getSignedUrl({
      url: `https://${import.meta.env.CF_COURSE_VID_DOMAIN}/${video.host_url}`,
      keyPairId: import.meta.env.CF_PUBLIC_KEY_ID!,
      privateKey: import.meta.env.CF_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      dateLessThan: expires,
    })

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    return new Response(JSON.stringify({ error: 'Video Cannot Load' }), {
      status: 500,
    })
  }
}
