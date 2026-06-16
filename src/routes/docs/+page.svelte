<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import DocSidebar from '$lib/components/DocSidebar.svelte';

	let { data } = $props();
</script>

<Seo title="Documentation" description="Guides for Class Bookings with Stripe Pro." path="/docs" />

<section class="px-5 py-12 md:py-16">
	<div class="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
		<DocSidebar />

		<div class="min-w-0 flex-1">
			<h1 class="text-display text-5xl">Documentation</h1>
			<p class="mt-3 max-w-2xl text-muted">
				Step-by-step guides, video tutorials, and Pro feature reference.
			</p>

			<div class="mt-10 grid gap-4 sm:grid-cols-2">
				{#each data.docs as doc}
					<a
						href="/docs/{doc.slug}"
						class="block-card block-card-hover group p-5"
					>
						<div class="flex items-center gap-2">
							<p class="text-xs font-medium uppercase tracking-wider text-teal-bright">
								{doc.category}
							</p>
							{#if doc.pro}
								<span
									class="inline-flex items-center rounded-md border border-teal/30 bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal-bright"
									>Pro</span
								>
							{/if}
						</div>
						<h2 class="mt-2 text-lg font-semibold group-hover:text-teal-bright">{doc.title}</h2>
						<p class="mt-2 text-sm text-muted">{doc.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
