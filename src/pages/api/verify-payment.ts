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
      const email = session.customer_details?.email ?? ''

      const airtableRes = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  'Email Address': email,
                },
              },
            ],
          }),
        },
      )

      if (!airtableRes.ok) {
        console.log('Something went wrong')
        const errorBody = await airtableRes.json()
        console.log('Airtable error:', airtableRes.status, errorBody)
        console.error('Airtable error:', airtableRes.status, errorBody)
      } else {
        console.log('Something went RIGHT!!!')
      }

      return new Response(
        JSON.stringify({
          paid: true,
          email,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      )
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
