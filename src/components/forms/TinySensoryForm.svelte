<script lang="ts">
  import { slide } from "svelte/transition"
  let { onResult, email } = $props<{ onResult: (res: 'success' | 'error') => void, email: string }>();

  type GoogleAutoompleteSuggestion = {
    placePrediction: {
      placeId: string,
      text: {
        text: string
      }
    }
  }

  const sensoryObservations = [
    { value: 'picky-eating', label: 'Picky Eating' },
    { value: 'clumsiness', label: 'Clumsiness / Poor Coordination' },
    { value: 'texture-aversion', label: 'Dislikes Certain Textures' },
    { value: 'frequent-meltdowns', label: 'Frequent Meltdowns' },
    { value: 'noise-sensitivity', label: 'Sensitivity to Loud Noises' },
    { value: 'low-activity', label: 'Low Energy / Seems Understimulated' },
    { value: 'high-activity', label: 'Very High Energy / Seeks Movement' },
    { value: 'sleep-issues', label: 'Difficulty Sleeping' },
    { value: 'social-challenges', label: 'Difficulty with Social Situations' },
    { value: 'fearful', label: 'Fearful or Timid on the playground' },
  ]

  
  let error: string = $state('');
  let responseMessage: { success: boolean; error?: string } = {
    success: false,
  };

  let parentName = $state("");
  let phone = $state("");
  let childName = $state("");
  let birthDate = $state("");
  let hearAboutUs = $state("");
  let hearAboutUsOther = $state("");
  let locationQuery = $state("");
  let location = $state("");
  let message = $state("");
  let consentToPic = $state(false);

  let suggestions: GoogleAutoompleteSuggestion[] = $state([]);
  let debounceTimeout: number;

  const resetForm = () => {
    parentName = "";
    phone = "";
    childName = "";
    birthDate = "";
    hearAboutUs = "";
    hearAboutUsOther = "";
    location = "";
    message = "";
    consentToPic = false;
  };

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/tiny-tots-sensory", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    responseMessage = data;

    if(!responseMessage.success) {
      error = 'There was an error trying to submit. Please try again at a later time'
      onResult('error');
    }

    if(responseMessage.success) {
      resetForm();
      // notification that they submitted the form
      onResult('success');
    }
  }

  let monthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]

  // google autocomplete stuff
  function handleInput() {
    clearTimeout(debounceTimeout);
    location = locationQuery

    debounceTimeout = window.setTimeout(async () => {
      if (locationQuery.length < 1) {
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

  const availableDates = [
    { label: 'March 23, 2026 (Monday) ', value: '03/23/2026' },
  ]
</script>


<div
  class={`w-full flex flex-col items-center justify-center h-full gap-y-4 rounded-lg`}
>
  <div class="w-full">
    <form onsubmit={submit} class="flex flex-col gap-3">
      {#if error}
        <p transition:slide={{ duration: 200 }} class="text-xs text-red-400">{error}</p>
      {/if}

      <input type="hidden" name="email" value={email} />

      <div class="flex flex-col sm:flex-row gap-4">
        <label for="parentName" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px">Parent Name <span class="text-red-400">*</span></span>
          <input
            required
            id="parentName"
            name="parentName"
            type="text"
            placeholder="Jane Doe"
            bind:value={parentName}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>

        <label for="phone" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px]">Phone <span class="text-red-400">*</span></span>
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
        <label for="childName" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px">Child(s) Name <span class="text-red-400">*</span></span>
          <input
            required
            id="childName"
            name="childName"
            type="text"
            placeholder="Child(s) Name"
            bind:value={childName}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>


        <label for="birthDate" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px]">Child's Date of Birth <span class="text-red-400">*</span></span>
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

      <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
        <label for="hearAboutUs" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px]">How did you hear about us? <span class="text-red-400">*</span></span>
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


      <div class="relative">
        <label class="block text-sm font-semibold text-gray-800">
          <span class="pl-[2px]">Where do you live? <span class="text-red-400">*</span></span>

          <input
            required
            type="text"
            placeholder="City or address"
            bind:value={locationQuery}
            oninput={handleInput}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />

          <input type="hidden" name="location" value={location} />

          {#if suggestions.length}
            <ul class="absolute top-14 mt-1 border rounded-md bg-white shadow-lg max-h-60 overflow-auto">
              {#each suggestions as suggestion}
                <button class="w-full" onclick={() => selectSuggestion(suggestion)}>
                  <li class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-left">
                    {suggestion.placePrediction.text.text}
                  </li>
                </button>
              {/each}
            </ul>
          {/if}
        </label>
      </div>

      <div class="flex flex-col gap-y-2">
        <p class="text-sm font-semibold text-gray-800">
          Have you noticed any of the following in your child? <span class="text-gray-400 font-normal">(select all that apply)</span>
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {#each sensoryObservations as obs}
            <label class="flex items-center gap-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="observations"
                value={obs.value}
                class="accent-[#85c0c0]"
              />
              {obs.label}
            </label>
          {/each}
        </div>
      </div>

      <div>        
        <label for="message" class="block text-sm font-semibold text-gray-800"
          ><span class="pl-[2px]">Additional Info</span>
          <textarea
            rows="5"
            id="message"
            name="message"
            placeholder="Leave a short description of what you need help with."
            bind:value={message}
            class="mt-[2px] py-2 text-black px-2 !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          ></textarea>
        </label>
      </div>

      <div class="flex flex-col gap-y-4">
        <p class="text-sm text-gray-600">Do you consent to photos/videos of you and your child being taken during the tummy time group and give Tiny Tides Therapy
           permission to use them for educational materials, social media promotion, and community awareness?</p>
        <label for="consentToPic" class="text-sm font-semibold text-gray-800 flex gap-x-2 items-center"
          ><span class="pl-[2px]">Consent to Pictures</span>
          <input
            id="consentToPic"
            name="consentToPic"
            type="checkbox"
            bind:checked={consentToPic}
          />
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