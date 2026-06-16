import { getStore } from '@netlify/blobs';
import { entitlementExpiresAt } from './env';

export type Entitlement = {
	email: string;
	purchasedAt: number;
	expiresAt: number;
	downloaded: boolean;
	stripeSessionId: string;
};

const STORE = 'cbfs-pro-entitlements';

function key(email: string) {
	return email.trim().toLowerCase();
}

export async function getEntitlement(email: string): Promise<Entitlement | null> {
	const store = getStore(STORE);
	const raw = await store.get(key(email), { type: 'json' });
	return raw as Entitlement | null;
}

export async function saveEntitlement(
	email: string,
	purchasedAt: number,
	stripeSessionId: string,
	isRenewal = false
): Promise<Entitlement> {
	const store = getStore(STORE);
	const existing = await getEntitlement(email);

	const record: Entitlement = {
		email: key(email),
		purchasedAt,
		expiresAt: entitlementExpiresAt(purchasedAt),
		downloaded: isRenewal && existing ? existing.downloaded : false,
		stripeSessionId
	};

	await store.setJSON(key(email), record);
	return record;
}

export async function markDownloaded(email: string): Promise<void> {
	const store = getStore(STORE);
	const existing = await getEntitlement(email);
	if (!existing) return;
	await store.setJSON(key(email), { ...existing, downloaded: true });
}
