import { SignJWT, jwtVerify } from 'jose';
import { getEnv, TOKEN_MINUTES } from './env';

export type DownloadTokenPayload = {
	email: string;
	jti: string;
};

export async function createDownloadToken(email: string, jti: string): Promise<string> {
	const secret = new TextEncoder().encode(getEnv('DOWNLOAD_TOKEN_SECRET'));
	return new SignJWT({ email: email.trim().toLowerCase(), jti })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(`${TOKEN_MINUTES}m`)
		.sign(secret);
}

export async function verifyDownloadToken(token: string): Promise<DownloadTokenPayload> {
	const secret = new TextEncoder().encode(getEnv('DOWNLOAD_TOKEN_SECRET'));
	const { payload } = await jwtVerify(token, secret);
	const email = payload.email;
	const jti = payload.jti;
	if (typeof email !== 'string' || typeof jti !== 'string') {
		throw new Error('Invalid token payload');
	}
	return { email, jti };
}

export function downloadUrl(token: string): string {
	const site = getEnv('SITE_URL').replace(/\/$/, '');
	return `${site}/api/asset-download?token=${encodeURIComponent(token)}`;
}
