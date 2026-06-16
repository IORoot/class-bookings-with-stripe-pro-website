<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/config';
</script>

<Seo title="Purchase cancelled" description="Your checkout was cancelled." path="/purchase/cancelled" />

<section class="px-5 py-20">
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-display text-4xl">Checkout cancelled</h1>
		<p class="mt-4 text-muted">No charge was made. You can return when you are ready.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href={site.stripePaymentLink} class="btn-primary">Buy Pro — {site.price}</a>
			<a href="/details" class="btn-secondary">Compare features</a>
		</div>
	</div>
</section>
