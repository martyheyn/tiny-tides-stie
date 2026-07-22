<script lang="ts">
  type Resource = {
    id: string
    name: string
    file_type: string | null
  }

  let {
    courseId,
    resources,
    hasFeedback,
  }: {
    courseId: string
    resources: Resource[]
    hasFeedback: boolean
  } = $props()

  let dialogEl: HTMLDialogElement | null = null
  let feedbackGiven = $state(hasFeedback)
  let feedbackText = $state('')
  let submitting = $state(false)
  let panelOpen = $state(false)
  let downloadingId = $state<string | null>(null)
  let errorMsg = $state('')

  function handleButtonClick() {
    if (!feedbackGiven) {
      dialogEl?.showModal()
      return
    }
    panelOpen = !panelOpen
  }

  // Closing always reveals the resource list -- feedback is optional, so the
  // modal is a one-time nudge, never a gate. The dialog's native "close" event
  // (fired by dialog.close(), the Escape key, or a backdrop click) is the
  // single trigger, so every dismissal path opens the panel exactly once.
  function closeModal() {
    dialogEl?.close()
  }

  async function submitFeedback() {
    if (!feedbackText.trim()) {
      closeModal()
      return
    }

    submitting = true
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, text: feedbackText }),
      })

      if (res.ok) {
        feedbackGiven = true
      }
    } finally {
      submitting = false
      closeModal()
    }
  }

  async function downloadResource(resource: Resource) {
    errorMsg = ''
    downloadingId = resource.id
    try {
      const res = await fetch(`/api/resource-url?resourceId=${resource.id}`, {
        credentials: 'include',
      })
      const data = await res.json()

      if (!res.ok || !data.url) {
        errorMsg = data.error || 'Could not download that resource.'
        return
      }

      const a = document.createElement('a')
      a.href = data.url
      a.download = data.name
      a.click()
    } finally {
      downloadingId = null
    }
  }
</script>

<button
  onclick={handleButtonClick}
  aria-label="download-resources-btn"
  aria-expanded={panelOpen}
  class="w-full flex items-center gap-x-4 px-4 py-2 bg-white border border-black/10 shadow-sm rounded-md hover:bg-secondary/30 hover:border-black/20 hover:shadow-md hover:scale-102 transition-all ease-out duration-300"
>
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    class="stroke stroke-black"
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 19h16" />
  </svg>
  <p class="flex-1">Download Resources</p>
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    class={`stroke stroke-black transition-transform duration-300 ease-out ${panelOpen ? 'rotate-180' : ''}`}
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
</button>

{#if errorMsg}
  <p class="text-red-600 text-xs mt-1">{errorMsg}</p>
{/if}

<div
  class={`grid transition-all duration-300 ease-in-out ${panelOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
>
  <div class="overflow-hidden">
    <div class="flex flex-col gap-y-1 border border-black/10 rounded-md bg-white shadow-sm overflow-hidden">
      {#each resources as resource (resource.id)}
        <button
          onclick={() => downloadResource(resource)}
          disabled={downloadingId === resource.id}
          aria-label={`download-resource-${resource.id}`}
          class="w-full flex items-center justify-between gap-x-2 px-3 py-2 text-sm text-left hover:bg-secondary/20 transition-colors disabled:opacity-50"
        >
          <span class="truncate">{resource.name}</span>
          {#if downloadingId === resource.id}
            <span class="text-xs text-gray-400 shrink-0">Downloading…</span>
          {:else}
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              class="stroke stroke-black shrink-0"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M4 19h16" />
            </svg>
          {/if}
        </button>
      {:else}
        <p class="px-3 py-2 text-xs text-gray-500">No resources for this course yet.</p>
      {/each}
    </div>
  </div>
</div>

<dialog
  bind:this={dialogEl}
  class="feedback-dialog"
  aria-labelledby="feedback-dialog-title"
  onclick={(e) => {
    if (e.target === dialogEl) closeModal()
  }}
  onclose={() => (panelOpen = true)}
>
  <div class="px-8 py-6 w-[90vw] max-w-md">
    <div class="flex items-start justify-between">
      <h2
        id="feedback-dialog-title"
        class="text-lg font-semibold text-gray-800"
      >
        How was the course?
      </h2>
      <button
        onclick={closeModal}
        aria-label="close-feedback-modal"
        class="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          fill="none"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <p class="text-sm text-gray-500 mt-1">
      Please share your feedback before downloading the course resources (not
      necessary).
    </p>

    <textarea
      bind:value={feedbackText}
      rows="4"
      placeholder="What did you think of the course?"
      class="w-full mt-4 border border-black/10 rounded-md p-3 text-sm focus:outline-none focus:border-black/30 resize-none"
    ></textarea>

    <div class="flex justify-end gap-x-3 mt-4">
      <button
        onclick={closeModal}
        class="text-sm text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
      >
        Skip
      </button>
      <button
        onclick={submitFeedback}
        disabled={submitting}
        class="text-sm font-semibold px-4 py-2 bg-secondary hover:bg-[#90e8e8] text-text rounded-md cursor-pointer transition-all duration-300 ease-in-out disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit Feedback'}
      </button>
    </div>
  </div>
</dialog>

<style>
  .feedback-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    border: none;
    padding: 0;
    border-radius: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    background: white;
  }

  .feedback-dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
