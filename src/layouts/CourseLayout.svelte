<script lang="ts">
  import Sidebar from '../components/courses/Sidebar.svelte'

  let { chapters } = $props()

  let sidebarOpen = $state(true)
</script>

<div class="flex flex-col md:flex-row gap-4 transition-all ease-in-out duration-300">
  <div class="hidden md:block">
    <Sidebar bind:value={sidebarOpen} {chapters} />
  </div>

  <div class={`transition-all ease-in-out duration-300 flex-1`}>
     <slot />
  </div>

  <div class="block md:hidden">
    <Sidebar bind:value={sidebarOpen} {chapters} />
  </div>
</div>
