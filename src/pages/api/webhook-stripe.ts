import type { APIRoute } from 'astro'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
})

const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET

export const POST: APIRoute = async (context) => {
  const body = await context.request.text()
  const sig = context.request.headers.get('stripe-signature')!
  let event: Stripe.Event
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  )

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed.', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // ✅ Handle only successful checkouts
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata || {}

    const userId = metadata.user_id
    const courseId = metadata.course_id

    if (!userId || !courseId) {
      console.warn('Missing metadata in session', session.id)
      return new Response('Missing metadata', { status: 400 })
    }

    try {
      const { error } = await supabase.from('purchases').insert({
        user_id: userId,
        course_id: courseId,
        created_at: new Date(),
      })

      if (error) {
        return new Response('DB insert failed', { status: 500 })
      }

      // set notification
    } catch (dbError) {
      console.error('DB insert failed', dbError)
      return new Response('DB insert failed', { status: 500 })
    }

    console.log(`✅ Purchase recorded for user ${userId}, course ${courseId}`)
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
