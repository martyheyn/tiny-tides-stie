import type { APIRoute } from 'astro'
import type Stripe from 'stripe'
import { stripe } from '../../lib/Stripe'
import { createServiceRoleClient } from '../../lib/SupabaseServer'
import { sendPurchaseConfirmationEmail } from '../../utils/sendEmail'

const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET

export const POST: APIRoute = async (context) => {
  const body = await context.request.text()
  const sig = context.request.headers.get('stripe-signature')!
  let event: Stripe.Event
  const supabase = createServiceRoleClient()

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
        // Unique violation on (user_id, course_id) means this event was
        // already processed by an earlier delivery -- ack it as successful
        // instead of 500ing, which would just make Stripe retry forever.
        if (error.code === '23505') {
          console.log(
            `Purchase already recorded for user ${userId}, course ${courseId} -- skipping duplicate webhook`,
          )
          return new Response(JSON.stringify({ received: true }), { status: 200 })
        }
        return new Response('DB insert failed', { status: 500 })
      }
    } catch (dbError) {
      console.error('DB insert failed', dbError)
      return new Response('DB insert failed', { status: 500 })
    }

    console.log(`✅ Purchase recorded for user ${userId}, course ${courseId}`)

    // Receipt email is best-effort — the purchase is already recorded, so a
    // mail failure here shouldn't fail the webhook and trigger a Stripe retry.
    const buyerEmail = session.customer_details?.email
    if (buyerEmail && metadata.course_title && metadata.start_path) {
      try {
        const startUrl = new URL(
          metadata.start_path,
          context.site,
        ).toString()
        await sendPurchaseConfirmationEmail(
          buyerEmail,
          metadata.course_title,
          startUrl,
        )
      } catch (emailError) {
        console.error('Failed to send purchase confirmation email', emailError)
      }
    } else {
      console.warn('Skipping purchase confirmation email — missing buyer email or metadata', session.id)
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
