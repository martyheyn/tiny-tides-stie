<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { createBrowserClient } from '@supabase/ssr'
    let { chapters, chapIndx, videoId, user, length, courseSlug } = $props()

    const supabase = createBrowserClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_KEY
    )

    let autoplay = $state(false)
    let completed = $state(false)
    let videoUrl = $state('')
    let videoProgressId = $state('')
    let videoEl: HTMLVideoElement | null = null;

    // --- Progress tracking state ---
    let lastSavedProgress = $state(0); // seconds
    let loadedInitialProgress = $state(false);

    async function saveProgress(progress: number) {
        if (!user || !videoId) return;

        const delta = progress - lastSavedProgress;

        // Only save if progress increased at least 10 seconds
        if (delta > 10) {
            lastSavedProgress = progress;

            if(videoProgressId) {
                if(progress / length > .90) {
                    completed = true

                    await supabase
                    .from('video_progress')
                    .upsert({
                        id: videoProgressId,
                        user_id: user.id,
                        video_id: videoId,
                        progress_seconds: Math.floor(progress),
                        completed: true
                    });
                    return
                } 

                await supabase
                    .from('video_progress')
                    .upsert({
                        id: videoProgressId,
                        user_id: user.id,
                        video_id: videoId,
                        progress_seconds: Math.floor(progress)
                    });

                return
            } 
            
            const { data: progressRow } = await supabase
                .from('video_progress')
                .upsert({
                    user_id: user.id,
                    video_id: videoId,
                    progress_seconds: Math.floor(progress)
                })
                .select("id")
                .single();

            videoProgressId = progressRow?.id
        }
    }

    function onTimeUpdate(e: Event) {
        const currentTime = (e.target as HTMLVideoElement).currentTime;
        saveProgress(currentTime);
    }

    async function onVideoEnded() {
        if (!user || !videoId) return;

        if (videoProgressId) {
        await supabase
            .from('video_progress')
            .upsert({
                id: videoProgressId,
                user_id: user.id,
                video_id: videoId,
                progress_seconds: Math.floor(length),
                completed: true
            });

            completed = true;
        }

        // no autoplay? stop here
        if (!autoplay || !chapters) return;

        const chapter = chapters[chapIndx];
        if (!chapter) return;

        const videos = chapter.videos || [];
        const vidIndex = videos.findIndex((v: any) => v.id === videoId);

        // 🟦 CASE 1: go to next video in the same chapter
        if (vidIndex !== -1 && vidIndex < videos.length - 1) {
            const nextVideo = videos[vidIndex + 1];
            window.location.href = `/courses/${courseSlug}/${chapter.slug}/${nextVideo.slug}`;
            return;
        }

        // 🟧 CASE 2: go to first video of next chapter
        const nextChapter = chapters[chapIndx + 1];
        if (nextChapter && nextChapter.videos && nextChapter.videos.length > 0) {
            const firstVid = nextChapter.videos[0];
            window.location.href = `/courses/${courseSlug}/${nextChapter.slug}/${firstVid.slug}`;
            return;
        }

        // 🟥 CASE 3: last video of last chapter
        // (you choose what to do here)
        console.log("Reached end of course!");
    }

    // Save on tab close, page reload, or navigation
    function saveBeforeUnload() {
        if (videoEl) {
            saveProgress(videoEl.currentTime);
        }
    }

    let cleanup = () => {};

    onMount(async () => {
        const saved = localStorage.getItem("autoplay");
        if (saved !== null) {
            autoplay = saved === "true";
        }
        
        if (!videoId || !user) return;

        // Fetch secure CloudFront signed URL
        const res = await fetch(`/api/video-url?videoId=${videoId}`, {
            credentials: 'include'
        });
        const data = await res.json();
        console.log("data", data)
        videoUrl = data.url;

        // Fetch last progress to resume
        const { data: progressRow } = await supabase
            .from('video_progress')
            .select('id, progress_seconds, completed')
            .eq('video_id', videoId)
            .eq('user_id', user.id)
            .maybeSingle();

        if (progressRow && videoEl) {
            videoProgressId = progressRow.id
            completed = progressRow.completed
            // Set progress after video metadata loads
            videoEl.onloadedmetadata = () => {
                if (!loadedInitialProgress && videoEl) {
                    videoEl.currentTime = progressRow.progress_seconds;
                    loadedInitialProgress = true;
                }
            };
        }

        // Save progress when user leaves
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', saveBeforeUnload);

            cleanup = () => {
                saveBeforeUnload();
                window.removeEventListener('beforeunload', saveBeforeUnload);
            };
        }
    });

    onDestroy(() => {
        cleanup();
    });

    // Watch + persist whenever autoplay changes
    $effect(() => {
        localStorage.setItem("autoplay", autoplay.toString());
    })
</script>

<div>
    <div class="bg-black rounded-sm overflow-hidden shadow-lg relative">
        <video 
            bind:this={videoEl}
            src={videoUrl || null}
            controls controlslist="nodownload"
            class="w-full h-[68vh] object-cover"
            ontimeupdate={onTimeUpdate}
            onended={onVideoEnded}
        >
            <track kind="captions">
        </video>

        {#if !user}
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#e9da10" d="M101.946 53.087h-75.88a3.903 3.903 0 0 0-3.891 3.891v64.207a3.903 3.903 0 0 0 3.891 3.891h75.881a3.903 3.903 0 0 0 3.891-3.891V56.978a3.904 3.904 0 0 0-3.892-3.891zM68.928 93.673v13.094h-7.374V93.673c-3.541-1.44-6.051-4.922-6.051-8.989 0-5.37 4.358-9.728 9.728-9.728s9.728 4.358 9.728 9.728a9.69 9.69 0 0 1-6.031 8.989z"/><path style="fill:#1d252c" d="M101.94 50.173h-7.25v-19.49C94.69 13.764 80.926 0 63.994 0 47.074 0 33.31 13.764 33.31 30.683v19.49h-7.25a6.818 6.818 0 0 0-6.81 6.81v64.207a6.818 6.818 0 0 0 6.81 6.81h75.881a6.818 6.818 0 0 0 6.81-6.81V56.983c-.001-3.754-3.056-6.81-6.811-6.81zm-62.793-19.49c0-13.7 11.146-24.846 24.858-24.846 13.701 0 24.847 11.146 24.847 24.846v19.49H39.147v-19.49zm63.766 90.507a.985.985 0 0 1-.973.973H26.06a.985.985 0 0 1-.973-.973V56.983c0-.527.445-.973.973-.973h75.881c.528 0 .973.446.973.973v64.207zM65.231 73.01c-6.437 0-11.674 5.237-11.674 11.674 0 4.309 2.335 8.189 6.052 10.217v11.868c0 1.075.87 1.946 1.946 1.946h7.374c1.075 0 1.946-.87 1.946-1.946V94.901c3.703-2.025 6.031-5.904 6.031-10.217-.001-6.437-5.237-11.674-11.675-11.674zm2.964 18.861a1.944 1.944 0 0 0-1.212 1.802v11.15H63.5v-11.15c0-.792-.479-1.504-1.212-1.802a7.73 7.73 0 0 1-4.839-7.187c0-4.291 3.49-7.783 7.783-7.783 4.292 0 7.783 3.491 7.783 7.783a7.722 7.722 0 0 1-4.82 7.187z"/></svg>
            </div>
        {/if}
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
             {#if chapIndx !== null && chapIndx !== 0}
                <a href={chapters && chapters.length > 0 && chapters[chapIndx - 1] && `${chapters[chapIndx - 1].slug}`} aria-label="prev-chapter-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" class={`cursor-pointer rotate-180 stroke stroke-black hover:scale-[1.10] transition-all duration-300 ease-out`} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                </a>
            {/if}

             {#if chapIndx !== null && chapIndx !== chapters.length - 1}
                <a href={chapters && chapters.length > 0 && chapters[chapIndx - 1] && `${chapIndx && chapters[chapIndx + 1].slug}`} aria-label="next-chapter-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24" class={`cursor-pointer stroke stroke-black hover:scale-[1.10] transition-all duration-300 ease-out`} xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                </a>
            {/if}
        </div>

        <div class="w-16 flex flex-col items-center">
            <button onclick={() => completed = !completed} class="w-full cursor-pointer flex justify-center" aria-label="completed-btn">
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 60 60"
                    class="transition-all duration-500 ease-out"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="30"
                        cy="30"
                        r="25"
                        class="
                            transition-all duration-500 ease-out
                            origin-center
                            ${completed
                                ? 'stroke-green-400 fill-green-300 scale-[1.12]'
                                : 'stroke-slate-300 fill-transparent scale-100'}
                        "
                        style="
                            stroke-width: 4;
                            transform-origin: center;
                        "
                    />
                </svg>
            </button>
            <p class="text-xs transition-all ease-in-out duration-300">{!completed ? 'incomplete' : 'complete'}</p>
        </div>
    </div>
</div>