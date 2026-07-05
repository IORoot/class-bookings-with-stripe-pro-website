import { getStore } from '@netlify/blobs';
import { entitlementExpiresAt } from './env';
import { createDownloadToken } from './tokens';

export type Entitlement = {
	email: string;
	purchasedAt: number;
	expiresAt: number;
	downloaded: boolean;
	stripeSessionId: string;
	stripeCustomerId?: string;
	processedSessionIds: string[];
	activeJti?: string;
	usedJtis: string[];
};

const STORE = 'cbfs-pro-entitlements';

function key(email: string) {
	return email.trim().toLowerCase();
}

function normalize(raw: Record<string, unknown> | null): Entitlement | null {
	if (!raw || typeof raw.email !== 'string') return null;

	const stripeSessionId =
		typeof raw.stripeSessionId === 'string' ? raw.stripeSessionId : '';
	const processedSessionIds = Array.isArray(raw.processedSessionIds)
		? (raw.processedSessionIds as string[])
		: stripeSessionId
			? [stripeSessionId]
			: [];

	return {
		email: raw.email,
		purchasedAt: Number(raw.purchasedAt) || 0,
		expiresAt: Number(raw.expiresAt) || 0,
		downloaded: Boolean(raw.downloaded),
		stripeSessionId,
		stripeCustomerId:
			typeof raw.stripeCustomerId === 'string' ? raw.stripeCustomerId : undefined,
		processedSessionIds,
		activeJti: typeof raw.activeJti === 'string' ? raw.activeJti : undefined,
		usedJtis: Array.isArray(raw.usedJtis) ? (raw.usedJtis as string[]) : []
	};
}

export async function getEntitlement(email: string): Promise<Entitlement | null> {
	const store = getStore(STORE);
	const raw = await store.get(key(email), { type: 'json' });
	return normalize(raw as Record<string, unknown> | null);
}

export function isSessionProcessed(entitlement: Entitlement, sessionId: string): boolean {
	return entitlement.processedSessionIds.includes(sessionId);
}

export async function saveEntitlement(
	email: string,
	purchasedAt: number,
	stripeSessionId: string,
	options: {
		isRenewal?: boolean;
		stripeCustomerId?: string;
	} = {}
): Promise<Entitlement> {
	const store = getStore(STORE);
	const existing = await getEntitlement(email);
	const { isRenewal = false, stripeCustomerId } = options;

	const processedSessionIds = existing
		? [...new Set([...existing.processedSessionIds, stripeSessionId])]
		: [stripeSessionId];

	const record: Entitlement = {
		email: key(email),
		purchasedAt,
		expiresAt: entitlementExpiresAt(purchasedAt),
		downloaded: isRenewal && existing ? existing.downloaded : false,
		stripeSessionId,
		stripeCustomerId: stripeCustomerId ?? existing?.stripeCustomerId,
		processedSessionIds,
		activeJti: existing?.activeJti,
		usedJtis: existing?.usedJtis ?? []
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

export async function setActiveJti(email: string, jti: string): Promise<void> {
	const store = getStore(STORE);
	const existing = await getEntitlement(email);
	if (!existing) return;
	await store.setJSON(key(email), { ...existing, activeJti: jti });
}

export async function consumeJti(email: string, jti: string): Promise<void> {
	const store = getStore(STORE);
	const existing = await getEntitlement(email);
	if (!existing) return;

	const usedJtis = existing.usedJtis.includes(jti)
		? existing.usedJtis
		: [...existing.usedJtis, jti];

	await store.setJSON(key(email), {
		...existing,
		usedJtis,
		activeJti: existing.activeJti === jti ? undefined : existing.activeJti,
		downloaded: true
	});
}

export function isTokenValid(entitlement: Entitlement, jti: string): boolean {
	if (entitlement.usedJtis.includes(jti)) return false;
	return entitlement.activeJti === jti;
}

/** Issue a fresh single-use download token and invalidate any previous active link. */
export async function issueDownloadToken(email: string): Promise<string> {
	const jti = crypto.randomUUID();
	const token = await createDownloadToken(email, jti);
	await setActiveJti(email, jti);
	return token;
}
