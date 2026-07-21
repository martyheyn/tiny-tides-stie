<script lang="ts">
  import Modal from "./Modal.svelte";
  import TummyTimeForm from "../forms/TummyTimeForm.svelte";
  import Notification from '../Notification.svelte'

  let formRes: 'success' | 'error' | null = $state(null)
  
  let modal: Modal;
</script>

<button
  onclick={() => modal.openModal()}
  class="w-full md:w-fit font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]"
>
  Click Here to Sign Up
</button>

<Modal
  bind:this={modal}
  title="Tummy Time Group"
  subtitle="10:00–10:45am · Free"
>
  <TummyTimeForm onResult={(res) => {
    formRes = res;
    modal.closeModal();
    setTimeout(() => formRes = null, 10000);
  }} />
</Modal>


{#if formRes}
  <Notification
    message={formRes === 'success' ? 
    "Successfully submitted form. See you at Tummy Time!" : 
    'Error submitting form. Please try again another time.'}
    type={formRes}
  />
{/if}
