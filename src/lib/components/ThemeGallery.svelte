<script lang="ts">
	import ThemeCard from '$lib/components/ThemeCard.svelte';
	import type { ThemeEntry, ThemeTag } from '$lib/themes';
	import { provideLabels, themeTagLabels } from '$lib/themes';

	interface Props {
		themes: ThemeEntry[];
		repoUrl: string;
		syncedAt: string;
	}

	let { themes, repoUrl, syncedAt }: Props = $props();

	type SortKey = 'name-asc' | 'name-desc' | 'category';

	let query = $state('');
	let tagFilter = $state<ThemeTag | 'all'>('all');
	let provideFilter = $state<string>('all');
	let sort = $state<SortKey>('category');

	const tagOrder: Record<ThemeTag, number> = { premium: 0, basic: 1, tutorial: 2 };

	const allProvides = $derived(
		[...new Set(themes.flatMap((t) => t.provides))].sort((a, b) =>
			(provideLabels[a as keyof typeof provideLabels] ?? a).localeCompare(
				provideLabels[b as keyof typeof provideLabels] ?? b
			)
		)
	);

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();

		let list = themes.filter((theme) => {
			if (tagFilter !== 'all' && !theme.tags.includes(tagFilter)) return false;
			if (provideFilter !== 'all' && !theme.provides.includes(provideFilter as ThemeEntry['provides'][number]))
				return false;
			if (!q) return true;
			const haystack = [theme.name, theme.slug, theme.description, ...theme.tags, ...theme.provides]
				.join(' ')
				.toLowerCase();
			return haystack.includes(q);
		});

		list = [...list].sort((a, b) => {
			if (sort === 'name-asc') return a.name.localeCompare(b.name);
			if (sort === 'name-desc') return b.name.localeCompare(a.name);

			const aTag = a.tags.find((t) => t in tagOrder) ?? 'tutorial';
			const bTag = b.tags.find((t) => t in tagOrder) ?? 'tutorial';
			const tagCmp = tagOrder[aTag] - tagOrder[bTag];
			if (tagCmp !== 0) return tagCmp;
			return a.name.localeCompare(b.name);
		});

		return list;
	});

	const tagCounts = $derived({
		all: themes.length,
		premium: themes.filter((t) => t.tags.includes('premium')).length,
		basic: themes.filter((t) => t.tags.includes('basic')).length,
		tutorial: themes.filter((t) => t.tags.includes('tutorial')).length
	});

	const syncedLabel = $derived(
		new Date(syncedAt).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);
</script>

<div class="space-y-6">
	<div class="block-card space-y-4 p-4 md:p-5">
		<div class="flex flex-col gap-4 lg:flex-row lg:items-end">
			<label class="flex-1">
				<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Search</span>
				<input
					type="search"
					bind:value={query}
					placeholder="Name, slug, description…"
					class="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted/60 focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/20"
				/>
			</label>

			<label class="w-full lg:w-48">
				<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Sort</span>
				<select bind:value={sort} class="select-input">
					<option value="category">Category, then name</option>
					<option value="name-asc">Name A–Z</option>
					<option value="name-desc">Name Z–A</option>
				</select>
			</label>

			<label class="w-full lg:w-52">
				<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Provides</span>
				<select bind:value={provideFilter} class="select-input">
					<option value="all">All components</option>
					{#each allProvides as provide}
						<option value={provide}>{provideLabels[provide as keyof typeof provideLabels] ?? provide}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
			{#each [{ key: 'all', label: 'All' }, { key: 'premium', label: 'Premium' }, { key: 'basic', label: 'Basic' }, { key: 'tutorial', label: 'Tutorial' }] as item}
				<button
					type="button"
					class="rounded-lg px-3 py-1.5 text-sm font-medium transition
						{tagFilter === item.key
						? 'bg-teal/20 text-teal-bright ring-1 ring-teal/30'
						: 'bg-surface-overlay/60 text-muted hover:bg-surface-overlay hover:text-fg'}"
					onclick={() => (tagFilter = item.key as ThemeTag | 'all')}
				>
					{item.label}
					<span class="ml-1 tabular-nums text-xs opacity-70"
						>({tagCounts[item.key as keyof typeof tagCounts]})</span
					>
				</button>
			{/each}
		</div>
	</div>

	<p class="text-sm text-muted">
		Showing <strong class="text-fg">{filtered.length}</strong> of {themes.length} themes · synced {syncedLabel} ·
		<a href={repoUrl} class="text-teal-bright hover:underline" target="_blank" rel="noopener noreferrer"
			>source on GitHub</a
		>
	</p>

	{#if filtered.length === 0}
		<div class="block-card p-10 text-center">
			<p class="text-lg font-medium text-fg">No themes match your filters</p>
			<p class="mt-2 text-sm text-muted">Try clearing search or choosing a different category.</p>
			<button
				type="button"
				class="btn-secondary mt-6"
				onclick={() => {
					query = '';
					tagFilter = 'all';
					provideFilter = 'all';
				}}
			>
				Reset filters
			</button>
		</div>
	{:else}
		<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
			{#each filtered as theme (theme.slug)}
				<ThemeCard {theme} />
			{/each}
		</div>
	{/if}
</div>
