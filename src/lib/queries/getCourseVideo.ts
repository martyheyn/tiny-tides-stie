import { createBEClient } from '../SupabaseServer'
import type { Chapter } from '../../utils/tpyes'

export async function getCoursePageData(
  request: Request,
  cookies: any,
  courseSlug: string | undefined,
  chapterSlug: string | undefined,
  videoSlug: string | undefined,
  userId: string | undefined,
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
    .returns<Chapter[]>()

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

  const alreadyPurchased = !!purchaseRes

  return { course, chapters, currChapter, video, alreadyPurchased }
}
