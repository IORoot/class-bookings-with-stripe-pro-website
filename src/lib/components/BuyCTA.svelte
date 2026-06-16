<script lang="ts">
	import { site } from '$lib/config';

	let { compact = false }: { compact?: boolean } = $props();
</script>

<div
	class="block-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between {compact
		? ''
		: 'p-8'}"
>
	<div>
		<p class="text-display text-3xl sm:text-4xl">{site.price}</p>
		<p class="mt-1 text-sm text-muted">{site.priceNote}</p>
	</div>
	<div class="flex flex-col gap-2 sm:flex-row">
		<a href={site.stripePaymentLink} class="btn-primary">Buy Pro</a>
		<a href={site.stripeRenewalLink} class="btn-secondary">Renew licence</a>
	</div>
</div>
