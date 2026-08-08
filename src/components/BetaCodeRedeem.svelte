<script lang="ts">
  import { onMount } from 'svelte';
  import { createBrowserClient } from '@supabase/ssr';
  import Notification from './Notification.svelte';

  let { courseId, startUrl, modalId = 'signin-dialog' }:
    { courseId: string, startUrl: string, modalId?: string } = $props()

  const supabase = createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_KEY!
  );

  let expanded = $state(false);
  let toggling = $state(false);
  let code = $state('');
  let loading = $state(false);
  let redeemed = $state(false);
  let notification: { message: string; type: 'error' | 'success' | 'warning' | '' } = $state({ message: '', type: '' });

  // After a magic-link login (a full page reload — there's no client-side
  // session-changed event in this codebase), resume straight into the
  // code input if the user came here via the toggle below.
  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redeem') === '1') {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) expanded = true;

      const url = new URL(window.location.href);
      url.searchParams.delete('redeem');
      window.history.replaceState({}, '', url);
    }
  });

  async function handleToggleClick() {
    if (toggling || expanded) return;
    toggling = true;
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (!modal) return;

        const url = new URL(window.location.href);
        url.searchParams.set('redeem', '1');
        window.history.replaceState({}, '', url);

        modal.showModal();
        return;
      }

      expanded = true;
    } finally {
      toggling = false;
    }
  }

  async function handleRedeem(e: SubmitEvent) {
    e.preventDefault();
    if (!code.trim() || loading || redeemed) return;

    notification = { message: '', type: '' };

    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      modal?.showModal();
      return;
    }

    try {
      loading = true;

      // Grants access by inserting into `purchases` (the only table every
      // access check reads). `beta_code_redemptions` is bookkeeping only,
      // used to enforce max_redemptions — deleting a row there does NOT
      // revoke access; delete the matching row in `purchases` instead.
      const { data, error } = await supabase.rpc('redeem_beta_code', { p_code: code.trim() });

      if (error) {
        notification = { message: error.message, type: 'error' };
        return;
      }

      redeemed = true;

      if (data === courseId) {
        notification = { message: 'Code redeemed! Taking you to your course…', type: 'success' };
        setTimeout(() => {
          window.location.href = startUrl !== '#' ? startUrl : window.location.pathname;
        }, 700);
      } else {
        notification = { message: 'Code redeemed! You now have access to another course — check My Courses.', type: 'success' };
      }
    } catch (err) {
      console.error(err);
      notification = { message: 'Something went wrong.', type: 'error' };
    } finally {
      loading = false;
    }
  }
</script>

{#if expanded}
  <form onsubmit={handleRedeem} class="flex flex-col items-center gap-2">
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="DISCOUNT-CODE"
        bind:value={code}
        disabled={loading || redeemed}
        class="py-2 px-3 text-black !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out uppercase disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || redeemed || !code.trim()}
        class="px-4 py-2 bg-secondary hover:bg-[#90e8e8] text-text font-semibold transition-all duration-300 ease-in-out cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if loading}
          Checking…
        {:else if redeemed}
          Redeemed
        {:else}
          Redeem
        {/if}
      </button>
    </div>
  </form>
{:else}
  <button
    type="button"
    onclick={handleToggleClick}
    disabled={toggling}
    class="text-xl font-semibold mt-2 text-gray-800 underline decoration-secondary decoration-2 underline-offset-2 hover:text-gray-900 transition-colors duration-200 cursor-pointer disabled:opacity-50"
  >
    Have a discount code?
  </button>
{/if}

{#if notification.message}
  <div class="w-full max-w-xs">
    <Notification message={notification.message} type={notification.type} />
  </div>
{/if}
