<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { comparison } from '$lib/comparison';
	import ProBadge from './ProBadge.svelte';
	import { prefersReducedMotion } from '$lib/utils';

	let tableEl: HTMLTableSectionElement | undefined = $state();

	onMount(() => {
		if (!tableEl || prefersReducedMotion()) return;
		const rows = tableEl.querySelectorAll('tr');
		gsap.fromTo(
			rows,
			{ opacity: 0, y: 16 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.04,
				ease: 'power2.out',
				clearProps: 'opacity,transform'
			}
		);
	});

	function cell(value: boolean | string) {
		if (typeof value === 'string') return value;
		return value ? '✓' : '—';
	}
</script>

<div class="block-card overflow-hidden">
	<div class="overflow-x-auto">
		<table class="w-full min-w-[520px] text-left text-sm">
			<thead>
				<tr class="border-b border-border bg-surface-overlay/50">
					<th class="px-5 py-4 font-semibold text-fg">Feature</th>
					<th class="px-5 py-4 font-semibold text-muted">Free</th>
					<th class="px-5 py-4 font-semibold text-teal-bright">Pro</th>
				</tr>
			</thead>
			<tbody bind:this={tableEl}>
				{#each comparison as row, i}
					<tr class="border-b border-border/60 {i % 2 === 0 ? 'bg-surface-raised/30' : ''}">
						<td class="px-5 py-3.5 text-fg">
							<span class="inline-flex items-center gap-2">
								{row.feature}
								{#if row.proOnly}<ProBadge />{/if}
							</span>
						</td>
						<td class="px-5 py-3.5 text-muted">{cell(row.free)}</td>
						<td class="px-5 py-3.5 font-medium text-fg">{cell(row.pro)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
