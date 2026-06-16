<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { renderMarkdown, enhanceDocContent } from '$lib/utils';

	let { data } = $props();
	const html = $derived(enhanceDocContent(renderMarkdown(data.page.content)));
</script>

<Seo
	title={data.page.title}
	description={data.page.description}
	path="/legal/{data.page.slug}"
/>

<section class="px-5 py-12 md:py-16">
	<div class="prose-docs mx-auto max-w-3xl">
		<h1 class="text-display mb-8 text-4xl">{data.page.title}</h1>
		{@html html}
	</div>
</section>
