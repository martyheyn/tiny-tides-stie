import type { APIRoute } from 'astro'
import type { MarkdownInstance } from 'astro'
import { stripe } from '../../lib/Stripe'
import { createBEClient } from '../../lib/SupabaseServer'

const isTestMode = import.meta.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')

export const POST: APIRoute = async (context) => {
  const supabase = createBEClient({
    request: context.request,
    cookies: context.cookies,
  })
  try {
    const { baseUrl, slug } = await context.request.json()
    const { data: user } = await supabase.auth.getUser()

    if (!user.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { data: course, error } = await supabase
      .from('course')
      .select('id, price_id_test, price_id_live')
      .eq('slug', slug.trim())
      .single()

    if (error) {
      return new Response('Error getting course', { status: 500 })
    }

    if (!course) {
      return new Response('Error getting course', { status: 500 })
    }

    const priceId = isTestMode ? course.price_id_test : course.price_id_live

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'This course is not yet available for purchase.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const { data: chapter, error: chapterErr } = await supabase
      .from('section')
      .select('id, slug')
      .eq('course_id', course.id)
      .eq('section_order', 1)
      .single()

    if (chapterErr) {
      return new Response('Error getting course', { status: 500 })
    }

    const { data: video, error: videoErr } = await supabase
      .from('video')
      .select('id, slug')
      .eq('section_id', chapter.id)
      .eq('video_order', 1)
      .single()

    if (videoErr) {
      return new Response('Error getting course', { status: 500 })
    }

    // Course title lives in markdown frontmatter, not the DB — stash it in
    // Stripe metadata so the confirmation page and receipt email don't need
    // to re-derive it later.
    const markdownFiles = import.meta.glob<MarkdownInstance<any>>(
      '../courses-md/*md',
      { eager: true },
    )
    const courseTitle =
      Object.values(markdownFiles).find(
        (file) => file.frontmatter.slug === slug.trim(),
      )?.frontmatter.title ?? slug

    const startPath = `/courses/${slug}/${chapter.slug}/${video.slug}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.user?.id,
        course_id: course?.id,
        course_slug: slug,
        course_title: courseTitle,
        start_path: startPath,
      },
      success_url: `http://${baseUrl}/courses/${slug}/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${baseUrl}/courses/${slug}`,
      allow_promotion_codes: true,
    })

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
