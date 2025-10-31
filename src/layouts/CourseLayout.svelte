<script lang="ts">
  import Sidebar from '../components/courses/Sidebar.svelte'

  let { chapters } = $props()

  let sidebarOpen = $state(true)
  // get user from svelte state and see if authenticated and if course purcashed
  // if so then show em the goods, if not then peace out
</script>

<div class="flex flex-col md:flex-row gap-4 transition-all ease-in-out duration-300">
  <div class="hidden md:block border-r border-black/20 ">
    <Sidebar bind:value={sidebarOpen} {chapters} />
  </div>

  <div class={`transition-all ease-in-out duration-300 flex-1`}>
     <slot sidebarOpen={sidebarOpen} />
  </div>

  <div class="block md:hidden">
    <Sidebar bind:value={sidebarOpen} {chapters} />
  </div>
</div>
