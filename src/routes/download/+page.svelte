<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/config';

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	async function submit(e: Event) {
		e.preventDefault();
		status = 'loading';
		message = '';

		try {
			const res = await fetch('/api/download-resend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error ?? 'Request failed');
			status = 'success';
			message = data.message ?? 'If a valid licence exists for this email, a new download link has been sent.';
		} catch (err) {
			status = 'error';
			message = err instanceof Error ? err.message : 'Something went wrong';
		}
	}
</script>

<Seo
	title="Resend download"
	description="Resend your Class Bookings with Stripe Pro download link."
	path="/download"
/>

<section class="px-5 py-16 md:py-24">
	<div class="mx-auto max-w-md">
		<h1 class="text-display text-4xl">Resend download</h1>
		<p class="mt-3 text-sm text-muted">
			Enter the email used at checkout. We will email a fresh single-use link if a licence exists for
			that address — active licences get the latest release; expired licences get the last release
			from your update window.
		</p>

		<form class="block-card mt-8 space-y-4 p-6" onsubmit={submit}>
			<div>
				<label for="email" class="mb-1.5 block text-sm font-medium">Email address</label>
				<input
					id="email"
					type="email"
					required
					bind:value={email}
					class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-fg outline-none focus:border-teal"
					placeholder="you@example.com"
					disabled={status === 'loading'}
				/>
			</div>
			<button type="submit" class="btn-primary w-full" disabled={status === 'loading'}>
				{status === 'loading' ? 'Sending…' : 'Send download link'}
			</button>
		</form>

		{#if message}
			<p
				class="mt-4 rounded-xl border px-4 py-3 text-sm {status === 'success'
					? 'border-teal/30 bg-teal/10 text-teal-bright'
					: 'border-red-500/30 bg-red-500/10 text-red-300'}"
				role="status"
			>
				{message}
			</p>
		{/if}

		<p class="mt-6 text-center text-sm text-muted">
			Licence expired?
			<a href={site.stripeRenewalLink} class="text-teal-bright hover:underline">Renew for {site.price}</a>
		</p>
	</div>
</section>
