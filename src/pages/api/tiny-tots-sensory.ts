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
  const data = await request.formData()
  const email = data.get('email') as string
  const parentName = data.get('parentName')
  const phone = data.get('phone')
  const childName = data.get('childName')
  const birthDate = data.get('birthDate')
  const hearAboutUs = data.get('hearAboutUs')
  const hearAboutUsOther = data.get('hearAboutUsOther')
  const location = data.get('location')
  const dateOfGroup = '03/23/2026'
  const observations = data.getAll('observations') as string[]
  const message = data.get('message')
  const consentToPic = data.get('consentToPic') === 'on'

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
  if (!parentName) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 },
    )
  }

  console.log('email', email)

  try {
    // send to airtable
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${encodeURIComponent(`{Email Address}="${email}"`)}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      },
    )
    const searchData = await searchRes.json()
    const existingRecord = searchData.records?.[0]
    console.log('existingRecord', existingRecord)

    if (!existingRecord) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No matching payment record found',
        }),
        { status: 404 },
      )
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}/${existingRecord.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Parent Name': parentName,
            'Child First Name': childName,
            'Childs DOB': birthDate,
            'Date of Group': dateOfGroup,
            'Phone Number': phone,
            Address: location,
            'Areas of Concern': observations,
            Message: message,
            'How did you hear about Tummy Time':
              hearAboutUsOther ?? hearAboutUsMap(hearAboutUs as string),
            'Consent to Pics': consentToPic,
          },
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

// import type { APIRoute } from 'astro'

// export const POST: APIRoute = async () => {
//   return new Response(JSON.stringify({ success: true, test: true }), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   })
// }
