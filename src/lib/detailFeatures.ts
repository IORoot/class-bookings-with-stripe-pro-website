export type DetailFeature = {
	title: string;
	description: string;
};

export type FeatureSection = {
	id: string;
	label: string;
	title: string;
	intro: string;
	features: DetailFeature[];
};

/** Grouped selling points for the Details page. */
export const featureSections: FeatureSection[] = [
	{
		id: 'payments',
		label: 'Payments',
		title: 'Stripe Checkout built for classes',
		intro:
			'No generic Stripe products or hand-rolled card forms. Every booking generates the right Checkout session with the class name, date, time, seats, and metadata your business needs.',
		features: [
			{
				title: 'Hosted Checkout',
				description:
					'Stripe handles card entry and PCI compliance—you never touch payment details on your WordPress site.'
			},
			{
				title: 'Test & live modes',
				description:
					'Switch between sandbox and production with separate API keys, webhook secrets, and currency settings.'
			},
			{
				title: 'Class-aware sessions',
				description:
					'Checkout line items and metadata reflect the booked class, date, slot, and seat count automatically.'
			},
			{
				title: 'Webhook confirmation',
				description:
					'Paid bookings are confirmed via Stripe webhooks so capacity and records stay accurate after redirect.'
			}
		]
	},
	{
		id: 'schedules',
		label: 'Schedules',
		title: 'Weekly classes, events, and appointments',
		intro:
			'One plugin for the way you actually run sessions—from a Monday-morning yoga repeat to a one-night workshop or a dentist’s bookable slots.',
		features: [
			{
				title: 'Weekly classes',
				description:
					'Fixed day and time, duration, price, capacity, and location. Customers pick a date from a dropdown or calendar; skip individual dates without deleting the class.'
			},
			{
				title: 'One-off events',
				description:
					'Single or multi-day events with start time, seats remaining, and descriptions that flow into emails and merge tags.'
			},
			{
				title: 'Appointment booking',
				description:
					'Calendar UI with stackable slot rules—recurring weekly openings or one-off dates, minimum lead time, per-slot price overrides, and skip dates.'
			},
			{
				title: 'External booking links',
				description:
					'Send customers to another site’s checkout when payment is handled elsewhere—ideal for gyms, franchises, or partner venues.'
			},
			{
				title: 'Capacity & soft holds',
				description:
					'Set seat limits and show remaining places. Pending checkouts hold seats briefly so you do not oversell while someone pays.'
			}
		]
	},
	{
		id: 'emails',
		label: 'Emails',
		title: 'Automated messaging, start to finish',
		intro:
			'Confirmation emails out of the box, optional reminders before class, and follow-ups after—simple merge tags or full HTML when you want complete control.',
		features: [
			{
				title: 'Customer & admin confirmations',
				description:
					'Instant emails on every paid booking. Visual editor or raw HTML body, merge tags in subjects and content, and send test emails before going live.'
			},
			{
				title: 'Scheduled reminders',
				description:
					'Optional pre-class email to booked customers—set how long before the session, optionally copy admin, and override per class.'
			},
			{
				title: 'Post-class follow-ups',
				description:
					'Thank-you notes, feedback requests, or next-class prompts sent after the session ends, with the same merge-tag flexibility.'
			},
			{
				title: 'Per-class overrides',
				description:
					'Replace global templates for one class only—admin, customer, reminder, or post-class—without touching site-wide defaults.'
			},
			{
				title: 'HTML email support',
				description:
					'Paste markup from Beefree, Unlayer, or your own code. Plugin-owned CSS wraps the body; inline styles in HTML mode pass through unchanged.'
			}
		]
	},
	{
		id: 'forms',
		label: 'Forms & pages',
		title: 'Collect what you need at checkout',
		intro:
			'Waivers, mailing-list sign-ups, coupon codes, and custom fields—plus dedicated pages for every outcome after Stripe redirects back to your site.',
		features: [
			{
				title: 'Form extras',
				description:
					'Require waiver acceptance with a linked document, Mailchimp opt-in, coupon codes at checkout, and Advanced Custom Fields on the booking form.'
			},
			{
				title: 'Result pages',
				description:
					'Assign WordPress pages for payment success, customer cancel, and payment errors—each rendered with the booking status shortcode.'
			},
			{
				title: 'Global schedule calendar',
				description:
					'Show multiple classes on one calendar with weeks-ahead control, card colours, optional SVG icons, and featured images on each card.'
			},
			{
				title: 'ACF on bookings',
				description:
					'Custom field values are stored on each booking record alongside core metadata—ready for admin review and exports.'
			}
		]
	},
	{
		id: 'placement',
		label: 'On your site',
		title: 'Shortcodes, Elementor, anywhere',
		intro:
			'Drop a booking form on a landing page, embed a full schedule on your homepage, or wire Elementor widgets without writing PHP.',
		features: [
			{
				title: 'Booking shortcode',
				description:
					'`[clasbpro_booking]` on any page—by class ID or slug, with optional heading, preset date, and preset appointment slot.'
			},
			{
				title: 'Schedule shortcode',
				description:
					'`[clasbpro_schedule]` renders the multi-class calendar; filter which classes appear with comma-separated IDs in the shortcode.'
			},
			{
				title: 'Booking status shortcode',
				description:
					'`[clasbpro_booking_status]` powers success, cancelled, and error result pages after Stripe Checkout.'
			},
			{
				title: 'Elementor widgets',
				description:
					'Pro booking form and schedule calendar widgets—pick a class manually or from the current post, and style book and external-link buttons.'
			}
		]
	},
	{
		id: 'bookings',
		label: 'Bookings',
		title: 'Every reservation in one place',
		intro:
			'A full admin view of who booked, what they paid for, and where each email stands—linked straight back to Stripe.',
		features: [
			{
				title: 'Booking records',
				description:
					'Reference ID, status, class metadata, customer details, seats, total, waiver and mailing-list flags, and additional ACF answers.'
			},
			{
				title: 'Stripe linkage',
				description:
					'Session ID and payment intent stored on each booking for reconciliation and support.'
			},
			{
				title: 'Email delivery status',
				description:
					'Track whether admin, customer, reminder, and post-class emails were sent for each booking.'
			},
			{
				title: 'Sortable listings',
				description:
					'Filter and sort by class date, status, booking reference, or created date to find what you need quickly.'
			}
		]
	},
	{
		id: 'reports',
		label: 'Reports',
		title: 'Know what is working',
		intro:
			'Spot busy classes, track revenue, and see who keeps coming back—summary dashboards and drill-down views without exporting to a spreadsheet first.',
		features: [
			{
				title: 'Summary dashboard',
				description:
					'Bookings-by-class graph with year selector, upcoming class occupancy, and the next three sessions per class with attendee lists.'
			},
			{
				title: 'Class analytics',
				description:
					'Revenue per class, students per month, occupancy per session, cumulative revenue, and bookings by day of week.'
			},
			{
				title: 'Customer directory',
				description:
					'Searchable list with sortable columns, one-click email, CSV download, and a shortcut to that customer’s full booking history.'
			}
		]
	},
	{
		id: 'themes',
		label: 'Themes',
		title: 'Booking forms that look like yours',
		intro:
			'A gallery of ready-made designs for forms and calendars—preview live, install into your theme in one click, or download the files and make them your own.',
		features: [
			{
				title: 'Theme gallery',
				description:
					'Browse supplied designs with search, tags, and descriptions. Enable a gallery theme or keep the plugin default fallback.'
			},
			{
				title: 'Live preview',
				description:
					'Open a modal preview of booking and status forms before enabling a theme—see exactly what customers will get.'
			},
			{
				title: 'Install to theme',
				description:
					'Copy template files into your active WordPress theme so you can edit PHP, CSS, and assets locally.'
			},
			{
				title: 'Download ZIP',
				description:
					'Export every file in a theme package—booking form, status page, bootstrap, icons, and theme.json—in one archive.'
			},
			{
				title: 'Template overrides',
				description:
					'Override `booking-form.php` and `booking-status.php` in your theme, customise labels via `bootstrap.php`, and style with `theme.json`.'
			},
			{
				title: 'Responsive layouts',
				description:
					'Gallery themes and default templates adapt across desktop, tablet, and mobile breakpoints.'
			}
		]
	},
	{
		id: 'developers',
		label: 'Developers',
		title: 'Extend without forking the plugin',
		intro:
			'Documented hooks, filters, and REST endpoints for agencies and builders who need booking data and templates wired into a larger stack.',
		features: [
			{
				title: 'Actions & filters',
				description:
					'WordPress hooks throughout booking forms, status templates, emails, and checkout—for labels, data, and rendering.'
			},
			{
				title: 'REST API',
				description:
					'HTTP endpoints for integrating bookings and class data with external tools, dashboards, or custom front ends.'
			},
			{
				title: 'ACF integration',
				description:
					'Add fields to forms via Advanced Custom Fields; values persist on bookings and appear in admin metadata.'
			},
			{
				title: 'Theme override order',
				description:
					'Choose whether gallery themes, plugin defaults, or files in your theme directory take priority.'
			}
		]
	}
];
