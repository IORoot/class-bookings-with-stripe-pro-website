<script lang="ts">
	import { page } from '$app/stores';
	import type { DocNavCategory } from '$lib/docs.server';

	let { nav }: { nav?: DocNavCategory[] } = $props();

	const categories = $derived(nav ?? $page.data.docNav ?? []);
	let openCategories = $state<Set<string> | null>(null);

	const open = $derived(
		openCategories ?? new Set(categories.map((category) => category.name))
	);

	function toggle(name: string) {
		const next = new Set(open);
		if (next.has(name)) {
			next.delete(name);
		} else {
			next.add(name);
		}
		openCategories = next;
	}
</script>

<aside class="w-full shrink-0 lg:w-56">
	<nav class="sticky top-24 space-y-1 text-sm" aria-label="Documentation">
		<p class="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted">Documentation</p>
		{#each categories as category}
			<div class="rounded-lg border border-transparent">
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left font-medium text-fg hover:bg-surface-overlay"
					aria-expanded={open.has(category.name)}
					onclick={() => toggle(category.name)}
				>
					{category.name}
					<svg
						class="h-4 w-4 text-muted transition {open.has(category.name) ? 'rotate-180' : ''}"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><path d="M6 9l6 6 6-6" /></svg
					>
				</button>
				{#if open.has(category.name)}
					<ul class="mb-2 ml-1 space-y-0.5 border-l border-border pl-3">
						{#each category.items as doc}
							<li>
								<a
									href="/docs/{doc.slug}"
									class="block rounded-md px-2 py-1.5 transition {$page.url.pathname ===
									`/docs/${doc.slug}`
										? 'bg-teal/15 text-teal-bright'
										: 'text-muted hover:text-fg'}"
								>
									{doc.title}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</nav>
</aside>
