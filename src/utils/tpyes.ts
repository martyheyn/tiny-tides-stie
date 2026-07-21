export type Video = {
  id: string
  name: string
  slug: string
  host_url: string
  length: number
  completed: boolean
  video_order: number
}

export type Chapter = {
  section_id: string
  label: string
  slug: string
  description: string
  section_order: number
  total_videos: number
  completed_videos: number
  videos: Video[]
}
