<script lang="ts">
    let form = $state("login")
    let email = $state('');
    let password = $state('');

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

    }

    const changeForm = () => {
        if(form === 'login') {
            form = 'register'
        } else if(form === 'register') {
            form = 'login'
        }
    }

</script>

<div class="h-full flex justify-center items-center">
    <div class="w-[50vh] border border-black/20 rounded-md px-6 pt-8 pb-4 flex flex-col gap-y-2 items-center mb-12">
        <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-20 mb-4">
        <h2 class="text-lg pb-2">{form === 'login' ? 'Login' : 'Create Account'}</h2>

        <form method="POST" onsubmit={handleSubmit} class="space-y-6 w-full">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
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

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1">
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    required
                    class="appearance-none block w-full px-3 py-2 border mt-[2px] text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out"
                    placeholder="••••••••"
                />
                </div>
            </div>

            <div class="flex flex-col gap-y-3">
                <button
                    class={`w-full bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white`}
                    type="submit"
                >
                    Submit
                </button>

                <!-- <div class="flex items-center justify-between">
                    <div class="text-xs">
                        <a href="/forgot-password" class="font-medium text-slate-600 hover:text-slate-900 hover:scale-[1.02]  transition-all duration-300 ease-in-out">
                            Forgot your password?
                        </a>
                    </div>
                </div> -->

                <hr>
            </div>
        </form>
        <div class="flex justify-between items-center text-sm w-full">
            <p class="text-sm">
                {form === 'login' ? "Don't have an account already?" : 'Already have an account?'}
            </p>
            <button onclick={changeForm} class="text-blue-700 hover:text-blue-500 hover:scale-[1.03] transition-all ease-in-out duration-300">
                {form === 'login' ? 'Create Account' : 'Login'}
            </button>
        </div>
    </div>
</div>
