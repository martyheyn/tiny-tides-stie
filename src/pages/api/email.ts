import type { APIRoute } from 'astro'
import { validEmail } from '../../utils/validInputs'
import { sendEmail } from '../../utils/sendEmail'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('name')
  const phone = data.get('phone')
  const email = data.get('email')
  const message = data.get('message')

  if (typeof email !== 'string' || !validEmail(email)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Email is not valid. ' }),
      {
        status: 500,
      },
    )
  }

  // compose body
  const body = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
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
    await sendEmail(name as string, body)
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
