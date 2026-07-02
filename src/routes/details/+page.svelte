<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import FeatureSections from '$lib/components/FeatureSections.svelte';
	import BuyCTA from '$lib/components/BuyCTA.svelte';
	import { site } from '$lib/config';
	import { featureSections } from '$lib/detailFeatures';
	import { reveal } from '$lib/actions/reveal';
</script>

<Seo
	title="Free vs Pro"
	description="Compare Class Bookings with Stripe Free and Pro — appointments, scheduled emails, themes, reports, and more."
	path="/details"
/>

<section class="px-5 py-16 md:py-20">
	<div class="mx-auto max-w-6xl">
		<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">Details</p>
		<h1 class="text-display mt-2 text-5xl">Free vs Pro</h1>
		<p class="mt-4 max-w-2xl text-lg text-muted">
			Pro is a <strong class="text-fg">standalone</strong> plugin — you do not need the free version.
			The free plugin on WordPress.org is a lite alternative with shared core booking features.
		</p>

		<div class="mt-10">
			<ComparisonTable />
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-2">
			<div class="block-card p-6">
				<h2 class="text-lg font-semibold">Free plugin</h2>
				<p class="mt-2 text-sm text-muted">
					Stripe Checkout, weekly and one-off classes, emails, reports, shortcodes, Elementor
					widgets, and form extras — enough to run a studio without Pro-only extras.
				</p>
				<a
					href={site.freePluginUrl}
					class="btn-secondary mt-4 inline-flex"
					rel="noopener">View on WordPress.org</a
				>
			</div>
			<div class="block-card border-teal/20 p-6 ring-1 ring-teal/10">
				<h2 class="text-lg font-semibold text-teal-bright">Pro — {site.price}</h2>
				<p class="mt-2 text-sm text-muted">
					Everything in Free, plus appointments, scheduled reminders and post-class emails,
					booking themes with live preview, and one year of updates.
				</p>
				<a href={site.stripePaymentLink} class="btn-primary mt-4 inline-flex">Buy Pro</a>
			</div>
		</div>

		<div class="mt-20 md:mt-24">
			<div use:reveal class="max-w-2xl">
				<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">
					Full feature tour
				</p>
				<h2 class="text-display mt-2 text-4xl sm:text-5xl">Everything Pro can do</h2>
				<p class="mt-4 text-lg text-muted">
					From the first checkout to the follow-up email—here is how the plugin fits together for
					studios, instructors, and anyone selling bookable sessions on WordPress.
				</p>
			</div>

			<div class="mt-14">
				<FeatureSections sections={featureSections} />
			</div>
		</div>

		<div class="mt-20">
			<BuyCTA />
		</div>
	</div>
</section>
