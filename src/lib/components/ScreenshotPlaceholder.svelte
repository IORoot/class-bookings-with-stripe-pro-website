<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<div
	class="my-6 flex aspect-[16/10] flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface-overlay/40 p-8 text-center"
	role="img"
	aria-label="{label} screenshot placeholder"
>
	<div class="mb-3 h-10 w-10 rounded-lg border border-border bg-surface-raised"></div>
	<p class="text-sm font-medium text-muted">{label}</p>
	<p class="mt-1 text-xs text-muted/70">Screenshot placeholder</p>
</div>
