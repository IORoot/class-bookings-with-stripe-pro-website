import { getAllDocs } from '$lib/docs.server';
import { getAllLegal } from '$lib/legal';
import { site } from '$lib/config';

const staticRoutes = [
	'',
	'/details',
	'/themes',
	'/docs',
	'/support',
	'/download',
	'/purchase/success',
	'/purchase/cancelled'
];

export function GET() {
	const urls = [
		...staticRoutes.map((path) => `${site.siteUrl}${path || '/'}`),
		...getAllDocs().map((d) => `${site.siteUrl}/docs/${d.slug}`),
		...getAllLegal().map((p) => `${site.siteUrl}/legal/${p.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}

export const prerender = true;
