export type Video = {
	id: string;
	title: string;
	youtubeId: string;
};

export const videos: Record<string, Video> = {
	quickStart: {
		id: 'quickStart',
		title: 'Quick start: install, API keys & first booking',
		youtubeId: '8B6TxXcDt2E'
	},
	fullSetup: {
		id: 'fullSetup',
		title: 'Full installation & setup guide',
		youtubeId: '7HBBGPZfZL0'
	},
	webhook: {
		id: 'webhook',
		title: 'Stripe webhook setup',
		youtubeId: '54MQBsW8qWA'
	},
	resultPages: {
		id: 'resultPages',
		title: 'Result pages, Developer & Help tabs',
		youtubeId: '8mMCkKxIH-s'
	},
	weekly: {
		id: 'weekly',
		title: 'Creating a weekly repeating class',
		youtubeId: 'k5dlDzCyvoA'
	},
	oneOff: {
		id: 'oneOff',
		title: 'One-off events & workshops',
		youtubeId: 'gzN3yzXWajo'
	},
	extraFields: {
		id: 'extraFields',
		title: 'Extra fields & ACF on the booking form',
		youtubeId: 'BivPyMuCGbQ'
	},
	emails: {
		id: 'emails',
		title: 'Email setup',
		youtubeId: 'dqg_DweIVAo'
	},
	reports: {
		id: 'reports',
		title: 'Bookings list & reports',
		youtubeId: 'D2UpGlkhJWs'
	}
};
