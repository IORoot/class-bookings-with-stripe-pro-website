import { SignJWT, jwtVerify } from 'jose';
import { getEnv, TOKEN_HOURS } from './env';

export type DownloadTokenPayload = {
	email: string;
};

export async function createDownloadToken(email: string): Promise<string> {
	const secret = new TextEncoder().encode(getEnv('DOWNLOAD_TOKEN_SECRET'));
	return new SignJWT({ email: email.trim().toLowerCase() })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(`${TOKEN_HOURS}h`)
		.sign(secret);
}

export async function verifyDownloadToken(token: string): Promise<DownloadTokenPayload> {
	const secret = new TextEncoder().encode(getEnv('DOWNLOAD_TOKEN_SECRET'));
	const { payload } = await jwtVerify(token, secret);
	const email = payload.email;
	if (typeof email !== 'string') throw new Error('Invalid token payload');
	return { email };
}

export function downloadUrl(token: string): string {
	const site = getEnv('SITE_URL').replace(/\/$/, '');
	return `${site}/api/asset-download?token=${encodeURIComponent(token)}`;
}
