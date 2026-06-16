import type { Handler } from '@netlify/functions';
import { getEntitlement } from './lib/entitlement';
import { isEntitlementActive } from './lib/env';
import { createDownloadToken } from './lib/tokens';
import { sendDownloadEmail } from './lib/email';

export const handler: Handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
	}

	let email: string;
	try {
		const body = JSON.parse(event.body ?? '{}') as { email?: string };
		email = body.email?.trim().toLowerCase() ?? '';
		if (!email) throw new Error('Email required');
	} catch {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Invalid request' })
		};
	}

	// Always return generic success to avoid email enumeration
	const generic = {
		message:
			'If a valid licence exists for this email, a new download link has been sent. Check your inbox.'
	};

	try {
		const entitlement = await getEntitlement(email);
		if (!entitlement || !isEntitlementActive(entitlement.expiresAt)) {
			return {
				statusCode: 200,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(generic)
			};
		}

		const token = await createDownloadToken(email);
		await sendDownloadEmail(email, token);
	} catch (err) {
		console.error('Resend failed', err);
	}

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(generic)
	};
};
