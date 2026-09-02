import type { APIRoute } from 'astro'
import { validEmail } from '../../utils/validInputs'
import { sendEmail, sendCrmFailureNotification } from '../../utils/sendEmail'
import { createInquiry } from '../../lib/airtable'

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
  const name = data.get('name')
  const phone = data.get('phone')
  const email = data.get('email')
  const birthDate = data.get('birthDate')
  const hearAboutUs = data.get('hearAboutUs')
  const hearAboutUsOther = data.get('hearAboutUsOther')
  const location = data.get('location')
  const referral = data.get('referral')
  const medicaid = data.get('medicaid')
  const message = data.get('message')

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
  const babyAge = timeDifference(birthDate.toString())
  const hearAboutUsLabel = hearAboutUsOther
    ? hearAboutUsOther.toString()
    : hearAboutUsMap(hearAboutUs as string)

  // compose body
  const body = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Patient Age: ${babyAge}
      Location: ${location}
      Medicaid: ${medicaid}
      How did you hear about us: ${hearAboutUsLabel}
      ${referral ? `Referral: ${referral}` : ''}
      Mesage: ${message}
    `

  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields',
      }),
      { status: 400 },
    )
  }

  try {
    // Do something with the data, then return a success response
    await sendEmail(name as string, body, false, email)

    // CRM write is awaited so it isn't killed mid-flight by the serverless
    // runtime, but its own errors are caught here so they can never affect
    // the response above (already sent) or the one returned below.
    // Referral matching (Referral/Needs Review/Referral Notes fields) is
    // deferred until the Referrals table is seeded — for now just log the
    // core inquiry fields, which are already verified against the live base.
    try {
      await createInquiry({
        'Patient Name': name as string,
        'Patient Phone': phone as string,
        'Patient Email': email,
        Address: location as string,
        Medicaid: medicaid as string,
        'How Did You Hear About Us': hearAboutUsLabel,
      })
    } catch (crmError) {
      console.error('CRM write failed for inquiry:', crmError)
      sendCrmFailureNotification(
        `Failed to write inquiry to Airtable CRM for ${name} (${email}).\n\nError: ${crmError instanceof Error ? crmError.message : String(crmError)}`,
      ).catch((notifyError) => {
        console.error(
          'Failed to send CRM failure notification email:',
          notifyError,
        )
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 },
    )
  } catch (error) {
    return new Response(JSON.stringify({ success: false, errors: error }), {
      status: 500,
    })
  }
}

function timeDifference(dateString: string) {
  const givenDate = new Date(dateString)
  const currentDate = new Date()

  let years = currentDate.getFullYear() - givenDate.getFullYear()
  let months = currentDate.getMonth() - givenDate.getMonth()
  let days = currentDate.getDate() - givenDate.getDate()

  if (days < 0) {
    months -= 1
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    )
    days += lastMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const parts = []
  if (years)
    parts.push(`${Math.abs(years)} ${Math.abs(years) > 1 ? 'years' : 'year'}`)
  if (months)
    parts.push(
      `${Math.abs(months)} ${Math.abs(months) > 1 ? 'months' : 'month'}`,
    )
  if (days)
    parts.push(`${Math.abs(days)} ${Math.abs(days) > 1 ? 'days' : 'day'}`)

  return parts.join(', ')
}
