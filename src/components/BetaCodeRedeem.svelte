<script lang="ts">
  import { createBrowserClient } from '@supabase/ssr';
  import Notification from './Notification.svelte';

  let { courseId, startUrl, modalId = 'signin-dialog' }:
    { courseId: string, startUrl: string, modalId?: string } = $props()

  const supabase = createBrowserClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_KEY!
  );

  let expanded = $state(false);
  let code = $state('');
  let loading = $state(false);
  let redeemed = $state(false);
  let notification: { message: string; type: 'error' | 'success' | 'warning' | '' } = $state({ message: '', type: '' });

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
        placeholder="BETA-CODE"
        bind:value={code}
        disabled={loading || redeemed}
        class="py-2 px-3 text-black !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out uppercase disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || redeemed || !code.trim()}
        class="px-4 py-2 bg-[#9ddcdc] hover:bg-[#90e8e8] text-[#173f69bf] font-semibold transition-all duration-300 ease-in-out cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
    onclick={() => (expanded = true)}
    class="text-sm text-gray-600 underline hover:text-gray-900 transition-colors duration-200 cursor-pointer"
  >
    Have a beta code?
  </button>
{/if}

{#if notification.message}
  <div class="w-full max-w-xs">
    <Notification message={notification.message} type={notification.type} />
  </div>
{/if}
