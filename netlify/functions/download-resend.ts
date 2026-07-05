import type { Handler } from '@netlify/functions';
import { getEntitlement, issueDownloadToken } from './lib/entitlement';
import { isEntitlementActive } from './lib/env';
import { sendDownloadEmail } from './lib/email';
import { clientIp, isRateLimited } from './lib/rate-limit';

const generic = {
	message:
		'If a valid licence exists for this email, a new download link has been sent. Check your inbox.'
};

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

	const ip = clientIp(event.headers as Record<string, string | undefined>);
	const ipLimited = await isRateLimited(`rate:ip:${ip}`, 5, 60 * 60 * 1000);
	const emailLimited = await isRateLimited(`rate:email:${email}`, 1, 5 * 60 * 1000);

	if (ipLimited || emailLimited) {
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(generic)
		};
	}

	try {
		const entitlement = await getEntitlement(email);
		if (!entitlement) {
			return {
				statusCode: 200,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(generic)
			};
		}

		const token = await issueDownloadToken(email);
		await sendDownloadEmail(email, token, isEntitlementActive(entitlement.expiresAt));
	} catch (err) {
		console.error('Resend failed', err);
	}

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(generic)
	};
};
