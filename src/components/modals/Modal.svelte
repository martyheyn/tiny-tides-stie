<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let title: string;
  export let subtitle: string = "";

  let dialogEl: HTMLDialogElement;

  export function openModal() {
    dialogEl.showModal();
    document.body.style.overflow = "hidden";
  }

  export function closeModal() {
    dialogEl.close();
    document.body.style.overflow = "";
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialogEl) closeModal();
  }
</script>

<dialog
  bind:this={dialogEl}
  on:click={handleBackdropClick}
  on:close={closeModal}
  class="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-white w-[375px] sm:w-full max-w-2xl max-h-[80vh] md:max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto"
>
  <div transition:fly={{ y: 24, duration: 300, easing: cubicOut }}>
    <!-- Header -->
    <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-primary border-b border-black/10 rounded-t-2xl">
      <div>
        <h2 class="text-lg font-bold text-gray-900 leading-tight">{title}</h2>
        {#if subtitle}
          <p class="text-sm text-gray-500">{subtitle}</p>
        {/if}
      </div>
      <button
        on:click={closeModal}
        aria-label="Close"
        class="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Slotted content -->
    <div class="px-6 py-2">
      <slot />
    </div>
  </div>
</dialog>

<style>
  dialog {
    border: none;
    outline: none;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    margin: 0;
    scrollbar-width: none;
  }

  dialog::-webkit-scrollbar {
    display: none;
  }

  dialog:not([open]) {
    display: none;
  }
</style>