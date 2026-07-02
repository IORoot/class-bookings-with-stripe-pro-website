<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/utils';

	const src = '/docs/video/hero.webm';

	let { fill = false }: { fill?: boolean } = $props();

	let videoEl: HTMLVideoElement | undefined = $state();

	onMount(() => {
		if (!videoEl) return;

		if (prefersReducedMotion()) {
			videoEl.pause();
			videoEl.removeAttribute('autoplay');
			return;
		}

		videoEl.play().catch(() => {});
	});
</script>

<div
	class="hero-video relative {fill
		? 'h-full w-screen max-w-none'
		: 'mx-auto w-full max-w-[min(100%,48rem)]'}"
>
	<!-- Soft glow behind the tilted UI -->
	<div
		class="pointer-events-none absolute {fill
			? '-left-8 top-[12%] h-[76%] w-[72%]'
			: '-left-10 top-1/2 h-[85%] w-[85%] -translate-y-1/2'} -z-10 rounded-[2rem] bg-teal/25 blur-[100px]"
		aria-hidden="true"
	></div>
	{#if fill}
		<div
			class="pointer-events-none absolute bottom-0 left-[8%] -z-10 h-10 w-[70%] rounded-full bg-black/35 blur-2xl"
			aria-hidden="true"
		></div>
	{:else}
		<div
			class="pointer-events-none absolute -bottom-8 left-[8%] -z-10 h-20 w-[75%] rounded-full bg-black/40 blur-3xl"
			aria-hidden="true"
		></div>
	{/if}

	<video
		bind:this={videoEl}
		class="relative z-10 block {fill
			? 'h-full w-full object-contain object-left'
			: 'h-auto w-full max-h-[min(72vh,34rem)] object-contain object-left'}"
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		aria-hidden="true"
	>
		<source {src} type="video/webm" />
	</video>
</div>
