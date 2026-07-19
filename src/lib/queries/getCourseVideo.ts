import { createBEClient, createServiceRoleClient } from '../SupabaseServer'
import { stripe } from '../Stripe'
import type { Chapter } from '../../utils/tpyes'

export async function getCoursePageData(
  request: Request,
  cookies: any,
  courseSlug: string | undefined,
  chapterSlug: string | undefined,
  videoSlug: string | undefined,
  userId: string | undefined,
  checkoutSessionId?: string | null,
) {
  const supabase = createBEClient({ request, cookies })

  // 1. Get course + all chapters with embedded videos
  const { data: course, error: courseErr } = await supabase
    .from('course')
    .select('id, name, slug')
    .eq('slug', courseSlug)
    .single()

  if (courseErr || !course) return { course: null }

  const { data: chapters, error: chaptersErr } = await supabase
    .from('section_with_progress')
    .select('*')
    .eq('course_id', course.id)
    .order('section_order')
    .overrideTypes<Chapter[]>()

  if (chaptersErr) throw chaptersErr

  // 2. Derive chapter + video without more queries
  const currChapter = chapters.find((c) => c.slug === chapterSlug) || null
  const video =
    currChapter?.videos?.find((v: any) => v.slug === videoSlug) || null

  // 3. Check purchase
  const { data: purchaseRes } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', course.id)
    .maybeSingle()

  let alreadyPurchased = !!purchaseRes

  // 4. Fallback for webhook delivery lag (or a webhook that never reaches this
  // environment, e.g. local dev without `stripe listen` running): verify the
  // Checkout Session directly and record the purchase ourselves.
  if (!alreadyPurchased && checkoutSessionId && userId) {
    alreadyPurchased = await recordPurchaseFromSession(
      checkoutSessionId,
      userId,
      course.id,
    )
  }

  return { course, chapters, currChapter, video, alreadyPurchased }
}

async function recordPurchaseFromSession(
  checkoutSessionId: string,
  userId: string,
  courseId: string,
): Promise<boolean> {
  try {
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId)

    if (
      session.payment_status !== 'paid' ||
      session.metadata?.user_id !== userId ||
      session.metadata?.course_id !== courseId
    ) {
      return false
    }

    const serviceRoleClient = createServiceRoleClient()
    const { error } = await serviceRoleClient.from('purchases').insert({
      user_id: userId,
      course_id: courseId,
    })

    // A unique-violation just means the webhook beat us to it -- still purchased.
    if (error && error.code !== '23505') {
      console.error('Failed to record purchase from checkout session', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Failed to verify checkout session', err)
    return false
  }
}
