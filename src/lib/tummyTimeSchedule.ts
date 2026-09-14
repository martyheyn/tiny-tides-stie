export type TummyTimeDate = {
  label: string
  value: string
  location: string
}

// Single source of truth for which dates are offered and which location hosts each one. 
// Consumed by both the sign-up form (to render checkboxes
// and derive the locations a family selects) and the reminder cron (to know
// which location's directions to include, independent of what a given
// Airtable record has stored).
export const availableDates: TummyTimeDate[] = [
  { label: 'September 14, 2026 (Monday) Patterson, 09:00–09:45am', value: '09/14/2026', location: 'Patterson' },
  { label: 'September 21, 2026 (Monday) Patterson, 09:00–09:45am', value: '09/21/2026', location: 'Patterson' },
]

// Parking/meeting directions, keyed by location name. Used in both the
// sign-up confirmation email and the day-of reminder email.
export const locationDetails: Record<string, string> = {
  Patterson: `Patterson Park Tummy Time directions:

The entrance to our meeting spot is across from the top of the stairs at Eastern Ave and S Port St. Look for the green sign with the "friends of Patterson Park" logo on it. The sign is along the wide path that goes around the playground with the castle structure, on the side of the park along Eastern Ave. To the left of the sign, there is a corner of the fence — go up the path next to the fence. Follow the path until you see an open gate on your right that leads to a concrete path. You'll be able to see us from there! We'll have a large beige/pattern mat on the ground.

Pin for exact location: https://maps.app.goo.gl/iS4vY8BrdaBozEN48?g_st=ic`,
}

// Email attachments (parking maps, entrance photos, etc.), keyed by location
// name. Files live under public/tummy-time/<location-slug>/ in this repo and
// are referenced by their production URL, since these are sent from
// serverless functions that can't read repo files directly at runtime.
export const locationAttachments: Record<
  string,
  { filename: string; path: string }[]
> = {
  Patterson: [
    { filename: 'patterson_park_1.png', path: 'https://www.tinytidestherapy.com/tummy-time/patterson/patterson_park_tummy_time_1.jpeg' },
    { filename: 'patterson_park_2.png', path: 'https://www.tinytidestherapy.com/tummy-time/patterson/patterson_park_tummy_time_2.jpeg' },
    { filename: 'patterson_park_3.png', path: 'https://www.tinytidestherapy.com/tummy-time/patterson/patterson_park_tummy_time_3.jpeg' },
  ],
}
