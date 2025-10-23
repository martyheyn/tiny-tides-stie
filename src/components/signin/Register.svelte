<script lang="ts">
  let { value = $bindable() } = $props()
  let email = $state('');
  let password = $state('');

  function handleSubmit(event: Event) {
    event.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);

  }
$inspect("form in child", value)

</script>

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
        Already have an account?
    </p>
    <button onclick={() => value = "login"} class="text-blue-700 hover:text-blue-500 hover:scale-[1.03] transition-all ease-in-out duration-300">
        Login
    </button>
</div>