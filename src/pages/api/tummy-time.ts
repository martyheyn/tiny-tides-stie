import type { APIRoute } from 'astro'
import { validEmail } from '../../utils/validInputs'

const airtableApiKey = import.meta.env.AIRTABLE_API_KEY
const baseId = import.meta.env.AIRTABLE_BASE_ID
const tableId = import.meta.env.AIRTABLE_TUMMY_TIME_TABLE_ID

const hearAboutUsMap = (hearAboutUs: string) => {
  switch (hearAboutUs) {
    case 'google':
      return 'Google'
    case 'facebook':
      return 'Facebook'
    case 'instagram':
      return 'Instagram'
    case 'friend-family':
      return 'Friends or Family'
    case 'tummy-time':
      return 'Tummy Time'
    case 'other':
      return 'Other'
    default:
      return 'Other'
  }
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const parentName = data.get('parentName')
  const phone = data.get('phone')
  const childName = data.get('childName')
  const birthDate = data.get('birthDate')
  const email = data.get('email')
  const hearAboutUs = data.get('hearAboutUs')
  const hearAboutUsOther = data.get('hearAboutUsOther')
  const location = data.get('location')
  const datesAttendingRaw = data.get('datesAttending')
  const datesAttending = datesAttendingRaw
    ? datesAttendingRaw.toString().split('(').filter(Boolean)
    : []
  const aoc = data.get('areaOfConcern')
  const consentToPic = data.get('consentToPic') === 'on'

  if (typeof email !== 'string' || !validEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Email is not valid. ' }),
      {
        status: 500,
      },
    )
  }

  if (!birthDate) {
    console.error('Birth date is required.')
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 },
    )
  }

  // Validate the data - you'll probably want to do more than this
  if (!parentName || !email) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 },
    )
  }
  console.log('datesAttending', datesAttending)

  try {
    // send to airtable
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
                'Parent Name': parentName,
                'Email Address': email,
                'Child First Name': childName,
                'Childs DOB': birthDate,
                'Tummy Time Dates': datesAttending,
                'Phone Number': phone,
                Address: location,
                "Area's of Concern": aoc,
                'How did you hear about Tummy Time':
                  hearAboutUsOther ?? hearAboutUsMap(hearAboutUs as string),
                'Consent to Pics': consentToPic,
              },
            },
          ],
          typecast: true,
        }),
      },
    )

    if (!airtableRes.ok) {
      const errorBody = await airtableRes.json()
      console.log('Airtable error:', airtableRes.status, errorBody)
      console.error('Airtable error:', airtableRes.status, errorBody)
      return new Response(
        JSON.stringify({ success: false, error: errorBody }),
        { status: 500 },
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 },
    )
  } catch (error) {
    console.log('error submitting to airtable', error)
    return new Response(JSON.stringify({ success: false, errors: error }), {
      status: 500,
    })
  }
}
