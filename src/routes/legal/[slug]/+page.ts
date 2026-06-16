import { error } from '@sveltejs/kit';
import { getAllLegal, getLegal } from '$lib/legal';

export function load({ params }) {
	const page = getLegal(params.slug);
	if (!page) error(404, 'Not found');
	return { page };
}

export function entries() {
	return getAllLegal().map((p) => ({ slug: p.slug }));
}

export const prerender = true;
