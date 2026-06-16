<script lang="ts">
	let { title, youtubeId }: { title: string; youtubeId: string } = $props();
</script>

<figure class="my-8 overflow-hidden rounded-xl border border-border bg-surface-raised">
	<div class="aspect-video w-full">
		<iframe
			class="h-full w-full"
			src="https://www.youtube-nocookie.com/embed/{youtubeId}"
			{title}
			loading="lazy"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
	<figcaption class="border-t border-border px-4 py-3 text-sm text-muted">{title}</figcaption>
</figure>
