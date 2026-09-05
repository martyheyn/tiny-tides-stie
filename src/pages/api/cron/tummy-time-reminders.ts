import type { APIRoute } from 'astro'
import {
  findTummyTimeRemindersDue,
  markTummyTimeReminderSent,
} from '../../../lib/airtable'
import {
  sendTummyTimeReminder,
  sendTummyTimeReminderFailureNotification,
} from '../../../utils/sendEmail'

// Computes MM/DD/YYYY for "tomorrow" in the practice's local timezone, since
// this cron runs on Vercel's UTC clock but the event dates stored in Airtable
// are local calendar dates.
function tomorrowDateString(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))

  const today = new Date(Number(map.year), Number(map.month) - 1, Number(map.day))
  today.setDate(today.getDate() + 1)

  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${today.getFullYear()}`
}

export const GET: APIRoute = async ({ request }) => {
  const cronSecret = import.meta.env.CRON_SECRET
  const authHeader = request.headers.get('authorization')

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const dateStr = tomorrowDateString()
  const dueRecords = await findTummyTimeRemindersDue(dateStr)

  let sent = 0
  const failures: string[] = []

  for (const record of dueRecords) {
    try {
      const email = record.fields['Email Address']
      if (!email) {
        throw new Error('Record has no Email Address')
      }

      await sendTummyTimeReminder(
        email,
        record.fields['Child First Name'] ?? '',
        dateStr,
        (record.fields.Location ?? []).join(', '),
      )

      const existing = record.fields['Reminder Sent Dates']
      const updated = existing ? `${existing}, ${dateStr}` : dateStr
      await markTummyTimeReminderSent(record.id, updated)

      sent += 1
    } catch (error) {
      console.error(`Tummy Time reminder failed for record ${record.id}:`, error)
      failures.push(
        `${record.id} (${record.fields['Email Address'] ?? 'no email'}): ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }

  if (failures.length > 0) {
    sendTummyTimeReminderFailureNotification(
      `${failures.length} Tummy Time reminder(s) failed for ${dateStr}:\n\n${failures.join('\n')}`,
    ).catch((notifyError) => {
      console.error(
        'Failed to send Tummy Time reminder failure notification:',
        notifyError,
      )
    })
  }

  return new Response(
    JSON.stringify({
      date: dateStr,
      due: dueRecords.length,
      sent,
      failed: failures.length,
    }),
    { status: 200 },
  )
}
