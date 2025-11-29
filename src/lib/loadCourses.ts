import { createBEClient } from './SupabaseServer'
import type { MarkdownInstance } from 'astro'

export async function loadCourses({
  request,
  cookies,
  user,
}: {
  request: Request
  cookies: any
  user: any
}) {
  const supabase = createBEClient({ request, cookies })

  // 1. Load all markdown courses
  const markdownFiles = import.meta.glob<MarkdownInstance<any>>(
    '../pages/courses-md/*md',
    { eager: true },
  )

  const coursesRaw = await Promise.all(
    Object.values(markdownFiles).map(async (file) => ({
      content: file.compiledContent(),
      frontmatter: file.frontmatter,
    })),
  )

  // 2. Load purchase + progress only if logged in
  const userLastVideo = new Map<
    string,
    { chapterSlug: string; videoSlug: string }
  >()
  const purchasedIds = new Set<string>()

  if (user) {
    const { data: purchased } = await supabase
      .from('purchases')
      .select('course_id')
      .eq('user_id', user.id)

    purchased?.forEach((p) => purchasedIds.add(p.course_id))

    const { data: progress } = await supabase
      .from('video_progress')
      .select('video_slug, course_id, section_id')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (progress) {
      for (const p of progress) {
        if (!userLastVideo.has(p.course_id)) {
          const { data: section } = await supabase
            .from('section')
            .select('slug')
            .eq('id', p.section_id)
            .single()

          if (section) {
            userLastVideo.set(p.course_id, {
              videoSlug: p.video_slug,
              chapterSlug: section.slug,
            })
          }
        }
      }
    }
  }

  // 3. Construct enriched course objects
  const courses = coursesRaw.map((course) => {
    const courseId = course.frontmatter.id
    const courseSlug = course.frontmatter.slug

    const vid = userLastVideo.get(courseId)

    let chapterSlug = vid?.chapterSlug || course.frontmatter.first_chapter
    let videoSlug = vid?.videoSlug || course.frontmatter.first_video

    return {
      ...course,
      courseSlug,
      chapterSlug,
      videoSlug,
      purchased: purchasedIds.has(courseId),
    }
  })

  return { courses, purchasedIds }
}
