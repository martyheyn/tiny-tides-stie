import nodemailer from 'nodemailer'

// Visible sender/recipient for all outbound mail. SMTP still authenticates as
// whichever real mailbox holds the app password (see SMTP_USER below) — this
// is a Workspace group that account is allowed to post as, not a login of
// its own, so it can't hold credentials directly.
const ADMIN_EMAIL = 'admin@tinytidestherapy.com'
const MAIL_FROM = `Tiny Tides Therapy <${ADMIN_EMAIL}>`

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

  // Email options
  const mailOptions = {
    from: MAIL_FROM,
    to: !ooo ? ADMIN_EMAIL : email,
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

export async function sendCrmFailureNotification(details: string) {
  const transporter = createTransporter()

  const mailOptions = {
    from: MAIL_FROM,
    to: ADMIN_EMAIL,
    subject: 'CRM write failed for an inquiry',
    text: details,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending CRM failure notification email:', error)
    throw error
  }
}

type EmailAttachment = {
  filename: string
  path: string
}

export async function sendTummyTimeReminder(
  email: string,
  childName: string,
  dateLabel: string,
  location: string,
  locationDetails?: string,
  attachments?: EmailAttachment[],
) {
  const transporter = createTransporter()

  const mailOptions = {
    from: MAIL_FROM,
    to: email,
    subject: `Reminder: Tiny Tides Tummy Time Tomorrow (${dateLabel})`,
    text: `Hi there!\n\nJust a friendly reminder that ${childName ? `${childName}'s` : 'your'} Tummy Time session is tomorrow, ${dateLabel}${location ? ` at ${location}` : ''}.${locationDetails ? `\n\n${locationDetails}` : ''}\n\nWe can't wait to see you!\n\n- Tiny Tides Therapy`,
    ...(attachments?.length ? { attachments } : {}),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending Tummy Time reminder email:', error)
    throw error
  }
}

export async function sendTummyTimeReminderFailureNotification(
  details: string,
) {
  const transporter = createTransporter()

  const mailOptions = {
    from: MAIL_FROM,
    to: ADMIN_EMAIL,
    subject: 'Tummy Time reminder cron encountered errors',
    text: details,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error(
      'Error sending Tummy Time reminder failure notification email:',
      error,
    )
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
    from: MAIL_FROM,
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
