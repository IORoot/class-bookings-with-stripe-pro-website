<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import DocSidebar from '$lib/components/DocSidebar.svelte';
	import DocToc from '$lib/components/DocToc.svelte';
	import ProBadge from '$lib/components/ProBadge.svelte';
	import { renderMarkdown, extractHeadings, slugify, enhanceDocContent } from '$lib/utils';

	let { data } = $props();
	const doc = $derived(data.doc);
	const html = $derived(enhanceDocContent(renderMarkdown(doc.content)));
	const headings = $derived(extractHeadings(doc.content));
</script>

<Seo title={doc.title} description={doc.description} path="/docs/{doc.slug}" />

<section class="px-5 py-12 md:py-16">
	<div class="mx-auto flex max-w-6xl gap-10">
		<DocSidebar />

		<article class="min-w-0 flex-1">
			<div class="flex flex-wrap items-center gap-3">
				<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">{doc.category}</p>
				{#if doc.pro}<ProBadge />{/if}
			</div>
			<h1 class="text-display mt-2 text-4xl md:text-5xl">{doc.title}</h1>
			<p class="mt-3 text-lg text-muted">{doc.description}</p>

			<div class="prose-docs mt-8 max-w-none">
				{@html html
					.replace(/<h2([^>]*)>(.+?)<\/h2>/g, (_, attrs, text) => {
						const id = slugify(text.replace(/<[^>]+>/g, ''));
						return `<h2 id="${id}"${attrs}>${text}</h2>`;
					})
					.replace(/<h3([^>]*)>(.+?)<\/h3>/g, (_, attrs, text) => {
						const id = slugify(text.replace(/<[^>]+>/g, ''));
						return `<h3 id="${id}"${attrs}>${text}</h3>`;
					})}
			</div>
		</article>

		<aside class="hidden w-48 shrink-0 xl:block">
			<div class="sticky top-24">
				<DocToc {headings} />
			</div>
		</aside>
	</div>
</section>
