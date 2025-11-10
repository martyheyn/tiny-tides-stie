<script lang="ts">
    let { chapters, chapIndx } = $props()

    let autoplay = $state(false)
    let incomplete = $state(true)
</script>

<div>
    <div class="bg-black rounded-sm overflow-hidden shadow-lg">
        <video controls controlslist="nodownload" class="w-full h-[72vh] object-cover">
            <track kind="captions">
        </video>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between mt-4 px-2">
        <div class="flex flex-col items-center">
            <button onclick={() => autoplay = !autoplay} aria-label="autoplay-switch">
                <svg
                    class={`cursor-pointer transition-all`}
                    width="60"
                    height="30"
                    viewBox="0 0 60 30"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="0"
                        y="0"
                        rx="15"
                        ry="15"
                        width="60"
                        height="30"
                        class={`${autoplay ? 'fill-green-300' : 'fill-gray-300'}`}
                    />
                    <circle
                        cx={`${autoplay ? '45' : '15'}`}
                        cy="15"
                        r="10"
                        fill="white"
                        class="transition-all duration-300"
                    />
                </svg>
            </button>
            <p class="text-xs">autoplay</p>
        </div>

        <div class="flex gap-x-8 h-full">
             {#if chapIndx && chapIndx !== 0}
                <a href={chapters && chapters.length > 0 && chapters[chapIndx - 1] && `${chapters[chapIndx - 1].slug}`} aria-label="prev-chapter-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" class={`cursor-pointer rotate-180 stroke stroke-black hover:scale-[1.10] transition-all duration-300 ease-out`} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                </a>
            {/if}

             {#if chapIndx && chapIndx !== chapters.length - 1}
                <a href={`${chapters[chapIndx + 1].slug}`} aria-label="next-chapter-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" class={`cursor-pointer stroke stroke-black hover:scale-[1.10] transition-all duration-300 ease-out`} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                </a>
            {/if}
        </div>

        <div class="w-16 flex flex-col items-center">
            <button onclick={() => incomplete = !incomplete} class="w-full cursor-pointer flex justify-center" aria-label="incomplete-btn">
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 60 60"
                    class=""
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                    cx="30"
                    cy="30"
                    r="25"
                    class={`stroke-[4px] ${incomplete ? 'fill-transparent stroke-slate-300' : 'fill-green-300/40 stroke-green-300'} hover:stroke-[5px] transition-all duration-300 ease-out`}
                    />
                </svg>
            </button>
            <p class="text-xs transition-all ease-in-out duration-300">{incomplete ? 'incomplete' : 'complete'}</p>
        </div>
    </div>
</div>