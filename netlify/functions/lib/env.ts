const ENTITLEMENT_DAYS = 365;
const TOKEN_HOURS = 72;

export function getEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
}

export function getOptionalEnv(name: string, fallback: string): string {
	return process.env[name] ?? fallback;
}

export function entitlementExpiresAt(purchasedAt: number): number {
	return purchasedAt + ENTITLEMENT_DAYS * 24 * 60 * 60 * 1000;
}

export function isEntitlementActive(expiresAt: number): boolean {
	return Date.now() < expiresAt;
}

export { ENTITLEMENT_DAYS, TOKEN_HOURS };
