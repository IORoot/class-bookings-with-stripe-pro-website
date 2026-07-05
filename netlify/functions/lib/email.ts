import { Resend } from 'resend';
import { getEnv, getOptionalEnv, TOKEN_MINUTES } from './env';
import { downloadUrl } from './tokens';

export async function sendDownloadEmail(
	email: string,
	token: string,
	updatesActive: boolean
): Promise<void> {
	const resend = new Resend(getEnv('RESEND_API_KEY'));
	const from = getOptionalEnv('EMAIL_FROM', 'Class Bookings Pro <pro@ioroot.com>');
	const link = downloadUrl(token);
	const versionLine = updatesActive
		? 'This delivers the <strong>latest Pro release</strong> for your active update period.'
		: 'Your update period has ended. This delivers the <strong>last release from your licence window</strong>.';

	await resend.emails.send({
		from,
		to: email,
		subject: 'Your Class Bookings with Stripe Pro download',
		html: `
			<div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
				<h1 style="font-size: 22px; font-weight: 600;">Your download link</h1>
				<p>Your download link is ready. It expires in <strong>${TOKEN_MINUTES} minutes</strong>, works <strong>once</strong>, and ${versionLine}</p>
				<p style="margin: 28px 0;">
					<a href="${link}" style="display: inline-block; background: #0e7490; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600;">Download Pro plugin</a>
				</p>
				<p style="font-size: 14px; color: #555;">Active licences include one year of updates from your purchase or renewal date. After that, you can still download the last version from your licence window — renew anytime for another year of updates.</p>
				<p style="font-size: 14px; color: #555;">Need another link? <a href="${getEnv('SITE_URL').replace(/\/$/, '')}/download">Resend from the download page</a> (this invalidates any previous link).</p>
				<p style="font-size: 14px; color: #555;">Need help? <a href="https://github.com/IORoot/class-bookings-with-stripe-pro-website/discussions">GitHub Discussions</a> or <a href="https://github.com/IORoot/class-bookings-with-stripe-pro-website/issues">Issues</a>.</p>
			</div>
		`
	});
}
