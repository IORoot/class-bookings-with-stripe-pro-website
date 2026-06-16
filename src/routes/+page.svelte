<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BuyCTA from '$lib/components/BuyCTA.svelte';
	import ProBadge from '$lib/components/ProBadge.svelte';
	import { site } from '$lib/config';
	import { features, benefits } from '$lib/features';
	import { reveal, revealHero } from '$lib/actions/reveal';
</script>

<Seo title={site.name} description={site.description} path="/" />

<section class="relative px-5 pb-20 pt-16 md:pt-24" use:revealHero>
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal/20 blur-[100px]"></div>
		<div class="absolute -right-20 top-40 h-64 w-64 rounded-full bg-teal-deep/25 blur-[90px]"></div>
		<div
			class="absolute inset-0 opacity-[0.03]"
			style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-6xl">
		<div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
			<div>
				<p
					data-hero-item
					class="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-overlay/60 px-3 py-1 text-xs font-medium text-muted"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-teal-bright"></span>
					{site.author} · WordPress + Stripe
				</p>
				<h1 data-hero-item class="text-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
					{site.tagline}
				</h1>
				<p data-hero-item class="mt-6 max-w-xl text-lg text-muted">
					{site.description}
				</p>
				<div data-hero-item class="mt-8 flex flex-wrap gap-3">
					<a href={site.stripePaymentLink} class="btn-primary">Buy Pro — {site.price}</a>
					<a href="/details" class="btn-secondary">Compare with Free</a>
				</div>
				<ul data-hero-item class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
					{#each benefits as b}
						<li class="flex items-center gap-2">
							<span class="text-teal-bright">✓</span>
							{b}
						</li>
					{/each}
				</ul>
			</div>

			<div data-hero-item class="relative flex justify-center lg:justify-end">
				<div class="block-card relative w-full max-w-md p-8">
					<img src="/logo_plugin.svg" alt="" class="mx-auto w-40" width="160" height="134" />
					<p class="mt-6 text-center text-sm text-muted">
						Stripe Checkout · capacity-aware booking · emails & reports
					</p>
					<div class="mt-6 grid grid-cols-2 gap-2 text-center text-xs">
						<div class="rounded-lg bg-surface-overlay p-3 text-muted">Weekly classes</div>
						<div class="rounded-lg bg-surface-overlay p-3 text-muted">One-off events</div>
						<div class="rounded-lg bg-teal/10 p-3 text-teal-bright">
							<span class="inline-flex items-center justify-center gap-1.5">
								Appointments <ProBadge />
							</span>
						</div>
						<div class="rounded-lg bg-teal/10 p-3 text-teal-bright">
							<span class="inline-flex items-center justify-center gap-1.5">
								Themes <ProBadge />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="px-5 py-16">
	<div class="mx-auto max-w-6xl">
		<h2 use:reveal class="text-display text-4xl">Built for class businesses</h2>
		<p use:reveal class="mt-3 max-w-2xl text-muted">
			Everything you need to sell places on classes — from checkout to confirmation emails.
		</p>

		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f, i}
				<article
					use:reveal={{ delay: i * 0.04 }}
					class="block-card block-card-hover flex flex-col gap-3 p-6 {f.pro ? 'ring-1 ring-teal/20' : ''}"
				>
					<div class="flex items-center justify-between gap-2">
						<h3 class="text-lg font-semibold text-fg">{f.title}</h3>
						{#if f.pro}<ProBadge />{/if}
					</div>
					<p class="text-sm text-muted">{f.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="px-5 py-16">
	<div class="mx-auto max-w-3xl">
		<h2 use:reveal class="text-display mb-8 text-center text-4xl">Get Pro today</h2>
		<div use:reveal>
			<BuyCTA />
		</div>
		<p class="mt-6 text-center text-sm text-muted">
			Also available free on
			<a href={site.freePluginUrl} class="text-teal-bright hover:underline" rel="noopener"
				>WordPress.org</a
			>
			— Pro is a standalone product with advanced features.
		</p>
	</div>
</section>
