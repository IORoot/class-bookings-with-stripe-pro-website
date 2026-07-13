import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { isEntitlementActive } from './lib/env';
import {
	getEntitlement,
	isSessionProcessed,
	issueDownloadToken,
	saveEntitlement
} from './lib/entitlement';
import { sendDownloadEmail } from './lib/email';
import { getWebhookSecretsForVerification } from './lib/stripe-config';

export const handler: Handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method not allowed' };
	}

	const sig = event.headers['stripe-signature'];
	if (!sig || !event.body) {
		return { statusCode: 400, body: 'Missing signature or body' };
	}

	let session: Stripe.Checkout.Session;
	let webhookMode: 'test' | 'live' | undefined;

	try {
		let webhookEvent: Stripe.Event | null = null;

		for (const secret of getWebhookSecretsForVerification()) {
			try {
				webhookEvent = Stripe.webhooks.constructEvent(event.body, sig, secret);
				break;
			} catch {
				/* try next secret */
			}
		}

		if (!webhookEvent) {
			throw new Error('Webhook signature verification failed');
		}

		webhookMode = webhookEvent.livemode ? 'live' : 'test';

		if (webhookEvent.type !== 'checkout.session.completed') {
			return { statusCode: 200, body: JSON.stringify({ received: true, mode: webhookMode }) };
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
		return {
			statusCode: 200,
			body: JSON.stringify({ received: true, duplicate: true, mode: webhookMode })
		};
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

	return { statusCode: 200, body: JSON.stringify({ received: true, mode: webhookMode }) };
};
