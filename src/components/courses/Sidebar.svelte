<script lang="ts">
    import { slide } from "svelte/transition"

  type Video = {
    id: string
    name: string
    host_url: string
    length: number
    completed: boolean
    video_order: number
  };

  type Chapter = {
      section_id: string
      label: string
      slug: string
      description: string
      section_order: number
      total_videos: number
      completed_videos: number
      videos: Video[]
  }

  let openedChapters = $state(new Map())

  let { value = $bindable(), chapters, pathname, video, course }: 
    { value: boolean, chapters: Chapter[], pathname: string, course: { id: string; name: string; slug: string; } | null, video: any | null } = $props();
  const currChapter = pathname.split('/').pop()

  if (currChapter) {
    const newMap = new Map();
    newMap.set(currChapter, !newMap.get(currChapter));
    openedChapters = newMap;
  }

  const toggleChapterOpen = (chapterSlug: string) => {
    const newMap = new Map(openedChapters);
    newMap.set(chapterSlug, !newMap.get(chapterSlug));
    openedChapters = newMap;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };
</script>

<div class={`${value ? 'w-full lg:w-64' : 'w-full md:w-24'} px-6 py-4 flex flex-col gap-y-4 transition-all ease-in-out duration-300`}>
  <div class={`hidden w-full py-2 md:flex md:justify-end`}>
    <button 
      class="px-4 py-1 border border-black hover:bg-primary/50 rounded-md transition-all ease-out duration-300 hover:scale-[1.02]"
      onclick={() => value = !value}
      aria-label="open-close-sidebar"
      >
      <svg viewBox="0 0 24 24" width="16" height="16" class={`${value && 'rotate-180'} stroke stroke-black transition-all duration-300 ease-out`} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
    </button>
  </div>

 <aside class={`${value ? 'opacity-100' : 'opacity-0'} transition-all ease-in-out duration-150 `}>
    <h2 class="text-gray-800 font-bold text-xl uppercase pb-4 border-b border-black/20">
      ⚡ {course && course.name}
    </h2>

    <nav class="flex-1">
      {#each chapters as chapter}
        <button
          onclick={() => toggleChapterOpen(chapter.slug)}
          class={`w-full course-nav-item text-left ${chapter.slug === currChapter ? 'text-black font-semibold scale-[1.03] bg-blue-100/80 rounded-md' : 'hover:bg-blue-100/30'}`}
        >
          <span>{chapter.label}</span>

          {#key chapter.section_id}
            <svg
              class="w-5 h-5 transform transition-all duration-300 ease-out"
              viewBox="0 0 36 36"
            >
              <!-- Background ring -->
              <path
                d="M18 2
                  a 16 16 0 0 1 0 32
                  a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="#d1d5db" 
                stroke-width="4"
                class="opacity-50"
              />

              <!-- Progress ring -->
              <path
                d="M18 2
                  a 16 16 0 0 1 0 32
                  a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="#4ade80"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="100"
                stroke-dashoffset="{100 - (chapter.completed_videos / chapter.total_videos) * 100}"
                class="transition-all duration-500 ease-out"
              />
            </svg>
          {/key}
        </button>
        
        {#if openedChapters.get(chapter.slug)}
          <div transition:slide class="w-full">
            <ul>
              {#each chapter.videos as v}
                <a class="w-full" href={`${video?.id !== v.id && `${chapter.slug}`}`}>
                  <li class={`w-full py-2 px-2 flex justify-between items-center text-left cursor-pointer rounded-md ${video?.id === v.id ? 'bg-blue-100/40' : 'hover:bg-blue-200/20'}`}>
                    <p class="text-[13px] max-w-[105px]">{v.name}</p>
                    <div class="flex items-center gap-x-2">
                      <p class="text-[13px]">{formatTime(v.length)}</p>
                      {#if v.completed}
                        <svg
                          class="w-4 h-4 text-green-300 transform transition-all duration-200 ease-out scale-0 opacity-0 animate-[popIn_.2s_forwards]"
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
                          class="w-4 h-4 text-gray-400 transform transition-all duration-200 ease-out scale-90 opacity-70"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      {/if}
                    </div>
                  </li>
                </a>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}
     
    </nav>
  </aside>

    <a
      href={course && `/courses/${course.slug}`}
      class="flex items-center gap-x-4 px-4 py-1 border border-black hover:bg-primary/50 rounded-md transition-all ease-out duration-300 hover:scale-[1.02]"
    >
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
      <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
    {#if value}
      <p>
        Course Details
      </p>
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