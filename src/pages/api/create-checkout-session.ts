import type { APIRoute } from 'astro'
import Stripe from 'stripe'
import { createBEClient } from '../../lib/SupabaseServer'

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
})

export const POST: APIRoute = async (context) => {
  const supabase = createBEClient({
    request: context.request,
    cookies: context.cookies,
  })
  try {
    const { priceId, returnUrl, slug } = await context.request.json()
    const { data: user } = await supabase.auth.getUser()
    console.log('user', user)

    if (!user.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { data: course, error } = await supabase
      .from('course')
      .select('id')
      .eq('slug', slug)
      .single()

    if (error) {
      return new Response('Error getting course', { status: 500 })
    }
    console.log('course', course)

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
      },
      success_url: returnUrl,
      cancel_url: returnUrl,
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
