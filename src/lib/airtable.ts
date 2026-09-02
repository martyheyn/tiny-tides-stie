import Fuse from 'fuse.js'

const airtableApiKey = import.meta.env.AIRTABLE_API_KEY
const crmBaseId = import.meta.env.AIRTABLE_CRM_BASE_ID
const inquiriesTableId = import.meta.env.AIRTABLE_CRM_INQUIRIES_TABLE_ID
const referralsTableId = import.meta.env.AIRTABLE_CRM_REFERRALS_TABLE_ID

// score <= HIGH: auto-link. score <= LOW: flag for manual review. above LOW: no match.
const HIGH_CONFIDENCE_THRESHOLD = 0.3
const LOW_CONFIDENCE_THRESHOLD = 0.6

type AirtableRecord<TFields> = {
  id: string
  fields: TFields
}

async function airtableRequest<TFields>(
  baseId: string,
  tableId: string,
  path: string,
  init?: RequestInit,
): Promise<TFields> {
  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    },
  )

  if (!res.ok) {
    const errorBody = await res.json().catch(() => undefined)
    throw new Error(
      `Airtable request failed: ${res.status} ${JSON.stringify(errorBody)}`,
    )
  }

  return res.json()
}

type ReferralFields = {
  Name?: string
  Email?: string
}

async function findReferrals(): Promise<AirtableRecord<ReferralFields>[]> {
  const records: AirtableRecord<ReferralFields>[] = []
  let offset: string | undefined

  do {
    const params = new URLSearchParams()
    params.append('fields[]', 'Name')
    params.append('fields[]', 'Email')
    if (offset) params.set('offset', offset)

    const page: { records: AirtableRecord<ReferralFields>[]; offset?: string } =
      await airtableRequest(crmBaseId, referralsTableId, `?${params}`)

    records.push(...page.records)
    offset = page.offset
  } while (offset)

  return records
}

export type ReferralMatch =
  | { tier: 'high'; recordId: string; matchedName: string; score: number }
  | { tier: 'low'; recordId: string; matchedName: string; score: number }
  | { tier: 'none' }

export async function matchReferral(
  freeText: string | null | undefined,
): Promise<ReferralMatch> {
  if (!freeText || !freeText.trim()) {
    return { tier: 'none' }
  }

  const candidates = await findReferrals()
  if (candidates.length === 0) {
    return { tier: 'none' }
  }

  const fuse = new Fuse(candidates, {
    keys: ['fields.Name', 'fields.Email'],
    includeScore: true,
  })

  const [best] = fuse.search(freeText)
  if (!best || best.score === undefined || best.score > LOW_CONFIDENCE_THRESHOLD) {
    return { tier: 'none' }
  }

  const tier = best.score <= HIGH_CONFIDENCE_THRESHOLD ? 'high' : 'low'
  return {
    tier,
    recordId: best.item.id,
    matchedName: best.item.fields.Name ?? best.item.fields.Email ?? '',
    score: best.score,
  }
}

type InquiryFields = {
  'Patient Name'?: string
  'Patient Phone'?: string
  'Patient Email'?: string
  Address?: string
  Medicaid?: string
  'How Did You Hear About Us'?: string
  Referral?: string[]
  'Needs Review'?: boolean
  'Referral Notes'?: string
}

export async function createInquiry(
  fields: InquiryFields,
): Promise<AirtableRecord<InquiryFields>> {
  const body = {
    records: [{ fields }],
    typecast: true,
  }

  const result: { records: AirtableRecord<InquiryFields>[] } =
    await airtableRequest(crmBaseId, inquiriesTableId, '', {
      method: 'POST',
      body: JSON.stringify(body),
    })

  return result.records[0]
}
