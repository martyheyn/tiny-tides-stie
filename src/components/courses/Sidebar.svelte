<script lang="ts">
  type Chapter = {
      title: string
      slug: string
      description: string
      length: string
    }


  let { value = $bindable(), chapters }: { value: boolean, chapters: Chapter[] } = $props();
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
        <span>{chapter.title}</span><span class="text-sm">{chapter.length}</span>
      </a>
      {/each}
     
    </nav>
  </aside>
</div>