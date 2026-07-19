// Shared reactive state so the Video player and the course Sidebar
// (separate Svelte islands hydrated independently by Astro) stay in
// sync the instant a video is marked complete, without a page reload.
export const completedVideos = $state<Record<string, boolean>>({})
