import type { Handler } from '@netlify/functions';
import { verifyDownloadToken } from './lib/tokens';
import {
	consumeJti,
	getEntitlement,
	isTokenValid
} from './lib/entitlement';
import { getReleaseZipForEntitlement, fetchReleaseAsset } from './lib/github';

export const handler: Handler = async (event) => {
	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, body: 'Method not allowed' };
	}

	const token = event.queryStringParameters?.token;
	if (!token) {
		return { statusCode: 400, body: 'Missing token' };
	}

	try {
		const { email, jti } = await verifyDownloadToken(token);
		const entitlement = await getEntitlement(email);

		if (!entitlement) {
			return forbiddenPage('No licence found for this link.');
		}

		if (!isTokenValid(entitlement, jti)) {
			return forbiddenPage(
				'This download link has expired or already been used. Request a new link from the download page.'
			);
		}

		const asset = await getReleaseZipForEntitlement(entitlement.expiresAt);
		const fileRes = await fetchReleaseAsset(asset.url);

		if (!fileRes.ok || !fileRes.body) {
			throw new Error('Failed to fetch release asset');
		}

		await consumeJti(email, jti);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Disposition': `attachment; filename="${asset.name}"`,
				'Cache-Control': 'no-store',
				'X-CBFS-Release': asset.tag
			},
			body: await fileRes.arrayBuffer()
		};
	} catch (err) {
		console.error('Download failed', err);
		const message =
			err instanceof Error && err.message.includes('licence period')
				? err.message
				: 'Invalid or expired link';
		return forbiddenPage(`${message}. <a href="/download">Request a new download link</a>.`);
	}
};

function forbiddenPage(detail: string) {
	return {
		statusCode: 403,
		headers: { 'Content-Type': 'text/html' },
		body: `<h1>Download unavailable</h1><p>${detail}</p>`
	};
}
