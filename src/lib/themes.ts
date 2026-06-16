import themesData from '$lib/data/themes.json';

export type ThemeTag = 'premium' | 'basic' | 'tutorial';

export type ThemeProvides =
	| 'booking-form'
	| 'booking-status'
	| 'style'
	| 'labels';

export interface ThemeEntry {
	slug: string;
	name: string;
	description: string;
	version: string;
	provides: ThemeProvides[];
	tags: ThemeTag[];
	screenshotUrl: string;
	repoUrl: string;
}

export interface ThemesManifest {
	syncedAt: string;
	source: string;
	repoUrl: string;
	count: number;
	themes: ThemeEntry[];
}

export const themesManifest = themesData as ThemesManifest;

export function getAllThemes(): ThemeEntry[] {
	return themesManifest.themes;
}

export const themeTagLabels: Record<ThemeTag, string> = {
	premium: 'Premium',
	basic: 'Basic',
	tutorial: 'Tutorial'
};

export const provideLabels: Record<ThemeProvides, string> = {
	'booking-form': 'Booking form',
	'booking-status': 'Status pages',
	style: 'Styles',
	labels: 'Labels only'
};
