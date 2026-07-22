<script lang="ts">
    import Notification from "../Notification.svelte";

    let email = $state('');

    let loading = $state(false);
    let mLNotification: {
        message: string;
        type: 'error' | 'success' | 'warning' | '';
    } = $state({
        message: '',
        type: ''
    });

    let gmailNotification: {
        message: string;
        type: 'error' | 'success' | 'warning' | '';
    } = $state({
        message: '',
        type: ''
    });

    const reset = () => {
        email = '';
    }

    const sendMagicLink = async (e: Event) => {
        e.preventDefault();
        loading = true;

        try {
            const res = await fetch("/api/auth/magiclink", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
            if(!res.ok) {
                mLNotification.message = 'Magic Link not sent. Please try again later';
                mLNotification.type = 'error'
                return
            }

            mLNotification.message = 'Email link sent! Check your email to log in.';
            mLNotification.type = 'success'
        } catch (err: any) {
            mLNotification.message = err.message;
            mLNotification.type = 'error'
        } finally {
            loading = false;
            reset()
        }
    }

    const signInWithGoogle = async () => {
        loading = true;

        try {
            window.location.href = `/api/auth/oauth?provider=google`
        } catch (err: any) {
            console.log("error", err)
            gmailNotification.message = err.message;
            gmailNotification.type = 'error'
            loading = false;
        }
    }
</script>

<div class="h-full flex justify-center items-center">
    <div class="w-full flex flex-col gap-y-2 items-start mb-8">
        <div class="w-full flex flex-col justify-center text-center gap-y-1">
            <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-20 mb-4">
            <p class="text-sm text-slate-700">You must have an authenticate via email to take classes</p>
            <h2 class="text-2xl font-semibold pb-2">Login</h2>
        </div>

        <p class="font-semibold text-base text-slate-700 p-0 text-left">With email link</p>
        <form method="POST" onsubmit={sendMagicLink} class="space-y-4 w-full">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700/80">Email address</label>
                <div class="mt-1">
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    required
                    class="appearance-none block w-full px-3 py-2 border mt-0.5 text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out"
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

            {#if mLNotification.message}
                <Notification message={mLNotification.message} type={mLNotification.type} />
            {/if}

        </form>

        <div class="w-full h-0.5 bg-black/10 my-4"></div>
        
        <p class="font-semibold text-base text-slate-700 p-0 text-left">or with gmail account</p>
        <div class="space-y-4 w-full">
            <button onclick={signInWithGoogle} class="w-full flex gap-x-2 items-center text-left bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-4 py-2.5 transition-all duration-300 ease-in-out rounded-md text-white text-base">
                <svg class="bg-white rounded-full p-px" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Gmail account
            </button>
        </div>

        {#if gmailNotification.message}
            <Notification message={gmailNotification.message} type={gmailNotification.type} />
        {/if}


    </div>
</div>
