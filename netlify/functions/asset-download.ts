import type { Handler } from '@netlify/functions';
import { verifyDownloadToken } from './lib/tokens';
import { getEntitlement, markDownloaded } from './lib/entitlement';
import { isEntitlementActive } from './lib/env';
import { getLatestReleaseZip, fetchReleaseAsset } from './lib/github';

export const handler: Handler = async (event) => {
	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, body: 'Method not allowed' };
	}

	const token = event.queryStringParameters?.token;
	if (!token) {
		return { statusCode: 400, body: 'Missing token' };
	}

	try {
		const { email } = await verifyDownloadToken(token);
		const entitlement = await getEntitlement(email);

		if (!entitlement || !isEntitlementActive(entitlement.expiresAt)) {
			return {
				statusCode: 403,
				headers: { 'Content-Type': 'text/html' },
				body: '<h1>Licence expired</h1><p>Your update period has ended. <a href="/download">Renew or resend</a>.</p>'
			};
		}

		const asset = await getLatestReleaseZip();
		const fileRes = await fetchReleaseAsset(asset.url);

		if (!fileRes.ok || !fileRes.body) {
			throw new Error('Failed to fetch release asset');
		}

		await markDownloaded(email);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Disposition': `attachment; filename="${asset.name}"`,
				'Cache-Control': 'no-store'
			},
			body: await fileRes.arrayBuffer()
		};
	} catch (err) {
		console.error('Download failed', err);
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'text/html' },
			body: '<h1>Invalid or expired link</h1><p><a href="/download">Request a new download link</a>.</p>'
		};
	}
};
