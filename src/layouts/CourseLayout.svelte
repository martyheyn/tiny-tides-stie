<script lang="ts">
  import Sidebar from '../components/courses/Sidebar.svelte'

  let { chapters, pathname, course } = $props()

  let sidebarOpen = $state(true)
</script>

<div class="flex flex-col lg:flex-row gap-4 transition-all ease-in-out duration-300">
  <div class="hidden lg:block border-r border-black/20 ">
    <Sidebar bind:value={sidebarOpen} {chapters} {pathname} {course}  />
  </div>

  <div class={`transition-all ease-in-out duration-300 flex-1`}>
     <slot sidebarOpen={sidebarOpen}/>
  </div>

  <div class="block lg:hidden">
    <Sidebar bind:value={sidebarOpen} {chapters} {pathname} {course} />
  </div>
</div>
