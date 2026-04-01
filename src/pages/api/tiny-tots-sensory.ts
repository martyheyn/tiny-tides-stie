import type { APIRoute } from 'astro'

const airtableApiKey = import.meta.env.AIRTABLE_API_KEY
const baseId = import.meta.env.AIRTABLE_SENSORY_GROUP_APP_ID
const tableId = import.meta.env.AIRTABLE_SENSORY_GROUP_TABLE_ID

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
  const data = await request.json()

  const email = data.email
  const parentName = data.parentName
  const phone = data.phone
  const childName = data.childName
  const birthDate = data.birthDate
  const hearAboutUs = data.hearAboutUs
  const hearAboutUsOther = data.hearAboutUsOther
  const location = data.location
  const observations = Array.isArray(data.observations)
    ? data.observations
    : data.observations
      ? [data.observations]
      : []
  const message = data.message
  const allergies = data.allergies
  const consentToPic = data.consentToPic === 'yes'
  const consentToCaregiver =
    data.consentToCaregiver === 'on' || data.consentToCaregiver === true

  if (!birthDate || !parentName) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
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
                'Parent Name': parentName,
                'Child First Name': childName,
                'Childs DOB': birthDate,
                'Date of Group': '04/26/2026',
                'Phone Number': phone,
                Address: location,
                'Areas of Concern': observations,
                Message: message,
                'How did you hear about Tummy Time':
                  hearAboutUsOther ?? hearAboutUsMap(hearAboutUs as string),
                Allergies: allergies,
                'Consent to Pics': consentToPic,
                'Caregiver Consent': consentToCaregiver,
              },
            },
          ],
        }),
      },
    )

    if (!airtableRes.ok) {
      const errorBody = await airtableRes.json()
      console.error('Airtable error:', airtableRes.status, errorBody)
      return new Response(
        JSON.stringify({ success: false, error: errorBody }),
        { status: 500 },
      )
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('Error submitting to airtable:', error)
    return new Response(JSON.stringify({ success: false, errors: error }), {
      status: 500,
    })
  }
}
