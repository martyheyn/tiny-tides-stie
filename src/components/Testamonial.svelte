<script lang="ts">
  let { userName, link, children } = $props();
</script>

<a href={link} target="_blank">
  <div class="google-border cursor-pointer hover:shadow-xl transition-transform duration-300 ease-in-out">
    <div
      class={`flex flex-row w-[390px] md:w-[400px] h-[365px] bg-primary rounded-lg gap-x-2 p-4 relative`}
    >
      <div class="mt-1.5 hidden md:block transition-all duration-300 ease-in-out">
        <div
          class="w-10 h-10 bg-green-600 rounded-full flex justify-center items-center"
        >
          <p class="text-white">{userName.charAt(0).toUpperCase()}</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-[2px] justify-start">
        <h4 class="font-bold text-lg">{userName}</h4>
        <div class="flex flex-row gap-x-2 my-1 items-center">
          <span>
            <span
              style="clip-path: polygon(6px 0, 4.31px 3.98px, 0 4.34px, 3.28px 7.18px, 2.29px 11.4px, 6px 9.16px, 9.71px 11.4px, 8.72px 7.18px, 12px 4.34px, 7.69px 3.98px, 6px 0, 20px 0, 18.31px 3.98px, 14px 4.34px, 17.28px 7.18px, 16.29px 11.4px, 20px 9.16px, 23.71px 11.4px, 22.72px 7.18px, 26px 4.34px, 21.69px 3.98px, 20px 0, 34px 0, 32.31px 3.98px, 28px 4.34px, 31.28px 7.18px, 30.29px 11.4px, 34px 9.16px, 37.71px 11.4px, 36.72px 7.18px, 40px 4.34px, 35.69px 3.98px, 34px 0, 48px 0, 46.31px 3.98px, 42px 4.34px, 45.28px 7.18px, 44.29px 11.4px, 48px 9.16px, 51.71px 11.4px, 50.72px 7.18px, 54px 4.34px, 49.69px 3.98px, 48px 0, 62px 0, 60.31px 3.98px, 56px 4.34px, 59.28px 7.18px, 58.29px 11.4px, 62px 9.16px, 65.71px 11.4px, 64.72px 7.18px, 68px 4.34px, 63.69px 3.98px, 62px 0);"
              class="inline-block w-[70px] h-3 text-yellow-400 bg-yellow-400"
            ></span>
          </span>
        </div>
        <div class="mt-1 overflow-hidden">
          {@render children()}
        </div>
        <div class="absolute bottom-0 right-0 h-12 w-full bg-primary blur-md">
        </div>
      </div>
    </div>
  </div>
</a>

<style>
  .google-border {
    border-radius: 0.5rem; /* match rounded-lg */
    border: 2px solid transparent;
    background:
      linear-gradient(#111827, #111827) padding-box, /* inner background */
      linear-gradient(270deg, #4285f4, #34a853, #fbbc05, #ea4335, #4285f4) border-box; /* rainbow border */
    background-size: 400% 400%; /* allows animation room */
    transition: background-position 0.5s ease, transform 0.3s ease;
  }

  .google-border:hover {
    background-position: 100% 0; /* shift gradient */
    transform: scale(1.01); /* optional scale-up */
    box-shadow: 0 4px 20px rgba(0,0,0,0.15); /* subtle hover shadow */
  }

  @media screen and (max-width: 768px) {
    .google-border:hover {
      background-position: 100% 0; /* shift gradient */
      transform: scale(1.004); /* optional scale-up */
      box-shadow: 0 4px 20px rgba(0,0,0,0.15); /* subtle hover shadow */
    }
  }
</style>
