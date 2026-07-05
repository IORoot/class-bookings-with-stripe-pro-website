<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BuyCTA from '$lib/components/BuyCTA.svelte';
	import HeroVideo from '$lib/components/HeroVideo.svelte';
	import ClickableImage from '$lib/components/ClickableImage.svelte';
	import ProBadge from '$lib/components/ProBadge.svelte';
	import StripeBuyLink from '$lib/components/StripeBuyLink.svelte';
	import { site } from '$lib/config';
	import { features, benefits, mainFeatures, examples } from '$lib/features';
	import { reveal, revealHero } from '$lib/actions/reveal';
</script>

<Seo title={site.name} description={site.description} path="/" />

<section class="relative border-b border-border bg-black" use:revealHero>
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -left-32 top-20 h-200 w-200 rounded-full bg-teal/20 blur-[100px]"></div>
		<div class="absolute -right-20 top-40 h-200 w-200 rounded-full bg-teal-deep/25 blur-[90px]"></div>
		<div
			class="absolute inset-0 opacity-[0.03]"
			style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-[88rem]">
		<!-- Desktop: video spans header to section border -->
		<div
			class="pointer-events-none absolute inset-y-0 left-[48%] right-0 z-0 hidden lg:left-[46%] lg:block xl:left-[38%]"
		>
			<HeroVideo fill />
		</div>
 
		<div class="relative z-10 px-5 py-12 md:py-14 lg:max-w-[min(100%,40rem)] lg:py-16 xl:max-w-[42%]">
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
				<StripeBuyLink class="btn-primary">Buy Pro — {site.price}</StripeBuyLink>
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

		<!-- Mobile: video sits above the section border -->
		<div
			data-hero-item
			class="relative z-0 h-[min(52vh,24rem)] sm:h-[min(56vh,28rem)] lg:hidden"
		>
			<HeroVideo fill />
		</div>
	</div>
</section>

<section class="px-5 py-16">
	<div class="mx-auto max-w-6xl">
		<h2 use:reveal class="text-display text-4xl">Built for class businesses</h2>
		<p use:reveal class="mt-3 max-w-2xl text-muted">
			Class-based checkouts, flexible schedules, automated emails, reports, and custom forms—everything
			you need to sell places on classes.
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

<section class="border-t border-border px-5 py-20 md:py-28">
	<div class="mx-auto max-w-6xl">
		<p use:reveal class="text-xs font-semibold uppercase tracking-wider text-teal-bright">
			Main features
		</p>
		<h2 use:reveal class="text-display mt-2 text-4xl md:text-5xl">
			Everything you need to sell class places
		</h2>
		<p use:reveal class="mt-4 max-w-2xl text-lg text-muted">
			From checkout to confirmation emails—built for studios, instructors, and anyone who runs
			bookable sessions on WordPress.
		</p>

		<div class="mt-20 flex flex-col gap-24 md:gap-32 lg:gap-40">
			{#each mainFeatures as f, i}
				{@const flip = i % 2 === 1}
				{@const hasImage = ('image' in f && f.image) || ('images' in f && f.images)}

				{#if hasImage}
					<article
						use:reveal
						class="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24"
					>
						<div
							class="order-1 {flip
								? 'lg:col-start-2 lg:row-start-1'
								: ''}"
						>
							{#if 'images' in f && f.images}
								<div class="flex flex-col gap-5">
									{#each f.images as img}
										<ClickableImage
											src={img.src}
											alt={img.alt}
											class="w-full rounded-xl border border-border bg-surface-raised shadow-lg shadow-black/20"
										/>
									{/each}
								</div>
							{:else if 'image' in f && f.image}
								<ClickableImage
									src={f.image}
									alt={f.imageAlt ?? ''}
									class="w-full rounded-xl border border-border bg-surface-raised shadow-lg shadow-black/20"
								/>
							{/if}
						</div>

						<div
							class="order-2 flex flex-col justify-center {flip
								? 'lg:col-start-1 lg:row-start-1'
								: ''}"
						>
							<h3 class="text-display text-3xl md:text-4xl">{f.title}</h3>
							<p class="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
								{f.description}
							</p>
						</div>
					</article>
				{:else}
					<article use:reveal class="mx-auto max-w-3xl py-4 text-center md:py-8">
						<h3 class="text-display text-3xl md:text-4xl">{f.title}</h3>
						<p class="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
							{f.description}
						</p>
					</article>
				{/if}
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-border bg-surface-raised/30 px-5 py-20 md:py-28">
	<div class="mx-auto max-w-6xl">
		<p use:reveal class="text-xs font-semibold uppercase tracking-wider text-teal-bright">
			Examples
		</p>
		<h2 use:reveal class="text-display mt-2 text-4xl md:text-5xl">Built for your kind of business</h2>
		<p use:reveal class="mt-4 max-w-2xl text-lg text-muted">
			Whether you run weekly classes, book 1:1 appointments, or host one-off events—the same plugin
			adapts to how you work.
		</p>

		<div class="mt-20 flex flex-col gap-24 md:gap-32 lg:gap-40">
			{#each examples as e, i}
				{@const flip = i % 2 === 1}
				{@const hasImage = 'image' in e && e.image}

				{#if hasImage}
					<article
						use:reveal={{ delay: i * 0.04 }}
						class="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24"
					>
						<div class="order-1 {flip ? 'lg:col-start-2 lg:row-start-1' : ''}">
							<ClickableImage
								src={e.image}
								alt={e.imageAlt ?? ''}
								class="w-full rounded-xl border border-border bg-surface-raised shadow-lg shadow-black/20"
							/>
						</div>

						<div
							class="order-2 flex flex-col justify-center {flip
								? 'lg:col-start-1 lg:row-start-1'
								: ''}"
						>
							<p class="font-mono text-xs uppercase tracking-widest text-teal-bright">
								Example {i + 1}
							</p>
							<h3 class="text-display mt-2 text-3xl md:text-4xl">{e.title}</h3>
							<p class="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
								{e.description}
							</p>
						</div>
					</article>
				{:else}
					<article use:reveal class="mx-auto max-w-3xl py-4 text-center md:py-8">
						<p class="font-mono text-xs uppercase tracking-widest text-teal-bright">
							Example {i + 1}
						</p>
						<h3 class="text-display mt-2 text-3xl md:text-4xl">{e.title}</h3>
						<p class="mt-5 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
							{e.description}
						</p>
					</article>
				{/if}
			{/each}
		</div>
	</div>
</section>
