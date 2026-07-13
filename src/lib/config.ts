type StripeMode = 'test' | 'live';

function devDirectLink(kind: 'purchase' | 'renewal'): string | undefined {
	if (!import.meta.env.DEV) return undefined;

	const mode: StripeMode = import.meta.env.PUBLIC_STRIPE_MODE === 'test' ? 'test' : 'live';
	const suffix = mode === 'test' ? '_TEST' : '_LIVE';

	if (kind === 'purchase') {
		return (
			import.meta.env[`PUBLIC_STRIPE_PAYMENT_LINK${suffix}`] ??
			import.meta.env.PUBLIC_STRIPE_PAYMENT_LINK
		);
	}

	return (
		import.meta.env[`PUBLIC_STRIPE_RENEWAL_LINK${suffix}`] ??
		import.meta.env.PUBLIC_STRIPE_RENEWAL_LINK
	);
}

function checkoutHref(kind: 'purchase' | 'renewal'): string {
	return devDirectLink(kind) ?? (kind === 'purchase' ? '/api/buy' : '/api/renew');
}

export const site = {
	name: 'Class Bookings with Stripe Pro',
	shortName: 'CBFS Pro',
	tagline: 'Stripe Checkout booking for WordPress classes',
	description:
		'Sell class places with Stripe Checkout. Capacity-aware dates, emails, reports, appointments, scheduled emails, and beautiful booking themes — built for studios and instructors.',
	author: 'IORoot',
	price: '£49.99',
	priceNote: 'One payment · 1 year of updates',
	renewalNote: 'Renew anytime for another year at the same price',
	githubRepo: 'IORoot/class-bookings-with-stripe-pro-website',
	themesRepoUrl:
		import.meta.env.PUBLIC_THEMES_REPO_URL ??
		'https://github.com/IORoot/class-bookings-with-stripe-pro-themes',
	githubIssues:
		import.meta.env.PUBLIC_GITHUB_ISSUES_URL ??
		'https://github.com/IORoot/class-bookings-with-stripe-pro-website/issues',
	githubDiscussions:
		import.meta.env.PUBLIC_GITHUB_DISCUSSIONS_URL ??
		'https://github.com/IORoot/class-bookings-with-stripe-pro-website/discussions',
	freePluginUrl:
		import.meta.env.PUBLIC_WP_FREE_PLUGIN_URL ??
		'https://wordpress.org/plugins/class-bookings-with-stripe/',
	/** Runtime redirect — uses STRIPE_MODE on the server (no rebuild to switch test/live). */
	stripePaymentLink: checkoutHref('purchase'),
	stripeRenewalLink: checkoutHref('renewal'),
	siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://class-bookings-pro.netlify.app'
} as const;

export function isStripeCheckoutUrl(url: string): boolean {
	return (
		url === '/api/buy' ||
		url === '/api/renew' ||
		url.startsWith('https://buy.stripe.com/') ||
		url.startsWith('https://donate.stripe.com/')
	);
}

export const nav = [
	{ href: '/', label: 'Home' },
	{ href: '/details', label: 'Details' },
	{ href: '/themes', label: 'Themes' },
	{ href: '/docs', label: 'Docs' },
	{ href: '/support', label: 'Support' }
] as const;

export const legal = [
	{ href: '/legal/terms', label: 'Terms' },
	{ href: '/legal/privacy', label: 'Privacy' },
	{ href: '/legal/refunds', label: 'Refunds' }
] as const;
