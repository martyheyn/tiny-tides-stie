import type { APIRoute } from 'astro'
import { validEmail } from '../../utils/validInputs'
import { sendEmail } from '../../utils/sendEmail'

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
  const locationOther = data.get('locationOther')
  const referral = data.get('referral')
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

  // compose body
  const body = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Patient Age: ${babyAge}
      Location: ${locationOther ? locationOther : location}
      How did you hear about us: ${hearAboutUsOther ? hearAboutUsOther : hearAboutUsMap(hearAboutUs as string)}
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

  const oooMessage = `Thanks so much for reaching out. I will be out of the office without much access to email until the Spetember 22nd. 
  
  I will get back to you as I return. Looking forward to connecting!`

  try {
    // Do something with the data, then return a success response
    await sendEmail(name as string, body, false, email)

    // send back out of office message
    await sendEmail(name as string, oooMessage, true, email)

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
