<script lang="ts">
    import { slide } from "svelte/transition"

    export let homepage: boolean = false;
    
  let error: string;
  let successMessage: string;
  let responseMessage: { success: boolean; error?: string } = {
    success: false,
  };

  let name = "";
  let phone = "";
  let email = "";
  let heaAboutUs = ""
  let message = "";

  const resetForm = () => {
    name = "";
    phone = "";
    email = "";
    heaAboutUs = "";
    message = "";
  };

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/email", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    responseMessage = data;

    if(!responseMessage.success) {
      if(responseMessage.error) {
        error = responseMessage.error;
      }
    }

    if(responseMessage.success) {
      resetForm();
      successMessage = 'Your message has been sent. We will get back to you soon.';
      setTimeout(() => {
        successMessage = '';
      }, 5000);
    }
  }
</script>


<div
  class={`w-full flex flex-col items-center justify-center h-full gap-y-4 px-4 md:px-8 py-6 rounded-lg ${homepage ? '' : 'border border-black/20'}`}
>
  <div class="w-full md:max-w-md">
    <form on:submit={submit} class="flex flex-col gap-3">
      <div class="flex justify-end items-center">
        <span class="text-black text-xs italic -mb-2">* All fields required</span>
      </div>
      
      {#if error}
        <p transition:slide={{ duration: 200 }} class="text-xs text-red-400">Error: {error}. Please try again</p>
      {/if}

      {#if successMessage}
        <p transition:slide={{ duration: 200 }} class="text-xs bg-green-300 py-2 px-4 rounded-md">{successMessage}</p>
      {/if}


      <div class="flex flex-col sm:flex-row gap-4">
        <label for="name" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px">Name</span>
          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            bind:value={name}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>

        <label for="phone" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">Phone</span>
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            bind:value={phone}
            placeholder="(410) 555-5555"
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>
      </div>

      <div>
        <label for="email" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">Email</span>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            bind:value={email}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>
      </div>

      <div>
        <label for="email" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">How did you hear about us?</span>
          <select
            required
            id="heaAboutUs"
            name="heaAboutUs"
            bind:value={heaAboutUs}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          >
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="friend-family">Friend or Family</option>
          <option value="tummy-time">Tummy Time!</option>
          <option value="flyer">Flyer</option>
          <option value="other">Other</option>
        </select>
        </label>
      </div>


      <div>
        <label for="message" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">Message</span>
          <textarea
            required
            rows="5"
            id="message"
            name="message"
            placeholder="Leave a short description of what you need help with."
            bind:value={message}
            class="mt-[2px] py-2 text-black px-2 !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          ></textarea>
        </label>
      </div>

      <div class="flex justify-center sm:justify-end items-center">
        <button
          class={`bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white`}
          type="submit"
          >Submit</button
        >
      </div>
    </form>
  </div>
</div>

<style>
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fcfeff inset !important; /* Matches your background color */
  -webkit-text-fill-color: black !important; /* Ensures text color matches */
  transition: background-color 500ms ease-in-out, color 500ms ease-in-out;
}
</style>
