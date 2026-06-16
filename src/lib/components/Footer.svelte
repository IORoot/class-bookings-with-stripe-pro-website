<script lang="ts">
	import { legal, site } from '$lib/config';
</script>

<footer class="mt-auto border-t border-border bg-surface-raised/50">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
		<div>
			<div class="flex items-center gap-3">
				<img src="/logo.svg" alt="" width="28" height="28" class="opacity-70" />
				<span class="text-sm font-semibold">{site.name}</span>
			</div>
			<p class="mt-3 max-w-xs text-sm text-muted">{site.priceNote}. {site.renewalNote}.</p>
		</div>

		<div>
			<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Site</h2>
			<ul class="mt-3 space-y-2 text-sm">
				<li><a href="/details" class="text-fg/80 hover:text-teal-bright">Free vs Pro</a></li>
				<li><a href="/docs" class="text-fg/80 hover:text-teal-bright">Documentation</a></li>
				<li><a href="/download" class="text-fg/80 hover:text-teal-bright">Download resend</a></li>
				<li>
					<a href={site.freePluginUrl} class="text-fg/80 hover:text-teal-bright" rel="noopener"
						>Free plugin (WordPress.org)</a
					>
				</li>
			</ul>
		</div>

		<div>
			<h2 class="text-xs font-semibold uppercase tracking-wider text-muted">Legal</h2>
			<ul class="mt-3 space-y-2 text-sm">
				{#each legal as item}
					<li><a href={item.href} class="text-fg/80 hover:text-teal-bright">{item.label}</a></li>
				{/each}
				<li>
					<a href={site.githubIssues} class="text-fg/80 hover:text-teal-bright" rel="noopener"
						>Support (GitHub Issues)</a
					>
				</li>
			</ul>
		</div>
	</div>

	<div class="border-t border-border px-5 py-5 text-center text-xs text-muted">
		© {new Date().getFullYear()} {site.author}. All rights reserved.
	</div>
</footer>
