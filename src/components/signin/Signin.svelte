<script lang="ts">
    import Login from './Login.svelte'
    import Register from './Register.svelte';

    let form = $state("login")
</script>

<div class="h-full flex justify-center items-center">
    {#if form === "login"}
        <div class="w-[50vh] border border-black/20 rounded-md px-6 pt-8 pb-4 flex flex-col gap-y-2 items-center mb-12">
            <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-20 mb-4">
            <h2 class="text-lg pb-2">Login</h2>
            <Login bind:value={form} />
        </div>
    {:else}
        <div class="w-[50vh] border border-black/20 rounded-md px-6 pt-8 pb-4 flex flex-col gap-y-2 items-center mb-12">
            <img src="https://dkbi9cj3nodif.cloudfront.net/logo.svg" alt="" class="h-20 mb-4">
            <h2 class="text-lg pb-2">Create Account</h2>
            <Register bind:value={form} />
        </div>
    {/if}
</div>