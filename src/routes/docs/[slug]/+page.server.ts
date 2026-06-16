import { error } from '@sveltejs/kit';
import { getAllDocs, getDoc } from '$lib/docs.server';

export const prerender = true;

export function load({ params }) {
	const doc = getDoc(params.slug);
	if (!doc) error(404, 'Not found');
	return { doc };
}

export function entries() {
	return getAllDocs().map((d) => ({ slug: d.slug }));
}
