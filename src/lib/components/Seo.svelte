<script lang="ts">
	import { site } from '$lib/config';

	let {
		title,
		description = site.description,
		path = ''
	}: {
		title: string;
		description?: string;
		path?: string;
	} = $props();

	const url = $derived(`${site.siteUrl}${path}`);
	const fullTitle = $derived(title === site.name ? title : `${title} · ${site.shortName}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>
