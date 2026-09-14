import type { APIRoute } from 'astro'
import {
  findTummyTimeRemindersDue,
  markTummyTimeReminderSent,
} from '../../../lib/airtable'
import {
  availableDates,
  locationDetails as LOCATION_DETAILS,
  locationAttachments as LOCATION_ATTACHMENTS,
} from '../../../lib/tummyTimeSchedule'
import {
  sendTummyTimeReminder,
  sendTummyTimeReminderFailureNotification,
} from '../../../utils/sendEmail'

// Which physical location hosts each Tummy Time date, derived from the same
// schedule the sign-up form uses. Looked up here (rather than read off the
// Airtable record) because a record's `Location` field is the union of every
// location a family signed up for across all their dates, not the one
// specific to the date being reminded about — using it directly would show
// the wrong directions to a family attending multiple locations.
const LOCATION_BY_DATE: Record<string, string> = Object.fromEntries(
  availableDates.map((d) => [d.value, d.location]),
)

// Computes MM/DD/YYYY for "tomorrow" in the practice's local timezone, since
// this cron runs on Vercel's UTC clock but the event dates stored in Airtable
// are local calendar dates. Runs at 5pm ET, a night-before reminder ahead of
// the next day's 9am session.
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
  console.log(`[tummy-time-reminders] Running for date: ${dateStr}`)

  const scheduledLocation = LOCATION_BY_DATE[dateStr]
  if (!scheduledLocation) {
    console.warn(
      `No scheduled location configured for ${dateStr} — add it to LOCATION_BY_DATE.`,
    )
  }
  const locationDetails = scheduledLocation
    ? LOCATION_DETAILS[scheduledLocation]
    : undefined
  const locationAttachments = scheduledLocation
    ? LOCATION_ATTACHMENTS[scheduledLocation]
    : undefined

  const dueRecords = await findTummyTimeRemindersDue(dateStr)
  console.log(
    `[tummy-time-reminders] ${dueRecords.length} record(s) due for ${dateStr}:`,
    dueRecords.map((r) => ({
      id: r.id,
      email: r.fields['Email Address'],
      dates: r.fields['Tummy Time Dates'],
      reminderSentDates: r.fields['Reminder Sent Dates'],
    })),
  )

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
        scheduledLocation ?? (record.fields.Location ?? []).join(', '),
        locationDetails,
        locationAttachments,
      )
      console.log(`[tummy-time-reminders] Sent reminder to ${email} (record ${record.id})`)

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
