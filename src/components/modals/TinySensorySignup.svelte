<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import TinySensoryForm from '../forms/TinySensoryForm.svelte';
  import Notification from '../Notification.svelte';

  let formRes: 'success' | 'error' | null = $state(null);
  let customerEmail = $state('');  // 👈 add this
  let modal: Modal;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await res.json();

      if (data.paid) {
          customerEmail = data.email;
          modal.openModal();
          
          const url = new URL(window.location.href);
          url.searchParams.delete('session_id');
          window.history.replaceState({}, '', url);
        }
    }
  });
</script>

<a
  href="https://buy.stripe.com/28E28s61Jbbff6v4487N602"
  class="w-full md:w-fit bg-[#9ddcdc] text-center cursor-pointer font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black hover:bg-[#90e8e8]"
>
  Sign Up Now!
</a>

<Modal
  bind:this={modal}
  title="Tiny Tots Sensory Playtime"
  subtitle="Thanks for signing up for Sensory Playtime! Please fill out the form below to complete registration"
>
  <TinySensoryForm 
    email={customerEmail}
    onResult={(res) => {
      formRes = res;
      modal.closeModal();
      setTimeout(() => formRes = null, 10000);
    }} 
  />
</Modal>

{#if formRes}
  <Notification
    message={formRes === 'success' ?
      'Successfully signed up! See you there!' :
      'Error submitting form. Please try again.'}
    type={formRes}
  />
{/if}