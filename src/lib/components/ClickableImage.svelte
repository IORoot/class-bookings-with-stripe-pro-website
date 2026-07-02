<script lang="ts">
	let {
		src,
		alt = '',
		class: imgClass = '',
		loading = 'lazy',
		decoding = 'async'
	}: {
		src: string;
		alt?: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'sync' | 'auto';
	} = $props();
</script>

<a
	href={src}
	target="_blank"
	rel="noopener noreferrer"
	class="clickable-image block"
	aria-label={alt ? `Open full-size image: ${alt}` : 'Open full-size image'}
>
	<img {src} {alt} class={imgClass} {loading} {decoding} />
</a>
