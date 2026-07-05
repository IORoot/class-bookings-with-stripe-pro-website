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
		title="Set PUBLIC_STRIPE_PAYMENT_LINK in .env (local) or Netlify env vars, then restart or redeploy."
	>
		{@render children()}
	</span>
{/if}
