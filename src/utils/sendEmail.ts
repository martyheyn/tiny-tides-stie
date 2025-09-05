import nodemailer from 'nodemailer'

export async function sendEmail(
  name: string,
  body: string,
  ooo: boolean,
  email: string,
) {
  const SMTP_USER = import.meta.env.SMTP_USER
  const SMTP_PASS = import.meta.env.SMTP_PASS

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP credentials are not set in the environment variables.',
    )
  }

  // Create a transporter object with secure settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  // Email options
  const mailOptions = {
    from: `Tiny Tides Therapy`,
    to: `${!ooo ? SMTP_USER : email}`,
    subject: `${!ooo ? `New Inquiry: ${name}` : 'Out of Office'}`,
    text: body,
  }

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
