import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { getEnv, isEntitlementActive } from './lib/env';
import {
	getEntitlement,
	isSessionProcessed,
	issueDownloadToken,
	saveEntitlement
} from './lib/entitlement';
import { sendDownloadEmail } from './lib/email';

const stripe = new Stripe(getEnv('STRIPE_SECRET_KEY'));

export const handler: Handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method not allowed' };
	}

	const sig = event.headers['stripe-signature'];
	if (!sig || !event.body) {
		return { statusCode: 400, body: 'Missing signature or body' };
	}

	let session: Stripe.Checkout.Session;

	try {
		const webhookEvent = stripe.webhooks.constructEvent(
			event.body,
			sig,
			getEnv('STRIPE_WEBHOOK_SECRET')
		);

		if (webhookEvent.type !== 'checkout.session.completed') {
			return { statusCode: 200, body: JSON.stringify({ received: true }) };
		}

		session = webhookEvent.data.object as Stripe.Checkout.Session;
	} catch (err) {
		console.error('Webhook verification failed', err);
		return { statusCode: 400, body: 'Webhook error' };
	}

	const email = session.customer_details?.email ?? session.customer_email;
	if (!email) {
		return { statusCode: 400, body: 'No customer email on session' };
	}

	const existing = await getEntitlement(email);
	if (existing && isSessionProcessed(existing, session.id)) {
		return { statusCode: 200, body: JSON.stringify({ received: true, duplicate: true }) };
	}

	const purchasedAt = Date.now();
	const isRenewal = session.metadata?.type === 'renewal';
	const stripeCustomerId =
		typeof session.customer === 'string' ? session.customer : session.customer?.id;

	const entitlement = await saveEntitlement(email, purchasedAt, session.id, {
		isRenewal,
		stripeCustomerId
	});

	try {
		const token = await issueDownloadToken(email);
		await sendDownloadEmail(email, token, isEntitlementActive(entitlement.expiresAt));
	} catch (err) {
		console.error('Failed to send download email', err);
		return { statusCode: 500, body: 'Email delivery failed' };
	}

	return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
