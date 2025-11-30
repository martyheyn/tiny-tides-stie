<script lang="ts">
  import { createBrowserClient } from '@supabase/ssr';

  let { slug, modalId = 'signin-dialog' }: { slug: string, modalId: string } = $props()

  const supabase = createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_KEY!
  );

  let loading = $state(false);
  let errorMsg = $state('');

  async function handlePurchase() {
    errorMsg = "";

    // 1️⃣ Check auth session
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      // 2️⃣ Not signed in → show modal
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      modal?.showModal();
      return;
    }

    // 3️⃣ Logged in → request checkout session
    try {
      loading = true;

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: window.location.host.split('.')[0],
          slug,
        }),
      });

      const stripeRes = await response.json();

      if (stripeRes.url) {
        window.location.href = stripeRes.url;
      } else {
        errorMsg = "Unexpected server response.";
      }
    } catch (err) {
      console.error(err);
      errorMsg = "Something went wrong.";
    } finally {
      loading = false;
    }
  }
</script>

<button
  class="w-72 font-semibold text-xl px-6 py-3 bg-[#9ddcdc] hover:bg-[#90e8e8] text-[#173f69bf] transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl"
  onclick={handlePurchase}
  disabled={loading}
>
  {#if loading}
    Redirecting…
  {:else}
      Get Course
  {/if}
</button>

{#if errorMsg}
  <p class="text-red-600 mt-2 text-sm">{errorMsg}</p>
{/if}
