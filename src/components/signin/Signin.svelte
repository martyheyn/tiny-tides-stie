<script lang="ts">
    import { onMount } from "svelte";
    import Notification from "../Notification.svelte";

    // Matches EMAIL_COOLDOWN_MS in /api/auth/magiclink
    const RESEND_COOLDOWN_SECONDS = 60;
    // Supabase's email OTP length is a project setting (6–10); accept the
    // full range so the UI doesn't break if it changes.
    const OTP_MAX_LENGTH = 10;

    let email = $state('');
    let code = $state('');
    let step: 'email' | 'code' = $state('email');
    let resendSecondsLeft = $state(0);
    let resendTimer: ReturnType<typeof setInterval> | undefined;

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

    // /auth/callback and /auth/confirm send people back here with
    // ?auth_error=... when an emailed link fails (opened in another browser,
    // already used, expired). Explain it and pop the sign-in modal open
    // instead of leaving them on a page that just looks logged out.
    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('auth_error') !== 'link_expired') return () => clearInterval(resendTimer);

        mLNotification.message = 'That sign-in link expired or was opened in a different browser. Enter your email and we\'ll send you a sign-in code instead.';
        mLNotification.type = 'warning';

        const modal = document.getElementById('signin-dialog') as HTMLDialogElement | null;
        if (modal && !modal.open) modal.showModal();

        params.delete('auth_error');
        const query = params.toString();
        window.history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : ''));

        return () => clearInterval(resendTimer);
    });

    const startResendCooldown = () => {
        clearInterval(resendTimer);
        resendSecondsLeft = RESEND_COOLDOWN_SECONDS;
        resendTimer = setInterval(() => {
            resendSecondsLeft -= 1;
            if (resendSecondsLeft <= 0) clearInterval(resendTimer);
        }, 1000);
    };

    const sendCode = async (e?: Event) => {
        e?.preventDefault();
        loading = true;
        mLNotification.message = '';

        try {
            const res = await fetch("/api/auth/magiclink", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
            if(!res.ok) {
                mLNotification.message = res.status === 429
                    ? await res.text()
                    : 'Code not sent. Please try again later';
                mLNotification.type = 'error'
                return
            }

            step = 'code';
            code = '';
            startResendCooldown();
            mLNotification.message = '';
            mLNotification.type = ''
        } catch (err: any) {
            mLNotification.message = err.message;
            mLNotification.type = 'error'
        } finally {
            loading = false;
        }
    }

    const verifyCode = async (e: Event) => {
        e.preventDefault();
        loading = true;
        mLNotification.message = '';

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                body: JSON.stringify({ email, token: code }),
            });
            if (!res.ok) {
                mLNotification.message = await res.text();
                mLNotification.type = 'error'
                loading = false;
                return
            }

            // Session cookies were set on the response; reload so the server
            // renders the page (purchase state, nav) as a signed-in user.
            window.location.reload();
        } catch (err: any) {
            mLNotification.message = err.message;
            mLNotification.type = 'error'
            loading = false;
        }
    }

    const useDifferentEmail = () => {
        step = 'email';
        code = '';
        mLNotification.message = '';
        mLNotification.type = '';
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

<!-- Text uses <div>/<span> rather than <p>: the global `p { text-lg }` rule
     in global.css overrides Tailwind text-size utilities on <p> elements. -->
<div class="h-full flex justify-center items-center">
    <div class="w-full max-w-sm flex flex-col gap-y-6">
        <div class="flex flex-col items-center text-center gap-y-2">
            <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-16 mb-2">
            <h2 class="text-2xl font-semibold">Login</h2>
            {#if step === 'email'}
                <div class="text-sm text-slate-600">Enter your email and we'll send you a sign-in code.</div>
            {:else}
                <div class="text-sm text-slate-600">
                    We emailed a code to <span class="font-semibold text-slate-800 break-all">{email}</span>
                </div>
            {/if}
        </div>

        {#if step === 'email'}
        <form method="POST" onsubmit={sendCode} class="w-full flex flex-col gap-y-4">
            <div class="flex flex-col gap-y-1.5">
                <label for="email" class="text-sm font-medium text-slate-700">Email address</label>
                <input
                    id="email"
                    type="email"
                    autocomplete="email"
                    bind:value={email}
                    required
                    class="appearance-none block w-full px-3 py-2.5 border border-slate-300 text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                />
            </div>

            <button class="w-full flex justify-center items-center gap-x-2 bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2.5 transition-all duration-300 ease-in-out rounded-md text-white text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                {#if loading}
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"></path>
                        </svg>
                    Sending…
                {:else}
                    Send code
                {/if}
            </button>

            {#if mLNotification.message}
                <Notification message={mLNotification.message} type={mLNotification.type} />
            {/if}
        </form>
        {:else}
        <form method="POST" onsubmit={verifyCode} class="w-full flex flex-col gap-y-4">
            <div class="flex flex-col gap-y-1.5">
                <label for="otp-code" class="text-sm font-medium text-slate-700">Sign-in code</label>
                <input
                    id="otp-code"
                    type="text"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    pattern="[0-9 ]*"
                    maxlength={OTP_MAX_LENGTH}
                    bind:value={code}
                    required
                    class="appearance-none block w-full px-3 py-2.5 border border-slate-300 text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out text-2xl text-center tracking-[0.3em]"
                    placeholder="••••••"
                />
            </div>

            <button class="w-full flex justify-center items-center gap-x-2 bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2.5 transition-all duration-300 ease-in-out rounded-md text-white text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                {#if loading}
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"></path>
                        </svg>
                    Verifying…
                {:else}
                    Sign in
                {/if}
            </button>

            {#if mLNotification.message}
                <Notification message={mLNotification.message} type={mLNotification.type} />
            {/if}

            <div class="flex flex-col items-center gap-y-2 pt-1 text-sm">
                <div class="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    <button
                        type="button"
                        class="underline text-slate-700 cursor-pointer disabled:text-slate-400 disabled:cursor-not-allowed disabled:no-underline"
                        onclick={() => sendCode()}
                        disabled={loading || resendSecondsLeft > 0}
                    >
                        {resendSecondsLeft > 0 ? `Resend code in ${resendSecondsLeft}s` : 'Resend code'}
                    </button>
                    <button
                        type="button"
                        class="underline text-slate-700 cursor-pointer"
                        onclick={useDifferentEmail}
                    >
                        Use a different email
                    </button>
                </div>
                <div class="text-xs text-slate-500 text-center">Don't see it? Check your spam or promotions folder.</div>
            </div>
        </form>
        {/if}

        <!-- Google OAuth is not enabled on the Supabase project yet (returns
             "provider is not enabled"). Hidden until that's set up so beta
             testers aren't offered a sign-in method that just errors out. -->
        <!--
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
        -->

    </div>
</div>
