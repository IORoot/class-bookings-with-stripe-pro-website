import type { Handler } from '@netlify/functions';
import { getStripeMode } from './lib/stripe-config';

export const handler: Handler = async () => {
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store'
		},
		body: JSON.stringify({ mode: getStripeMode() })
	};
};
