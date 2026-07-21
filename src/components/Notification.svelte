<script lang="ts">
    import { slide } from "svelte/transition"

    let { message, type }: { message: string; type: 'error' | 'success' | 'warning' | '' } = $props()
</script>

<div>
    <p 
        transition:slide={{ duration: 200 }} 
        class={`w-fit px-4 py-3 text-base text-white rounded-md ${type === 'error' ? 'bg-red-600/80' : 'bg-green-600/80'} hover:scale-[1.005]`}
    >
        {message}
    </p>
</div>