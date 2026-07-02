export type FeatureCard = {
	title: string;
	description: string;
	accent: 'teal' | 'slate';
	pro?: boolean;
};

export const features = [
	{
		title: 'Class-based checkouts',
		description:
			'Each class generates the right Stripe Checkout session—date, time, capacity, and custom data included. No generic products or hand-built sessions.',
		accent: 'teal'
	},
	{
		title: 'Classes, events & appointments',
		description:
			'Weekly classes, one-off events, and Pro appointment schedules—from simple repeats to stackable availability rules.',
		accent: 'teal'
	},
	{
		title: 'Emails',
		description:
			'Admin and customer emails, plus optional reminders and post-class messages. Merge tags, HTML upload, and per-class overrides.',
		accent: 'slate'
	},
	{
		title: 'Reports',
		description:
			'Summary graphs, upcoming bookings, and trends. Spot your best customers, classes, and revenue at a glance.',
		accent: 'slate'
	},
	{
		title: 'Forms & global calendar',
		description:
			'Place booking forms on any page with shortcodes or Elementor widgets. Show every class type on one global calendar.',
		accent: 'slate'
	},
	{
		title: 'Customisable',
		description:
			'Theme library and tutorials to restyle forms and calendars. Hooks, filters, API endpoints, and ACF fields.',
		accent: 'teal',
		pro: true
	}
] satisfies FeatureCard[];

export const benefits = [
	'No WooCommerce required',
	'ACF-driven class setup',
	'Elementor widget & shortcode',
	'1 year of updates included'
] as const;

export const mainFeatures = [
	{
		title: 'Class-based checkouts',
		description:
			'Set up repeatable classes that pass the right date and booking data straight into Stripe Checkout. No generic Stripe products or hand-built sessions missing class details—the plugin builds the correct checkout with every custom field you need.',
		image: '/docs/images/feature-stripe-checkout.png',
		imageAlt: 'Stripe Checkout showing class name, date, time, and price'
	},
	{
		title: 'Repeating classes, one-off events & appointments',
		description:
			'Run weekly classes, one-off events throughout the year, or complex recurring appointment schedules. From simple weekly repeats to stackable availability rules—flexible enough for how you actually work.',
		image: '/docs/images/feature-schedule-type.png',
		imageAlt: 'Schedule type options: weekly class, one-off event, appointments, and external link'
	},
	{
		title: 'Emails',
		description:
			'Admin and customer emails out of the box, plus optional reminders and post-class messages. Use merge tags in the visual editor, or upload HTML for full control. Override any email setting on a per-class basis.',
		images: [
			{
				src: '/docs/images/feature-emails.png',
				alt: 'Class email settings for admin, customer, reminders, and post-class messages'
			},
			{
				src: '/docs/images/feature-email-body.png',
				alt: 'Email body editor with merge tags for booking details'
			}
		]
	},
	{
		title: 'Reports',
		description:
			'At-a-glance summaries and graphs for upcoming bookings and trends. See your best customers, top classes, and revenue—with class-by-class detail when you need it.',
		image: '/docs/images/feature-report-graph.png',
		imageAlt: 'Line graph of students booked by class over time'
	},
	{
		title: 'Singular forms & global calendar',
		description:
			'Place individual class forms on any page with shortcodes or Elementor widgets. Show multiple class types together on one global calendar.',
		image: '/docs/images/feature-global-calendar.png',
		imageAlt: 'Global schedule calendar showing weekly classes, events, and appointments'
	},
	{
		title: 'Customisable',
		description:
			'A theme library and tutorial examples to restyle forms and calendars your way. A documented hook library of actions, filters, and API endpoints—plus ACF support to add your own fields to forms.',
		image: '/docs/images/feature-themes.png',
		imageAlt: 'Theme gallery with booking form previews and install options'
	}
] as const;

export const examples = [
	{
		title: 'Yoga studio with regular classes',
		description:
			'You run weekly yoga on Monday mornings at 9am, Tuesday evenings at 6:30pm, and Friday evenings at 6pm. Fixed fee, capacity of 12. Three classes—set up in minutes.',
		image: '/docs/images/example-yoga.png',
		imageAlt: 'Yoga studio booking form with weekly Monday class calendar and Stripe checkout'
	},
	{
		title: 'Dentist with appointment slots',
		description:
			'A busy surgery booking one patient per slot across multiple days and times. Stackable availability rules handle repeatable slots or one-off openings without the admin headache.',
		image: '/docs/images/example-dentist.png',
		imageAlt: 'Dental appointment booking form with calendar, time slots, and practitioner selection'
	},
	{
		title: 'Dance club with one-off events',
		description:
			'Running a special event for your club? Use the one-off event type for a single payment checkout—take money quickly and securely without building a whole new system.',
		image: '/docs/images/example-event.png',
		imageAlt: 'Dance event booking form with event date selection and Stripe checkout'
	},
	{
		title: 'PT for private gyms',
		description:
			'Working across multiple gyms where payment goes through their systems? Switch on the external link and point bookings to each gym’s checkout page.'
	}
] as const;
