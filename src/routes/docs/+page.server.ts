import { getAllDocs } from '$lib/docs.server';

export const prerender = true;

export function load() {
	return {
		docs: getAllDocs().map(({ slug, title, description, category, pro }) => ({
			slug,
			title,
			description,
			category,
			pro
		}))
	};
}
