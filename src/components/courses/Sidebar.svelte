<script lang="ts">
  import type { Chapter } from '../../utils/tpyes'
  import { completedVideos } from '../../lib/videoCompletionStore.svelte'
  import DownloadResourcesButton from './DownloadResourcesButton.svelte'

  type Resource = {
    id: string
    name: string
    file_type: string | null
  }

  let openedChapters = $state(new Map())

  let {
    value = $bindable(),
    chapters,
    pathname,
    course,
    resources,
    hasFeedback,
  }: {
    value: boolean
    chapters: Chapter[]
    pathname: string
    course: { id: string; name: string; slug: string } | null
    video: any | null
    resources: Resource[]
    hasFeedback: boolean
  } = $props()
  const currChapter = pathname.split('/')[pathname.split('/').length - 2]

  if (currChapter) {
    const newMap = new Map()
    newMap.set(currChapter, !newMap.get(currChapter))
    openedChapters = newMap
  }
</script>

<div
  class={`${value ? 'w-full lg:w-118.75' : 'w-full md:w-24'} px-6 py-12 flex flex-col gap-y-4 transition-all ease-in-out duration-300`}
>
  <aside
    class={`${value ? 'opacity-100' : 'opacity-0'} transition-all ease-in-out duration-150 `}
  >
    <h2
      class="text-gray-800 font-bold text-xl uppercase pb-4 border-b border-black/20"
    >
      {course && course.name}
    </h2>

    <nav class="flex-1">
      {#each chapters as chapter, i}
        {@const isCompleted =
          completedVideos[chapter.videos[0]?.id] ??
          chapter.videos[0].completed}
        <a
          href={course &&
            `/courses/${course.slug}/${chapter.slug}/${chapter.videos[0].slug}`}
          class={`w-full course-nav-item text-left ${chapter.slug === currChapter ? 'text-black font-semibold scale-100.5 bg-blue-100/80 rounded-md' : 'hover:bg-blue-100/30'}`}
        >
          <span>{chapter.label}</span>

          <div class="flex gap-x-3 items-center">
            {#key `${chapter.section_id}-${isCompleted}`}
              <!-- Completed CHeck for chapters -->
              {#if isCompleted}
                <svg
                  class="w-5 h-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 10l4 4 8-8"
                    class="draw-check"
                    style="stroke-dasharray: 17; stroke-dashoffset: 17;"
                  />
                </svg>
              {:else}
                <svg
                  class="w-5 h-5 text-gray-400 transform transition-all duration-200 ease-out scale-90 opacity-70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              {/if}
            {/key}
          </div>
        </a>

        {#if i === chapters.length - 1 && course}
          <div class="pl-2 pt-2">
            <DownloadResourcesButton
              courseId={course.id}
              {resources}
              {hasFeedback}
            />
          </div>
        {/if}
      {/each}
    </nav>
  </aside>

  <a
    href={course && `/courses/${course.slug}`}
    class="flex items-center gap-x-4 px-4 py-2 bg-white border border-black/10 shadow-sm rounded-md hover:bg-secondary/30 hover:border-black/20 hover:shadow-md hover:scale-102 transition-all ease-out duration-300"
  >
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      class={`${value && 'rotate-180'} stroke stroke-black transition-all duration-300 ease-out`}
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      ><path
        d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
      /></svg
    >
    {#if value}
      <p>Back to Course Details</p>
    {/if}
  </a>
</div>

<style>
  .draw-check {
    animation: draw-check 0.4s ease-out forwards;
  }

  @keyframes draw-check {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
