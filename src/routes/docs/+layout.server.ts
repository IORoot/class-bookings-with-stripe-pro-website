import { getDocNav } from '$lib/docs.server';

export function load() {
	return { docNav: getDocNav() };
}
