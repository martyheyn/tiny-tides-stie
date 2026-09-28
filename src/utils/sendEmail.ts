import nodemailer from 'nodemailer'

// Visible sender/recipient for all outbound mail. SMTP still authenticates as
// whichever real mailbox holds the app password (see SMTP_USER below) — this
// is a Workspace group that account is allowed to post as, not a login of
// its own, so it can't hold credentials directly.
const ADMIN_EMAIL = 'admin@tinytidestherapy.com'
const MAIL_FROM = `Tiny Tides Therapy <${ADMIN_EMAIL}>`

const SITE_URL = 'https://www.tinytidestherapy.com'
// Must be a PNG at an absolute URL — Gmail/Outlook strip SVGs and can't
// resolve relative paths.
const EMAIL_LOGO_URL = `${SITE_URL}/email-logo.png`

// Brand colors from src/styles/global.css (text color with its alpha
// flattened, since some mail clients ignore 8-digit hex).
const COLOR_NAVY = '#173f69'
const COLOR_TEAL = '#9ddcdc'
const COLOR_MIST = '#f3ffff'

const TEXT_SIGNATURE = `Tiny Tides Therapy\nPediatric Occupational Therapy, Lactation Counseling, Feeding Therapy\n${SITE_URL}`

// Customer-supplied values (e.g. childName) are interpolated into HTML, so
// they must be escaped to keep users from injecting markup into mail sent
// from our domain.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Converts plain text (like the location directions) into email-safe HTML:
// escapes it, turns URLs into links, and preserves line breaks.
function textToHtml(text: string) {
  return escapeHtml(text)
    .replace(
      /https?:\/\/[^\s<]+/g,
      (url) => `<a href="${url}" style="color: ${COLOR_NAVY};">${url}</a>`,
    )
    .replace(/\n/g, '<br>')
}

function paragraph(html: string) {
  return `<p style="margin: 0 0 16px;">${html}</p>`
}

// Callout box for secondary details (directions, links) so they read as
// separate from the main message.
function detailsBox(html: string) {
  return `<div style="margin: 8px 0 24px; padding: 16px; background-color: ${COLOR_MIST}; border-left: 4px solid ${COLOR_TEAL}; font-size: 14px;">${html}</div>`
}

function button(label: string, href: string) {
  return `<p style="margin: 8px 0 24px;"><a href="${escapeHtml(href)}" style="display: inline-block; padding: 12px 24px; background-color: ${COLOR_NAVY}; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">${escapeHtml(label)}</a></p>`
}

// Wraps a body in the branded shell: teal accent bar, content card, and the
// signature. Table layout + inline styles because Gmail strips <style> blocks
// and most modern CSS. `bodyHtml` must already be escaped.
function renderEmail(bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin: 0; padding: 0; background-color: ${COLOR_MIST};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLOR_MIST};">
      <tr>
        <td align="center" style="padding: 24px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="height: 6px; background-color: ${COLOR_TEAL}; font-size: 0; line-height: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 32px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: ${COLOR_NAVY};">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 32px; font-family: Arial, Helvetica, sans-serif; color: ${COLOR_NAVY};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid ${COLOR_TEAL};">
                  <tr>
                    <td style="padding-top: 20px;">
                      <img src="${EMAIL_LOGO_URL}" alt="Tiny Tides Therapy" width="160" style="display: block; width: 160px; height: auto; border: 0;">
                      <p style="margin: 12px 0 2px; font-size: 15px; font-weight: bold;">Tiny Tides Therapy</p>
                      <p style="margin: 0 0 2px; font-size: 13px;">Pediatric Occupational Therapy, Lactation Counseling, Feeding Therapy</p>
                      <p style="margin: 0; font-size: 13px;"><a href="${SITE_URL}" style="color: ${COLOR_NAVY};">www.tinytidestherapy.com</a></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

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

  // Timestamp appended to the subject so multiple inquiries don't get bundled
  // into one Gmail thread just for sharing a name.
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  // Email options
  const mailOptions = {
    from: MAIL_FROM,
    to: !ooo ? ADMIN_EMAIL : email,
    subject: !ooo ? `New Inquiry: ${name} — ${timestamp}` : 'Out of Office',
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

export async function sendTummyTimeConfirmation(
  email: string,
  childName: string,
  dateLabel: string,
  location: string,
  locationDetails?: string,
  attachments?: EmailAttachment[],
) {
  const transporter = createTransporter()

  const who = childName || 'your little one'
  const where = location ? ` at ${location}` : ''

  const html = renderEmail(
    paragraph('Hi there!') +
      paragraph(
        `Thanks for signing <strong>${escapeHtml(who)}</strong> up for Tummy Time on <strong>${escapeHtml(dateLabel)}</strong>${escapeHtml(where)}! We are excited to see you!`,
      ) +
      (locationDetails ? detailsBox(textToHtml(locationDetails)) : '') +
      paragraph('See you soon!'),
  )

  const mailOptions = {
    from: MAIL_FROM,
    to: email,
    subject: 'Tummy Time Confirmation!',
    text: `Hi there!\n\nThanks for signing ${who} up for Tummy Time on ${dateLabel}${where}! We are excited to see you!${locationDetails ? `\n\n________________________________________\n${locationDetails}` : ''}\n\nSee you soon!\n\n--\n${TEXT_SIGNATURE}`,
    html,
    ...(attachments?.length ? { attachments } : {}),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending Tummy Time confirmation email:', error)
    throw error
  }
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

  const whose = childName ? `${childName}'s` : 'your'
  const where = location ? ` at ${location}` : ''

  const html = renderEmail(
    paragraph('Hi there!') +
      paragraph(
        `Just a friendly reminder that ${escapeHtml(whose)} Tummy Time session is tomorrow, <strong>${escapeHtml(dateLabel)}</strong>${escapeHtml(where)}.`,
      ) +
      (locationDetails ? detailsBox(textToHtml(locationDetails)) : '') +
      paragraph("We can't wait to see you!"),
  )

  const mailOptions = {
    from: MAIL_FROM,
    to: email,
    subject: `Reminder: Tiny Tides Tummy Time Tomorrow (${dateLabel})${childName ? ` - ${childName}` : ''}`,
    text: `Hi there!\n\nJust a friendly reminder that ${whose} Tummy Time session is tomorrow, ${dateLabel}${where}.${locationDetails ? `\n\n________________________________________\n${locationDetails}` : ''}\n\nWe can't wait to see you!\n\n--\n${TEXT_SIGNATURE}`,
    html,
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

  const html = renderEmail(
    paragraph('Thanks for your purchase!') +
      paragraph(
        `You now have full access to <strong>${escapeHtml(courseTitle)}</strong>.`,
      ) +
      button('Start the course', startUrl) +
      paragraph('Questions? Just reply to this email.'),
  )

  const mailOptions = {
    from: MAIL_FROM,
    to: email,
    subject: `You're enrolled: ${courseTitle}`,
    text: `Thanks for your purchase!\n\nYou now have full access to "${courseTitle}".\n\nStart here: ${startUrl}\n\nQuestions? Just reply to this email.\n\n--\n${TEXT_SIGNATURE}`,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error)
    throw error
  }
}
