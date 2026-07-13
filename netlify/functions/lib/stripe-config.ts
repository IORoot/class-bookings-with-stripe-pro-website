export type StripeMode = 'test' | 'live';

export function getStripeMode(): StripeMode {
	const mode = process.env.STRIPE_MODE?.trim().toLowerCase();
	return mode === 'test' ? 'test' : 'live';
}

function modeEnv(name: string, mode: StripeMode): string | undefined {
	const suffix = mode === 'test' ? '_TEST' : '_LIVE';
	return process.env[`${name}${suffix}`] ?? process.env[`${name}_${mode.toUpperCase()}`];
}

function requireModeEnv(name: string, mode: StripeMode): string {
	const value = modeEnv(name, mode) ?? (mode === 'live' ? process.env[name] : undefined);
	if (!value) {
		throw new Error(
			`Missing ${name}_${mode.toUpperCase()} (or ${name} for live). Set STRIPE_MODE=${mode} credentials.`
		);
	}
	return value;
}

export function getStripeSecretKey(mode = getStripeMode()): string {
	return requireModeEnv('STRIPE_SECRET_KEY', mode);
}

export function getStripeWebhookSecret(mode = getStripeMode()): string {
	return requireModeEnv('STRIPE_WEBHOOK_SECRET', mode);
}

export function getStripePaymentLink(
	kind: 'purchase' | 'renewal',
	mode = getStripeMode()
): string {
	const name = kind === 'purchase' ? 'STRIPE_PAYMENT_LINK' : 'STRIPE_RENEWAL_LINK';
	return requireModeEnv(name, mode);
}

/** Verify webhook with active mode secret, then fall back to the other mode (same URL in Stripe Dashboard). */
export function getWebhookSecretsForVerification(): string[] {
	const primary = getStripeMode();
	const secondary: StripeMode = primary === 'test' ? 'live' : 'test';

	const secrets: string[] = [];
	try {
		secrets.push(getStripeWebhookSecret(primary));
	} catch {
		/* primary not configured */
	}
	try {
		const alt = getStripeWebhookSecret(secondary);
		if (!secrets.includes(alt)) secrets.push(alt);
	} catch {
		/* secondary not configured */
	}

	if (secrets.length === 0) {
		throw new Error('No STRIPE_WEBHOOK_SECRET_TEST or STRIPE_WEBHOOK_SECRET_LIVE configured');
	}

	return secrets;
}
