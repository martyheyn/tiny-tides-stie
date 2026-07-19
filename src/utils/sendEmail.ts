import nodemailer from 'nodemailer'

function createTransporter() {
  const SMTP_USER = import.meta.env.SMTP_USER
  const SMTP_PASS = import.meta.env.SMTP_PASS

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP credentials are not set in the environment variables.',
    )
  }

  return nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export async function sendEmail(
  name: string,
  body: string,
  ooo: boolean,
  email: string,
) {
  const transporter = createTransporter()
  const SMTP_USER = import.meta.env.SMTP_USER

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

export async function sendPurchaseConfirmationEmail(
  email: string,
  courseTitle: string,
  startUrl: string,
) {
  const transporter = createTransporter()

  const mailOptions = {
    from: `Tiny Tides Therapy`,
    to: email,
    subject: `You're enrolled: ${courseTitle}`,
    text: `Thanks for your purchase!\n\nYou now have full access to "${courseTitle}".\n\nStart here: ${startUrl}\n\nQuestions? Just reply to this email.`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error)
    throw error
  }
}
