<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import TinySensoryForm from '../forms/TinySensoryForm.svelte';
  import Notification from '../Notification.svelte';

  let formRes: 'success' | 'error' | null = $state(null);
  let modal: Modal;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await res.json();

      // Clean up URL regardless of outcome
      const url = new URL(window.location.href);
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url);

      if (data.paid) {
        const saved = localStorage.getItem('sensory_form_data');
        
        // Always clear localStorage — whether submit succeeds or fails
        localStorage.removeItem('sensory_form_data');

        if (saved) {
          try {
            const formData = JSON.parse(saved);
            const submitRes = await fetch('/api/tiny-tots-sensory', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
            const result = await submitRes.json();
            formRes = result.success ? 'success' : 'error';
          } catch {
            formRes = 'error';
          }
        }
      } else {
        // Payment failed or was cancelled — clear any saved form data
        localStorage.removeItem('sensory_form_data');
      }
    }
  });
</script>

<!-- Button now opens modal directly -->
<button
  onclick={() => modal.openModal()}
  class="w-full md:w-fit bg-[#9ddcdc] text-center cursor-pointer font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black hover:bg-[#90e8e8]"
>
  Sign Up Now!
</button>

<Modal
  bind:this={modal}
  title="Tiny Tots Sensory Playtime"
  subtitle="Complete the form below, then proceed to payment to finish registration."
>
  <TinySensoryForm />
</Modal>

{#if formRes}
  <Notification
    message={formRes === 'success' ?
      'Successfully signed up! See you there!' :
      'Error submitting form. Please try again.'}
    type={formRes}
  />
{/if}