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
  let email = $state("");
  let childName = $state("");
  let birthDate = $state("");
  let hearAboutUs = $state("");
  let hearAboutUsOther = $state("");
  let locationQuery = $state("");
  let location = $state("");
  let message = $state("");
  let allergies = $state("");
  let consentToPic = $state(false);
  let consentToCaregiver = $state(false);

  let suggestions: GoogleAutoompleteSuggestion[] = $state([]);
  let debounceTimeout: number;

  const resetForm = () => {
    parentName = "";
    phone = "";
    email = "";
    childName = "";
    birthDate = "";
    hearAboutUs = "";
    hearAboutUsOther = "";
    location = "";
    message = "";
    allergies = "";
    consentToPic = false;
    consentToCaregiver = false;
  };

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Save form data to localStorage before redirecting to Stripe
    const formObj: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (formObj[key]) {
        // handle multiple values (like checkboxes)
        formObj[key] = [...(Array.isArray(formObj[key]) ? formObj[key] : [formObj[key]]), value];
      } else {
        formObj[key] = value;
      }
    });
    
    localStorage.setItem('sensory_form_data', JSON.stringify(formObj));
    
    const stripeUrl = new URL('https://buy.stripe.com/28E28s61Jbbff6v4487N602');
    stripeUrl.searchParams.set('prefilled_email', formObj.email);
    window.location.href = stripeUrl.toString();
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
        <label for="email" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px]">Email <span class="text-red-400">*</span></span>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="janedoe@gmail.com"
            bind:value={email}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>

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
            placeholder="Anything else you would like us to know?"
            bind:value={message}
            class="mt-[2px] py-2 text-black px-2 !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          ></textarea>
        </label>
      </div>

      <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
        <label for="allergies" class="block text-sm font-semibold text-gray-800 flex-1"
          ><span class="pl-[2px">Does your child have any Allergies</span>
          <input
            required
            id="allergies"
            name="allergies"
            type="text"
            placeholder="peanut, gluten, nut, etc."
            bind:value={allergies}
            class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"
          />
        </label>
      </div>


      <div class="flex flex-col gap-y-2">
        <p class="text-sm text-gray-600">Do you consent to photos/videos of you and your child being taken during the tummy time group and give Tiny Tides Therapy
          permission to use them for educational materials, social media promotion, and community awareness? <span class="text-red-400">*</span></p>
        <div class="flex flex-col gap-y-1">
          <label class="text-sm font-semibold text-gray-800 flex gap-x-2 items-center cursor-pointer">
            <input
              required
              type="radio"
              name="consentToPic"
              value="yes"
              class="accent-[#85c0c0]"
            />
            <span>Yes, I consent to photos/videos</span>
          </label>
          <label class="text-sm font-semibold text-gray-800 flex gap-x-2 items-center cursor-pointer">
            <input
              type="radio"
              name="consentToPic"
              value="no"
              class="accent-[#85c0c0]"
            />
            <span>No, I do not consent to photos/videos</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-y-4">
        <p class="text-sm text-gray-600">Caregiver Presence Policy: <br/>
          Sensory Playtime is not a drop-off or babysitting service. A caregiver must remain present with their child for the entire session 
          and is responsible for their child's safety and supervision at all times. <span class="text-red-400">*</span></p>
        <label for="consentToCaregiver" class="text-sm font-semibold text-gray-800 flex gap-x-2 items-center">
          <span class="pl-[2px]">Caregiver Consent</span>
          <input
            required
            id="consentToCaregiver"
            name="consentToCaregiver"
            type="checkbox"
            bind:checked={consentToCaregiver}
          />
        </label>
      </div>

      <div class="flex flex-col gap-y-2 px-2 border-t border-black/20 pt-2">
        <p class="text-sm text-black font-bold text-left ">
          After clicking below you will be directed to our secure payment page. 
          Your registration will only be completed once payment is successful.
        </p>
        <div class="flex justify-center sm:justify-end items-center">
          <button
            class="bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white"
            type="submit"
          >
            Proceed to Payment →
          </button>
        </div>
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