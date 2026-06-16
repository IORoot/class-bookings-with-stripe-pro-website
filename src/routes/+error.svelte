<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex flex-1 items-center justify-center px-5 py-24 text-center">
	<div>
		<p class="text-6xl font-light text-teal/40">{$page.status}</p>
		<h1 class="text-display mt-4 text-3xl">Page not found</h1>
		<p class="mt-3 text-muted">That page does not exist or has moved.</p>
		<a href="/" class="btn-primary mt-8 inline-flex">Back home</a>
	</div>
</section>
