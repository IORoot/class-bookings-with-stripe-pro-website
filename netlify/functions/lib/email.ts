import { Resend } from 'resend';
import { getEnv, getOptionalEnv } from './env';
import { downloadUrl } from './tokens';

export async function sendDownloadEmail(email: string, token: string): Promise<void> {
	const resend = new Resend(getEnv('RESEND_API_KEY'));
	const from = getOptionalEnv('EMAIL_FROM', 'Class Bookings Pro <pro@ioroot.com>');
	const link = downloadUrl(token);

	await resend.emails.send({
		from,
		to: email,
		subject: 'Your Class Bookings with Stripe Pro download',
		html: `
			<div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
				<h1 style="font-size: 22px; font-weight: 600;">Thank you for purchasing Pro</h1>
				<p>Your download link is ready. This link expires in 72 hours and always delivers the <strong>latest Pro release</strong>.</p>
				<p style="margin: 28px 0;">
					<a href="${link}" style="display: inline-block; background: #0e7490; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600;">Download Pro plugin</a>
				</p>
				<p style="font-size: 14px; color: #555;">Your licence includes one year of updates from your purchase date. The installed plugin keeps working after that — renew anytime for another year.</p>
				<p style="font-size: 14px; color: #555;">Need help? <a href="https://github.com/IORoot/class-bookings-with-stripe-pro-website/issues">Open a GitHub Issue</a> or <a href="${getEnv('SITE_URL').replace(/\/$/, '')}/download">resend this link</a>.</p>
			</div>
		`
	});
}

export async function sendResendConfirmation(email: string): Promise<void> {
	const resend = new Resend(getEnv('RESEND_API_KEY'));
	const from = getOptionalEnv('EMAIL_FROM', 'Class Bookings Pro <pro@ioroot.com>');

	await resend.emails.send({
		from,
		to: email,
		subject: 'Download link sent — Class Bookings with Stripe Pro',
		html: `<p>If an active licence exists for this address, a new download link has been sent. Check your inbox (and spam folder).</p>`
	});
}
