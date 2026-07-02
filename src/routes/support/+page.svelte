<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/config';
</script>

<Seo
	title="Support"
	description="Get help with Class Bookings with Stripe Pro — GitHub Discussions for questions and GitHub Issues for bugs."
	path="/support"
/>

<section class="px-5 py-16 md:py-24">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-display text-5xl">Support</h1>
		<p class="mt-4 text-lg text-muted">
			Ask questions in GitHub Discussions, or open an issue for bugs and feature requests.
		</p>

		<div class="mt-10 grid gap-6 text-left md:grid-cols-2">
			<div class="block-card flex flex-col p-6">
				<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">Questions</p>
				<h2 class="mt-2 text-lg font-semibold text-fg">GitHub Discussions</h2>
				<p class="mt-2 flex-1 text-sm text-muted">
					Ask anything—setup help, how something works, or sharing how you use the plugin. The
					community and IORoot can reply in the open.
				</p>
				<ul class="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted">
					<li>General setup and “how do I…?” questions</li>
					<li>Tips, workflows, and show-and-tell</li>
					<li>Ideas and feedback before opening an issue</li>
				</ul>
				<a
					href={site.githubDiscussions}
					class="btn-primary mt-6 inline-flex w-full justify-center sm:w-auto"
					rel="noopener"
				>
					Open Discussions
				</a>
			</div>

			<div class="block-card flex flex-col p-6">
				<p class="text-xs font-semibold uppercase tracking-wider text-teal-bright">Bugs & requests</p>
				<h2 class="mt-2 text-lg font-semibold text-fg">GitHub Issues</h2>
				<p class="mt-2 flex-1 text-sm text-muted">
					Report something broken or request a specific change. Issues are best when there is a clear
					problem to fix or a feature to track.
				</p>
				<ul class="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted">
					<li>Check the <a href="/docs" class="text-teal-bright hover:underline">documentation</a> first</li>
					<li>Include WordPress, PHP, and plugin version</li>
					<li>Steps to reproduce for bugs</li>
					<li>
						Purchase problems? Try <a href="/download" class="text-teal-bright hover:underline"
							>resend download</a
						> first
					</li>
				</ul>
				<a
					href={site.githubIssues}
					class="btn-secondary mt-6 inline-flex w-full justify-center sm:w-auto"
					rel="noopener"
				>
					Open Issues
				</a>
			</div>
		</div>
	</div>
</section>
