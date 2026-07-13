<script lang="ts">
	import type { Snippet } from 'svelte';
	import { site, isStripeCheckoutUrl } from '$lib/config';

	let {
		class: className = 'btn-primary',
		kind = 'purchase',
		children
	}: {
		class?: string;
		kind?: 'purchase' | 'renewal';
		children: Snippet;
	} = $props();

	const href = $derived(kind === 'renewal' ? site.stripeRenewalLink : site.stripePaymentLink);
	const configured = $derived(isStripeCheckoutUrl(href));
</script>

{#if configured}
	<a {href} class={className} rel="noopener noreferrer">
		{@render children()}
	</a>
{:else}
	<span
		class="{className} cursor-not-allowed opacity-60"
		title="Configure STRIPE_PAYMENT_LINK_TEST/LIVE for the current STRIPE_MODE (server) or use netlify dev."
	>
		{@render children()}
	</span>
{/if}
