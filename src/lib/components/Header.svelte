<script lang="ts">
	import { page } from '$app/stores';
	import { nav, site } from '$lib/config';

	let mobileOpen = $state(false);
</script>

<header class="sticky top-0 z-40 border-b border-border/80 bg-surface/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
		<a href="/" class="group flex items-center gap-3">
			<img
				src="/logo_plugin.svg"
				alt=""
				width="36"
				height="30"
				class="transition group-hover:scale-105"
			/>
			<span class="hidden text-sm font-semibold text-fg sm:block">{site.shortName}</span>
		</a>

		<nav class="hidden items-center gap-1 md:flex" aria-label="Main">
			{#each nav as item}
				<a
					href={item.href}
					class="rounded-lg px-3 py-2 text-sm font-medium transition {$page.url.pathname ===
						item.href || (item.href !== '/' && $page.url.pathname.startsWith(item.href))
						? 'bg-surface-overlay text-fg'
						: 'text-muted hover:bg-surface-overlay/60 hover:text-fg'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a href={site.stripePaymentLink} class="btn-primary hidden text-xs sm:inline-flex sm:text-sm">
				Buy — {site.price}
			</a>
			<button
				type="button"
				class="rounded-lg border border-border p-2 text-muted md:hidden"
				aria-expanded={mobileOpen}
				aria-label="Toggle menu"
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					{#if mobileOpen}
						<path d="M6 6l12 12M6 18L18 6" />
					{:else}
						<path d="M4 7h16M4 12h16M4 17h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<nav class="border-t border-border px-5 py-3 md:hidden" aria-label="Mobile">
			{#each nav as item}
				<a
					href={item.href}
					class="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-overlay hover:text-fg"
					onclick={() => (mobileOpen = false)}
				>
					{item.label}
				</a>
			{/each}
			<a href={site.stripePaymentLink} class="btn-primary mt-2 w-full">Buy — {site.price}</a>
		</nav>
	{/if}
</header>
