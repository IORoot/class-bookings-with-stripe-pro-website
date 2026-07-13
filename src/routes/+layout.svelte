<script lang="ts">
	import '../app.css';
	import Grain from '$lib/components/Grain.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StripeTestBanner from '$lib/components/StripeTestBanner.svelte';

	let { children } = $props();
</script>

<Grain />
<div class="relative z-10 flex min-h-dvh flex-col">
	<StripeTestBanner />
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
