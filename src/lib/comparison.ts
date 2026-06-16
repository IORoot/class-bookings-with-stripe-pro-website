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
	{ feature: 'External booking links', free: true, pro: true },
	{ feature: 'Capacity limits & soft holds', free: true, pro: true },
	{ feature: 'Customer & admin emails', free: true, pro: true },
	{ feature: 'Email merge tags', free: true, pro: true },
	{ feature: 'Reports dashboard', free: true, pro: true },
	{ feature: 'Elementor widget', free: true, pro: true },
	{ feature: 'Booking shortcode', free: true, pro: true },
	{ feature: 'Waiver, Mailchimp & ACF extras', free: true, pro: true },
	{ feature: 'Appointment booking (calendar & slots)', free: false, pro: true, proOnly: true },
	{ feature: 'Scheduled email rules', free: false, pro: true, proOnly: true },
	{ feature: 'Booking form themes', free: false, pro: true, proOnly: true },
	{ feature: 'Theme preview & installer', free: false, pro: true, proOnly: true }
];
