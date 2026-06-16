/** WordPress.org screenshot captions (readme.txt) keyed by number. */
export const screenshotCaptions: Record<number, string> = {
	1: 'Settings Page — Stripe Settings',
	2: 'Settings Page — Email Settings',
	3: 'Settings Page — Form extras',
	4: 'Settings Page — Result pages',
	5: 'Settings Page — Developer details',
	6: 'Settings Page — Help',
	7: 'Class Listing Page',
	8: 'Class Edit Page — Weekly Classes',
	9: 'Class Edit Page — One-off Events',
	10: 'Class Edit Page — External links',
	11: 'Bookings Listing Page',
	12: 'Booking details',
	13: 'Reports Page',
	14: 'Frontend Form',
	15: 'Frontend Confirmation',
	16: 'Frontend Error',
	17: 'Frontend Cancelled',
	18: 'Customised Form Example 1',
	19: 'Customised Form Example 2',
	20: 'Stripe Checkout Text',
	21: 'Shortcode',
	22: 'Elementor widget — content',
	23: 'Elementor widget — Style',
	24: 'ACF Field Group Rules'
};

export function screenshotSrc(n: number): string {
	return `/docs/screenshots/screenshot-${n}.png`;
}
