<script lang="ts">
	let { headings }: { headings: { id: string; text: string; level: number }[] } = $props();
</script>

{#if headings.length > 0}
	<nav class="hidden xl:block" aria-label="On this page">
		<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">On this page</p>
		<ul class="space-y-2 text-sm">
			{#each headings as h}
				<li class={h.level === 3 ? 'pl-3' : ''}>
					<a href="#{h.id}" class="text-muted transition hover:text-teal-bright">{h.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
