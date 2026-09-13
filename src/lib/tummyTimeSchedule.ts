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
