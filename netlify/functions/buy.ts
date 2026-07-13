import type { Handler } from '@netlify/functions';
import { getStripePaymentLink } from './lib/stripe-config';

export const handler: Handler = async () => {
	try {
		return {
			statusCode: 302,
			headers: {
				Location: getStripePaymentLink('purchase'),
				'Cache-Control': 'no-store'
			},
			body: ''
		};
	} catch (err) {
		console.error('Buy redirect failed', err);
		return {
			statusCode: 503,
			headers: { 'Content-Type': 'text/plain' },
			body: 'Purchase link is not configured for the current STRIPE_MODE.'
		};
	}
};
