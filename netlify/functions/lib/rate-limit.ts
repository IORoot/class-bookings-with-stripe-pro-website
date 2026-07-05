import { getStore } from '@netlify/blobs';

const STORE = 'cbfs-pro-rate-limits';

type RateRecord = {
	count: number;
	resetAt: number;
};

export async function isRateLimited(
	limitKey: string,
	max: number,
	windowMs: number
): Promise<boolean> {
	const store = getStore(STORE);
	const now = Date.now();
	const raw = await store.get(limitKey, { type: 'json' });
	const record = raw as RateRecord | null;

	if (!record || now > record.resetAt) {
		await store.setJSON(limitKey, { count: 1, resetAt: now + windowMs });
		return false;
	}

	if (record.count >= max) return true;

	await store.setJSON(limitKey, { count: record.count + 1, resetAt: record.resetAt });
	return false;
}

export function clientIp(headers: Record<string, string | undefined>): string {
	const forwarded = headers['x-forwarded-for'] ?? headers['X-Forwarded-For'];
	if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
	return headers['client-ip'] ?? headers['x-nf-client-connection-ip'] ?? 'unknown';
}
