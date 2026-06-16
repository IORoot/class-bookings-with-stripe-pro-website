<script lang="ts">
	import type { ThemeEntry } from '$lib/themes';
	import { themeTagLabels } from '$lib/themes';

	interface Props {
		theme: ThemeEntry;
	}

	let { theme }: Props = $props();
</script>

<a
	href={theme.repoUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="group block-card block-card-hover flex h-full flex-col overflow-hidden"
>
	<div class="relative aspect-[4/3] overflow-hidden bg-surface-overlay">
		<img
			src={theme.screenshotUrl}
			alt="{theme.name} booking form preview"
			class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
			loading="lazy"
			decoding="async"
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-raised/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
		></div>
		<span
			class="absolute right-3 top-3 rounded-lg border border-border bg-surface/90 p-1.5 text-muted opacity-0 backdrop-blur transition group-hover:opacity-100"
			aria-hidden="true"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 20 4" />
			</svg>
		</span>
	</div>

	<div class="flex flex-1 flex-col gap-3 p-4">
		<div class="flex flex-wrap items-start justify-between gap-2">
			<h2 class="text-base font-semibold text-fg group-hover:text-teal-bright">{theme.name}</h2>
			<span class="font-mono text-xs text-muted">{theme.slug}</span>
		</div>

		<p class="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{theme.description}</p>

		<div class="flex flex-wrap gap-1.5">
			{#each theme.tags as tag}
				<span
					class="rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide
						{tag === 'premium'
						? 'bg-teal/15 text-teal-bright'
						: tag === 'tutorial'
							? 'bg-gold/10 text-gold'
							: 'bg-surface-overlay text-muted'}"
				>
					{themeTagLabels[tag] ?? tag}
				</span>
			{/each}
		</div>
	</div>
</a>
