<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from "svelte/transition"
    import { createBrowserClient } from '@supabase/ssr'

    let { user } = $props()

    const supabase = createBrowserClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_KEY
    )

    let full_name = $state('');
    let avatar_url = $state('');
    let photo_key = $state('');
    let loading = $state(false);
    let saving = $state(false);
    let error = $state('');
    let success = $state(false);

    onMount(async () => {
        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();
        
          full_name = profile?.full_name || ''
          avatar_url = profile?.avatar_url || ''

        if (profileError) {
          error = profileError.message;
        } else if (profile) {
          full_name = profile.full_name || '';
          avatar_url = profile.avatar_url || '';
        }

        loading = false;
    })

    const updateProfile = async () => {
        if (!user) return;
        saving = true;
        error = '';

        const updates = {
            id: user.id,
            full_name,
            avatar_url,
            updated_at: new Date().toISOString(),
        };

        const { error: updateError } = await supabase
            .from('profile')
            .upsert(updates, { onConflict: 'id' });

        if (updateError) {
            error = updateError.message;
            saving = false;
            return
        }

        success = true
        saving = false;

        setTimeout(() => {
            success = false;
        }, 3000);
    }

    const onFileSelected = async (e: Event) => {
		let input = e.target as HTMLInputElement;
		let image = input.files?.[0];
		if (!image) return;

		const maxSize = parseInt(input.dataset.maxSize || '1048576', 10);
		// if (image.size > maxSize) {
		// 	alert.set({
		// 		text: 'File size is too large. Please upload a file less than 1MB',
		// 		alertType: 'error'
		// 	});
		// 	return;
		// }

		// avatar = image;
	};
</script>

{#if loading}
  <div class="flex justify-center py-12">Loading profile...</div>
{:else if error}
  <div class="text-center text-red-500 py-12">{error}</div>
{:else}
  <div class="flex flex-col items-center py-12 space-y-6">
    {#if avatar_url}
        <img
            src={avatar_url}
            alt="User avatar"
            class="w-28 h-28 rounded-full border shadow-sm object-cover"
        />
    {:else}
        <div class="w-28 h-28 rounded-full border shadow-sm relative overflow-hidden">
            <img
                src="https://dkbi9cj3nodif.cloudfront.net/blank_avatar.png"
                alt="User avatar"
                class="object-cover"
            />
            <label
                for="avatar"
                class="absolute -bottom-6 left-0 w-full h-1/2 bg-gray-300 bg-opacity-90 rounded-b-full
                        cursor-pointer opacity-0 group-hover:opacity-100 transition-all
                        duration-300 ease-in-out translate-y-4 group-hover:translate-y-0 z-20"
            >
                <div class="w-full h-full flex justify-center mt-1">
                    <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm0-22c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm2 14h-4v-1h4v1zm0 1v1h-4v-1h4zm-4-6h-4l6-6 6 6h-4v3h-4v-3z" />
                </div>
            </label>
            <input
                style="display:none"
                id="avatar"
                name="avatar"
                disabled={false}
                type="file"
                accept=".jpg, .jpeg, .png"
                data-max-size="1048576"
                onchange={(e) => onFileSelected(e)}
            />
            <input type="hidden" name="photoKey" id="photoKey" bind:value={photo_key} />
        </div>
    {/if}

    <div class="w-full max-w-md min-w-64 space-y-4">
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700/80">Full Name</label>
            <div class="mt-1">
            <input
                id="full_name"
                type="full_name"
                bind:value={full_name}
                required
                class="appearance-none block w-full px-3 py-2 border mt-[2px] text-black !bg-[#fcfeff] focus:outline-none focus:border-blue-300 rounded-md transition duration-150 ease-in-out"
                placeholder="Your Name"
            />
            </div>
        </div>
      
        <button
            onclick={updateProfile}
            disabled={!full_name}
            class={`w-full ${full_name ? 'bg-[#85c0c0] hover:bg-[#639696]' : 'bg-[#a3a3a3] cursor-none'} cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white`}
            type="submit"
        >
            {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {#if error || success}
            <p transition:slide={{ duration: 200 }} class={`text-xs ${error ? 'text-red-400' : 'text-green-400'}`}>{error ? error : success ? 'Profile has been updated' : ''}</p>
        {/if}

    </div>
  </div>
{/if}
