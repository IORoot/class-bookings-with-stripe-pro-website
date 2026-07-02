export type ComparisonRow = {
	feature: string;
	free: boolean | string;
	pro: boolean | string;
	proOnly?: boolean;
};

export const comparison: ComparisonRow[] = [
	{ feature: 'Stripe Checkout booking', free: true, pro: true },
	{ feature: 'Weekly recurring classes', free: true, pro: true },
	{ feature: 'One-off events & workshops', free: true, pro: true },
	{ feature: 'Appointment booking with slot rules', free: false, pro: true, proOnly: true },
	{ feature: 'External booking links', free: true, pro: true },
	{ feature: 'Capacity limits & seat holds', free: true, pro: true },
	{ feature: 'Customer & admin confirmation emails', free: true, pro: true },
	{ feature: 'Email merge tags & HTML editor', free: true, pro: true },
	{ feature: 'Per-class email overrides', free: true, pro: true },
	{ feature: 'Pre-class reminder emails', free: false, pro: true, proOnly: true },
	{ feature: 'Post-class follow-up emails', free: false, pro: true, proOnly: true },
	{ feature: 'Form extras (waiver, Mailchimp, coupons, ACF)', free: true, pro: true },
	{ feature: 'Booking & schedule shortcodes', free: true, pro: true },
	{ feature: 'Elementor booking & calendar widgets', free: true, pro: true },
	{ feature: 'Success, cancel & error result pages', free: true, pro: true },
	{ feature: 'Global multi-class schedule calendar', free: true, pro: true },
	{ feature: 'Bookings dashboard & metadata', free: true, pro: true },
	{ feature: 'Reports (summary, classes & customers)', free: true, pro: true },
	{ feature: 'Booking form themes & live preview', free: false, pro: true, proOnly: true },
	{ feature: 'Theme install, ZIP download & overrides', free: false, pro: true, proOnly: true },
	{ feature: 'Developer hooks, filters & REST API', free: true, pro: true },
	{ feature: 'Responsive forms & calendars', free: true, pro: true }
];
