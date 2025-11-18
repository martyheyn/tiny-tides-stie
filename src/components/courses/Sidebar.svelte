<script lang="ts">
  type Chapter = {
      label: string
      slug: string
      description: string
      // length: string
    }


  let { value = $bindable(), chapters, pathname }: { value: boolean, chapters: Chapter[], pathname: string } = $props();
  const course = pathname.split('/')[pathname.split('/').length - 2]
</script>

<div class={`${value ? 'w-full md:w-64' : 'w-full md:w-24'} px-6 py-4 flex flex-col gap-y-4 transition-all ease-in-out duration-300`}>
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
    <h2 class="text-gray-800 font-bold text-xl mb-1 uppercase pb-4 border-b border-black/20">
      ⚡ Intro to Solids
    </h2>

    <nav class="flex-1">
      {#each chapters as chapter, index}
      <a class="course-nav-item" href={chapter.slug}>
        <span>{chapter.label}</span>
        <!-- <span class="text-sm">{chapter.length}</span> -->
      </a>
      {/each}
     
    </nav>
  </aside>

    <a
      href={`/courses/${course}`}
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