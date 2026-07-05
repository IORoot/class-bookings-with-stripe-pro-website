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
	stripePaymentLink: import.meta.env.PUBLIC_STRIPE_PAYMENT_LINK ?? '#',
	stripeRenewalLink: import.meta.env.PUBLIC_STRIPE_RENEWAL_LINK ?? '#',
	siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://class-bookings-pro.netlify.app'
} as const;

/** True when a Stripe Payment Link URL was set at build time. */
export function isStripeCheckoutUrl(url: string): boolean {
	return url.startsWith('https://buy.stripe.com/') || url.startsWith('https://donate.stripe.com/');
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
