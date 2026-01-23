<script lang="ts">
  import { slide } from "svelte/transition"

  type GoogleAutoompleteSuggestion = {
    placePrediction: {
      placeId: string,
      text: {
        text: string
      }
    }
  }

  let homepage: boolean = $state(false);
  
  let error: string = $state('');
  let responseMessage: { success: boolean; error?: string } = {
    success: false,
  };

  let name = $state("");
  let phone = $state("");
  let email = $state("");
  let birthDate = $state("");
  let hearAboutUs = $state("");
  let hearAboutUsOther = $state("");
  let locationQuery = $state("");
  let location = $state("");
  let referral = $state("");
  let medicaid = $state("");
  let message = $state("");

  let suggestions: GoogleAutoompleteSuggestion[] = $state([]);
  let debounceTimeout: number;

  const resetForm = () => {
    name = "";
    phone = "";
    email = "";
    birthDate = "";
    hearAboutUs = "";
    hearAboutUsOther = "";
    location = "";
    referral = "";
    medicaid = ""
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
      error = 'There was an error trying to submit. Please try again at a later time'
    }

    if(responseMessage.success) {
      resetForm();
      window.location.href = "/thank-you";
    }
  }

  let monthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]



  // google autocomplete stuff
  function handleInput() {
    clearTimeout(debounceTimeout);

    debounceTimeout = window.setTimeout(async () => {
      if (locationQuery.length < 3) {
        suggestions = [];
        return;
      }

      const res = await fetch(
        `/api/places-autocomplete?input=${encodeURIComponent(locationQuery)}`
      );

      const data = await res.json();
      suggestions = data.suggestions ?? [];
    }, 300);
  }


  function selectSuggestion(suggestion: GoogleAutoompleteSuggestion) {
    location = suggestion.placePrediction.text.text
    locationQuery = location;
    suggestions = [];
  }
</script>


<div
  class={`w-full flex flex-col items-center justify-center h-full gap-y-4 px-4 md:px-8 py-6 rounded-lg ${homepage ? '' : 'border border-black/20'}`}
>
  <div class="w-full md:max-w-md">
    <form onsubmit={submit} class="flex flex-col gap-3">
      <div class="flex justify-end items-center">
        <span class="text-black text-xs italic -mb-2">* All fields required</span>
      </div>
      
      {#if error}
        <p transition:slide={{ duration: 200 }} class="text-xs text-red-400">{error}</p>
      {/if}


      <div class="flex flex-col sm:flex-row gap-4">
        <label for="name" class="block text-sm font-semibold text-gray-800 flex-1"
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

        <label for="phone" class="block text-sm font-semibold text-gray-800 flex-1"
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

      <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
        <label for="email" class="block text-sm font-semibold text-gray-800 flex-1"
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

        <label for="birthDate" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px]">Patient Birth Date</span>
          <input
            required
            id="birthDate"
            name="birthDate"
            type="date"
            min="2018-01-01"
            max={monthAhead}
            bind:value={birthDate}
            class={`mt-[2px] py-2 text-black !bg-[#fcfeff] px-2 border focus:outline-none focus:border-blue-300
             w-full rounded-md transition duration-150 ease-in-out ${birthDate ? '' : 'text-gray-400'}`}
          />
        </label>

      </div>

      <div>
        <label for="medicaid" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">Do you have Medicaid?</span>
          <select
            required
            id="medicaid"
            name="medicaid"
            bind:value={medicaid}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>



      <div>
        <label for="hearAboutUs" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">How did you hear about us?</span>
          <select
            required
            id="hearAboutUs"
            name="hearAboutUs"
            bind:value={hearAboutUs}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          >
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="google">Google</option>
          <option value="friend-family">Friend or Family</option>
          <option value="tummy-time">Tummy Time!</option>
          <option value="flyer">Flyer</option>
          <option value="referral">Referral</option>
          <option value="other">Other</option>
        </select>
        </label>
      </div>

      {#if hearAboutUs === 'referral'}
        <div transition:slide={{ duration: 200 }}>
          <label for="referral" class="block text-sm font-semibold text-gray-800"
            ><span class="pl-[2px]">Referral</span>
            <input
              required={hearAboutUs === 'referral'}
              id="referral"
              name="referral"
              type="text"
              placeholder="Which provider pointed you our way?"
              bind:value={referral}
              class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
            />
          </label>
        </div>
      {/if}

      {#if hearAboutUs === 'other'}
        <div transition:slide={{ duration: 200 }}>
          <label for="hearAboutUsOther" class="block text-sm font-semibold text-gray-800"
            >
            <input
              required={hearAboutUs === 'other'}
              id="hearAboutUsOther"
              name="hearAboutUsOther"
              type="text"
              placeholder="How did you hear about us? (Other)"
              bind:value={hearAboutUsOther}
              class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
            />
          </label>
        </div>
      {/if}


      <div>
        <label class="block text-sm font-semibold text-gray-800">
          <span class="pl-[2px]">Where do you live?</span>

          <input
            type="text"
            placeholder="City or address"
            bind:value={locationQuery}
            oninput={handleInput}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />

          <input type="hidden" name="location" value={location} />

          {#if suggestions.length}
            <ul class="mt-1 border rounded-md bg-white shadow-lg max-h-60 overflow-auto">
              {#each suggestions as suggestion}
                <button onclick={() => selectSuggestion(suggestion)}>
                  <li class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-left">
                    {suggestion.placePrediction.text.text}
                  </li>
                </button>
              {/each}
            </ul>
          {/if}
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
