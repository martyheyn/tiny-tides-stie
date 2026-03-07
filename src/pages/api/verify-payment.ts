import type { APIRoute } from 'astro'
import Stripe from 'stripe'

const airtableApiKey = import.meta.env.AIRTABLE_API_KEY
const baseId = import.meta.env.AIRTABLE_SENSORY_GROUP_APP_ID
const tableId = import.meta.env.AIRTABLE_SENSORY_GROUP_TABLE_ID

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY)

export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id')

  if (!sessionId) {
    return new Response(
      JSON.stringify({ paid: false, error: 'No session ID provided' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      return new Response(JSON.stringify({ paid: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ paid: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ paid: false, error: 'Invalid session ID' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
