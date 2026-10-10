import type { APIRoute } from 'astro'
import type Stripe from 'stripe'
import { stripe } from '../../lib/Stripe'
import { fulfillCheckoutSession, type FulfilledCheckout } from '../../lib/fulfillCheckout'
import { sendPurchaseConfirmationEmail } from '../../utils/sendEmail'

const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET

export const POST: APIRoute = async (context) => {
  const body = await context.request.text()
  const sig = context.request.headers.get('stripe-signature')!
  let event: Stripe.Event

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

    // Handles both signed-in checkouts (metadata.user_id) and guest checkouts
    // (account found/created from the buyer's email). Idempotent, so Stripe
    // retries and the confirmation page racing us are both fine.
    let fulfilled: FulfilledCheckout
    try {
      fulfilled = await fulfillCheckoutSession(session)
    } catch (fulfillError: any) {
      console.error('Checkout fulfillment failed', session.id, fulfillError.message)
      return new Response('Fulfillment failed', { status: 500 })
    }

    console.log(`✅ Purchase recorded for user ${fulfilled.userId}, course ${metadata.course_id}`)

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
