<script lang="ts">
	import type { FeatureSection } from '$lib/detailFeatures';
	import { reveal } from '$lib/actions/reveal';

	let { sections }: { sections: FeatureSection[] } = $props();
</script>

<div class="flex flex-col gap-20 md:gap-24">
	{#each sections as section, sectionIndex}
		<section id={section.id} class="scroll-mt-24">
			<div class="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16">
				<header use:reveal class="lg:sticky lg:top-24 lg:self-start">
					<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">
						{String(sectionIndex + 1).padStart(2, '0')} · {section.label}
					</p>
					<h3 class="text-display mt-2 text-3xl sm:text-4xl">{section.title}</h3>
					<p class="mt-4 text-base leading-relaxed text-muted">{section.intro}</p>
				</header>

				<div class="grid gap-3 sm:grid-cols-2">
					{#each section.features as feature, i}
						<article
							use:reveal={{ delay: i * 0.04 }}
							class="block-card block-card-hover flex flex-col gap-2 p-5 {section.features.length %
								2 ===
								1 && i === section.features.length - 1
								? 'sm:col-span-2'
								: ''}"
						>
							<h4 class="font-semibold text-fg">{feature.title}</h4>
							<p class="text-sm leading-relaxed text-muted">{feature.description}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		{#if sectionIndex < sections.length - 1}
			<hr class="border-border/60" />
		{/if}
	{/each}
</div>
