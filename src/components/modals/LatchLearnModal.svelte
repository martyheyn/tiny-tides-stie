<script lang="ts">
  import Modal from "./Modal.svelte";
  import LatchLearnForm from "../forms/LatchLearnForm.svelte";
  import Notification from '../Notification.svelte'

  let formRes: 'success' | 'error' | null = $state(null)

  let modal: Modal;
</script>

<button
  onclick={() => modal.openModal()}
  class="w-full md:w-fit font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-102 shadow-lg hover:shadow-2xl text-black bg-secondary hover:bg-[#90e8e8]"
>
  Click Here to Sign Up
</button>

<Modal
  bind:this={modal}
  title="Latch and Learn"
  subtitle="Friday, Aug 7 · 10:00–11:00am · Free"
>
  <LatchLearnForm onResult={(res) => {
    formRes = res;
    modal.closeModal();
    setTimeout(() => formRes = null, 10000);
  }} />
</Modal>


{#if formRes}
  <Notification
    message={formRes === 'success' ?
    "Successfully submitted form. See you at Latch and Learn!" :
    'Error submitting form. Please try again another time.'}
    type={formRes}
  />
{/if}
