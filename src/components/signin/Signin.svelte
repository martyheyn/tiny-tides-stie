<script lang="ts">
    import { createBrowserClient } from '@supabase/ssr'
    import { slide } from "svelte/transition"

    const supabase = createBrowserClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_KEY
    )


    let { url } = $props();

    let email = $state('');

    let loading = $state(false);
    let errorMessage = $state('');
    let infoMessage = $state('');

    const reset = () => {
        email = '';
    }

    const sendMagicLink = async (e: Event) => {
        e.preventDefault();
        loading = true;

        try {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                // stripe link
                emailRedirectTo: `${window.location.origin}${url}`
            }
        });

        if (error) {
            errorMessage = error.message;
            throw error
        };

        infoMessage = 'Magic link sent! Check your email to log in.';
        } catch (err: any) {
            errorMessage = err.message;
        } finally {
            loading = false;
            reset()
        }
    }

    const signInWithGoogle = async () => {
        loading = true;

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}${url}`,
                }
            });

            if (error) throw error;
            // Redirect handled automatically by Supabase
            // could do popup but nah
        } catch (err: any) {
            console.log("error", err)
            errorMessage = err.message;
            loading = false;
        }
    }
</script>

<div class="h-full flex justify-center items-center">
    <div class="w-full flex flex-col gap-y-2 items-start mb-8">
        <div class="w-full flex flex-col justify-center text-center gap-y-1">
            <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-20 mb-4">
            <p class="text-[14px] text-slate-700">You must have an authenticate via email to take classes</p>
            <h2 class="text-2xl font-semibold pb-2">Login</h2>
        </div>

        <p class="font-semibold text-[16px] text-slate-700 p-0 text-left">With magic email link</p>
        <form method="POST" onsubmit={sendMagicLink} class="space-y-4 w-full">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700/80">Email address</label>
                <div class="mt-1">
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    required
                    class="appearance-none block w-full px-3 py-2 border mt-[2px] text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                />
                </div>
            </div>

            
            <div class="flex flex-col gap-y-3">
                <button
                    class={`w-fit bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white`}
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>

        <div class="w-full h-[2px] bg-black/10 my-4"></div>
        
        <p class="font-semibold text-[16px] text-slate-700 p-0 text-left">or with gmail account</p>
        <div class="space-y-4 w-full">
            <button onclick={signInWithGoogle} class="w-full flex gap-x-2 items-center text-left bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-4 py-2.5 transition-all duration-300 ease-in-out rounded-md text-white text-[16px]">
                <svg class="bg-white rounded-full p-[1px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Signin in with Gmail account
            </button>
        </div>

        {#if errorMessage}
            <p transition:slide={{ duration: 200 }} class="px-4 py-3 text-base bg-red-600/80 text-white rounded-md">{errorMessage}</p>
        {/if}

        {#if infoMessage}
            <p transition:slide={{ duration: 200 }} class="px-4 py-3 text-base bg-green-600/80 text-white rounded-md">{infoMessage}</p>
        {/if}


    </div>
</div>
