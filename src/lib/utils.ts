import { marked } from 'marked';

marked.setOptions({
	gfm: true,
	breaks: false
});

export function renderMarkdown(source: string): string {
	return marked.parse(source) as string;
}

export function enhanceDocImages(html: string): string {
	return html.replace(
		/<p><img src="([^"]+)" alt="([^"]*)"([^>]*)><\/p>/g,
		'<figure class="doc-figure"><img src="$1" alt="$2"$3 loading="lazy" decoding="async" /><figcaption>$2</figcaption></figure>'
	);
}

function tableHeaderTexts(inner: string): string[] {
	const headerRow = inner.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>/);
	if (!headerRow) return [];

	const headers: string[] = [];
	const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/g;
	let match: RegExpExecArray | null;

	while ((match = thRegex.exec(headerRow[1])) !== null) {
		headers.push(match[1].replace(/<[^>]+>/g, '').trim().toLowerCase());
	}

	return headers;
}

function tableVariantClass(headers: string[]): string {
	if (headers.length === 0) return '';

	if (headers[0] === 'hook' || headers[0] === 'filter') {
		return headers.length === 2 ? ' doc-table--hooks doc-table--hooks-two-col' : ' doc-table--hooks';
	}

	if (headers[0] === 'step') return ' doc-table--steps';
	if (headers.length >= 4) return ' doc-table--wide';
	if (headers.length === 3) return ' doc-table--compare';
	if (headers[0] === 'symptom' || headers[0] === 'issue') return ' doc-table--troubleshoot';

	return ' doc-table--two-col';
}

export function enhanceDocTables(html: string): string {
	return html.replace(/<table>([\s\S]*?)<\/table>/g, (_match, inner: string) => {
		const headers = tableHeaderTexts(inner);
		const variant = tableVariantClass(headers);

		return `<div class="doc-table-wrap"><table class="doc-table${variant}">${inner}</table></div>`;
	});
}

export function enhanceDocContent(html: string): string {
	return enhanceDocTables(enhanceDocImages(html));
}

export function slugify(text: string): string {
	return text
		.replace(/&amp;/gi, ' and ')
		.replace(/&/g, ' and ')
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

export function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
	const headings: { id: string; text: string; level: number }[] = [];
	const regex = /^(#{2,3})\s+(.+)$/gm;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(markdown)) !== null) {
		const text = match[2].trim();
		headings.push({
			level: match[1].length,
			text,
			id: slugify(text)
		});
	}

	return headings;
}

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
