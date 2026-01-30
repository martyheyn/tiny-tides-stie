<script lang="ts">
  import type { Chapter } from '../../utils/tpyes'

  let openedChapters = $state(new Map())

  let {
    value = $bindable(),
    chapters,
    pathname,
    course,
  }: {
    value: boolean
    chapters: Chapter[]
    pathname: string
    course: { id: string; name: string; slug: string } | null
    video: any | null
  } = $props()
  const currChapter = pathname.split('/')[pathname.split('/').length - 2]

  if (currChapter) {
    const newMap = new Map()
    newMap.set(currChapter, !newMap.get(currChapter))
    openedChapters = newMap
  }
</script>

<div
  class={`${value ? 'w-full lg:w-[475px]' : 'w-full md:w-24'} px-6 py-12 flex flex-col gap-y-4 transition-all ease-in-out duration-300`}
>
  <aside
    class={`${value ? 'opacity-100' : 'opacity-0'} transition-all ease-in-out duration-150 `}
  >
    <h2
      class="text-gray-800 font-bold text-xl uppercase pb-4 border-b border-black/20"
    >
      ⚡ {course && course.name}
    </h2>

    <nav class="flex-1">
      {#each chapters as chapter}
        <a
          href={course &&
            `/courses/${course.slug}/${chapter.slug}/${chapter.videos[0].slug}`}
          class={`w-full course-nav-item text-left ${chapter.slug === currChapter ? 'text-black font-semibold scale-[1.005] bg-blue-100/80 rounded-md' : 'hover:bg-blue-100/30'}`}
        >
          <span>{chapter.label}</span>

          <div class="flex gap-x-3 items-center">
            {#key chapter.section_id}
              <!-- Completed CHeck for chapters -->
              {#if chapter.videos[0].completed}
                <svg
                  class="w-5 h-4/5 text-green-500 transform transition-all duration-200 ease-out animate-[popIn_.2s_forwards]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z"
                    clip-rule="evenodd"
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
      {/each}
    </nav>
  </aside>

  <a
    href={course && `/courses/${course.slug}`}
    class="flex items-center gap-x-4 opacity-60 px-4 py-1 border border-black/50 hover:bg-primary/50 rounded-md transition-all ease-out duration-300 hover:scale-[1.02]"
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
  @keyframes popIn {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    70% {
      transform: scale(1.15);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
