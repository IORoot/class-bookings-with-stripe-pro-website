<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Purchase successful"
	description="Your Class Bookings with Stripe Pro purchase was successful."
	path="/purchase/success"
/>

<section class="px-5 py-20">
	<div class="mx-auto max-w-lg text-center">
		<div
			class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-2xl text-teal-bright"
		>
			✓
		</div>
		<h1 class="text-display mt-6 text-4xl">Thank you</h1>
		<p class="mt-4 text-muted">
			Your payment was successful. Check your inbox for a download link to the latest Pro release.
		</p>
		<p class="mt-2 text-sm text-muted">
			Did not receive it? Check spam or <a href="/download" class="text-teal-bright hover:underline"
				>resend your download link</a
			>.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/docs/getting-started" class="btn-primary">Getting started guide</a>
			<a href="/support" class="btn-secondary">Get support</a>
		</div>
	</div>
</section>
