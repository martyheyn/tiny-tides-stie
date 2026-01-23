import type { APIRoute } from 'astro'
import { GOOGLE_MAPS_PLACES_API_KEY } from 'astro:env/server'

export const GET: APIRoute = async ({ url }) => {
  const input = url.searchParams.get('input')

  if (!input || input.length < 3) {
    return new Response(JSON.stringify({ suggestions: [] }), { status: 200 })
  }

  const response = await fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_PLACES_API_KEY,
        'X-Goog-FieldMask':
          'suggestions.placePrediction.text.text,suggestions.placePrediction.placeId',
      },
      body: JSON.stringify({
        input,

        // 🔑 REQUIRED for numeric queries
        regionCode: 'US',
        languageCode: 'en',

        // Bias toward Maryland / Baltimore area
        locationBias: {
          circle: {
            center: {
              latitude: 39.2904,
              longitude: -76.6122,
            },
            radius: 50000, // meters
          },
        },

        includedPrimaryTypes: ['street_address', 'premise', 'route'],
      }),
    },
  )
  const data = await response.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
