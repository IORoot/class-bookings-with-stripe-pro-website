<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/config';
</script>

<Seo
	title="Support"
	description="Get help with Class Bookings with Stripe Pro via GitHub Issues."
	path="/support"
/>

<section class="px-5 py-16 md:py-24">
	<div class="mx-auto max-w-2xl text-center">
		<h1 class="text-display text-5xl">Support</h1>
		<p class="mt-4 text-lg text-muted">
			Bug reports, feature requests, and setup questions are handled on GitHub Issues.
		</p>

		<div class="block-card mt-10 p-8 text-left">
			<h2 class="font-semibold text-fg">Before you open an issue</h2>
			<ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
				<li>Check the <a href="/docs">documentation</a></li>
				<li>Include WordPress, PHP, and plugin version</li>
				<li>Describe steps to reproduce for bugs</li>
				<li>Purchase / download problems? Try <a href="/download">resend download</a> first</li>
			</ul>
		</div>

		<a href={site.githubIssues} class="btn-primary mt-8 inline-flex" rel="noopener">
			Open GitHub Issues
		</a>
	</div>
</section>
