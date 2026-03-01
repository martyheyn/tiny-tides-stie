<script lang="ts">
  import Modal from "./Modal.svelte";
  import TummyTimeForm from "../forms/TummyTimeForm.svelte";

  let modal: Modal;
</script>

<button
  on:click={() => modal.openModal()}
  class="font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]"
>
  Click Here to Sign Up
</button>

<Modal
  bind:this={modal}
  title="Tummy Time Group"
  subtitle="Every Monday 10:00–10:45am · Free"
>
  <TummyTimeForm />
</Modal>