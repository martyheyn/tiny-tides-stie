<script lang="ts">
    import { slide } from "svelte/transition"

  let { faqs } = $props();

  let selectedFaq = $state(0);
</script>

<div class="">
{#each faqs as { frontmatter, content }, i}
  <div class="w-full bg-secondary text-black my-2 px-4 rounded-md">
      <div class="flex gap-x-6 justify-between items-center py-2">
        <p class="text-base md:text-xl font-medium">
          {frontmatter.question}
        </p>
        <button
          class="cursor-pointer hover:scale-[1.10] transition-all duration-300 ease-in-out"
          aria-label="Toggle FAQ"
          onclick={() =>selectedFaq = i}
        >
          {#if selectedFaq !== i}
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
            </svg>
          {/if}
          {#if selectedFaq === i}
            <svg class="w-6 h-6" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/>
            </svg>
          {/if}
        </button>
      </div>
      {#if selectedFaq === i}
        <div transition:slide={{ duration: 250 }} class="py-2">
          <p class="">
            {@html content}
          </p>
        </div>
      {/if}
  </div>
{/each}
</div>
