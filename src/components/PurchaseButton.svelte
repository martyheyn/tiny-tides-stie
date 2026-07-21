<script lang="ts">
  import { createBrowserClient } from '@supabase/ssr'

  let {
    slug,
    modalId = 'signin-dialog',
    lockBtn = false,
  }: { slug: string; modalId?: string; lockBtn?: boolean } = $props()

  const supabase = createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_KEY!,
  )

  let loading = $state(false)
  let errorMsg = $state('')
  let user = $state()
  $inspect(user)

  async function handlePurchase() {
    errorMsg = ''

    // 1️⃣ Check auth session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user = session?.user

    if (!user) {
      // 2️⃣ Not signed in → show modal
      const modal = document.getElementById(modalId) as HTMLDialogElement | null
      modal?.showModal()
      return
    }

    // 3️⃣ Logged in → request checkout session
    try {
      loading = true

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseUrl: window.location.host,
          slug,
        }),
      })

      if (response.status === 401) {
        // Client-side session looked valid but the server disagrees (e.g. stale/expired token) -> re-prompt sign in
        const modal = document.getElementById(modalId) as HTMLDialogElement | null
        modal?.showModal()
        return
      }

      const stripeRes = await response.json()

      if (stripeRes.url) {
        window.location.href = stripeRes.url
      } else {
        errorMsg = stripeRes.error || 'Unexpected server response.'
      }
    } catch (err) {
      console.error(err)
      errorMsg = 'Something went wrong.'
    } finally {
      loading = false
    }
  }
</script>

<button
  class={lockBtn
    ? 'text-black opacity-50 hover:opacity-100 flex items-center gap-x-[6px] cursor-pointer hover:scale-[1.03] transition-all duration-300 ease-in-out'
    : 'w-72 font-semibold text-xl px-6 py-3 bg-[#9ddcdc] hover:bg-[#90e8e8] text-[#173f69bf] transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl'}
  onclick={handlePurchase}
  disabled={loading}
>
  {#if lockBtn}
    <svg
      class="w-5 h-5 mb-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <path
        style="fill:#e9da10"
        d="M101.946 53.087h-75.88a3.903 3.903 0 0 0-3.891 3.891v64.207a3.903 3.903 0 0 0 3.891 3.891h75.881a3.903 3.903 0 0 0 3.891-3.891V56.978a3.904 3.904 0 0 0-3.892-3.891zM68.928 93.673v13.094h-7.374V93.673c-3.541-1.44-6.051-4.922-6.051-8.989 0-5.37 4.358-9.728 9.728-9.728s9.728 4.358 9.728 9.728a9.69 9.69 0 0 1-6.031 8.989z"
      />
      <path
        style="fill:#1d252c"
        d="M101.94 50.173h-7.25v-19.49C94.69 13.764 80.926 0 63.994 0 47.074 0 33.31 13.764 33.31 30.683v19.49h-7.25a6.818 6.818 0 0 0-6.81 6.81v64.207a6.818 6.818 0 0 0 6.81 6.81h75.881a6.818 6.818 0 0 0 6.81-6.81V56.983c-.001-3.754-3.056-6.81-6.811-6.81zm-62.793-19.49c0-13.7 11.146-24.846 24.858-24.846 13.701 0 24.847 11.146 24.847 24.846v19.49H39.147v-19.49zm63.766 90.507a.985.985 0 0 1-.973.973H26.06a.985.985 0 0 1-.973-.973V56.983c0-.527.445-.973.973-.973h75.881c.528 0 .973.446.973.973v64.207zM65.231 73.01c-6.437 0-11.674 5.237-11.674 11.674 0 4.309 2.335 8.189 6.052 10.217v11.868c0 1.075.87 1.946 1.946 1.946h7.374c1.075 0 1.946-.87 1.946-1.946V94.901c3.703-2.025 6.031-5.904 6.031-10.217-.001-6.437-5.237-11.674-11.675-11.674zm2.964 18.861a1.944 1.944 0 0 0-1.212 1.802v11.15H63.5v-11.15c0-.792-.479-1.504-1.212-1.802a7.73 7.73 0 0 1-4.839-7.187c0-4.291 3.49-7.783 7.783-7.783 4.292 0 7.783 3.491 7.783 7.783a7.722 7.722 0 0 1-4.82 7.187z"
      />
    </svg>
  {/if}

  {#if loading}
    Redirecting…
  {:else if lockBtn && !user}
    Must be signed in access get course
  {:else if lockBtn && user}
    Must purchases course to access content
  {:else}
    Get Course
  {/if}
</button>

{#if errorMsg}
  <p class="text-red-600 mt-2 text-sm">{errorMsg}</p>
{/if}
