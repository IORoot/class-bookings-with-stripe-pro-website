<script lang="ts">
	import { onMount } from 'svelte';

	let mode = $state<'test' | 'live' | null>(null);

	onMount(async () => {
		try {
			const res = await fetch('/api/stripe-status');
			if (!res.ok) return;
			const data = (await res.json()) as { mode?: string };
			if (data.mode === 'test' || data.mode === 'live') mode = data.mode;
		} catch {
			/* local vite without netlify dev */
		}
	});
</script>

{#if mode === 'test'}
	<div
		class="border-b border-amber-500/30 bg-amber-500/15 px-4 py-2 text-center text-xs font-medium text-amber-200"
		role="status"
	>
		Stripe <strong>test mode</strong> — no real charges. Use card <code class="rounded bg-black/30 px-1">4242 4242 4242 4242</code>.
	</div>
{/if}
