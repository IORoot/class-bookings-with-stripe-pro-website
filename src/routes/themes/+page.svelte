<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ThemeGallery from '$lib/components/ThemeGallery.svelte';
	import BuyCTA from '$lib/components/BuyCTA.svelte';
	import { getAllThemes, themesManifest } from '$lib/themes';

	const themes = getAllThemes();
</script>

<Seo
	title="Booking themes"
	description="Browse premium booking form themes, starter packs, and tutorials included with Class Bookings with Stripe Pro."
	path="/themes"
/>

<section class="px-5 py-16 md:py-20">
	<div class="mx-auto max-w-6xl">
		<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">Pro feature</p>
		<h1 class="text-display mt-2 text-5xl">Booking themes</h1>
		<p class="mt-4 max-w-3xl text-lg text-muted">
			Pro ships with production-ready form themes, utility starters, and a step-by-step tutorial series.
			Install any pack from the WordPress admin — or browse the source on GitHub.
		</p>

		<ThemeGallery themes={themes} repoUrl={themesManifest.repoUrl} syncedAt={themesManifest.syncedAt} />

		<div class="mt-14">
			<BuyCTA />
		</div>
	</div>
</section>
