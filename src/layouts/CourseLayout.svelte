<script lang="ts">
  import BaseLayout from './BaseLayout.astro'
  import Sidebar from '../components/courses/Sidebar.svelte'

  const sidebarOpen = $state(true)
</script>

<BaseLayout>
  <Sidebar sidebarOpen={sidebarOpen} />

  <div class={``}>
    <!-- <slot /> -->
  </div>
</BaseLayout>
