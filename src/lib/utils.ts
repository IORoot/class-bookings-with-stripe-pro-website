import { marked } from 'marked';

marked.setOptions({
	gfm: true,
	breaks: false
});

export function renderMarkdown(source: string): string {
	return marked.parse(source) as string;
}

function docFigureFromImg(attrs: string): string {
	const src = attrs.match(/\bsrc="([^"]+)"/)?.[1];
	if (!src) return `<img ${attrs}>`;

	const alt = attrs.match(/\balt="([^"]*)"/)?.[1] ?? '';
	const imgAttrs = attrs
		.replace(/\s*\b(loading|decoding)="[^"]*"/g, '')
		.trim();

	return `<figure class="doc-figure"><a href="${src}" target="_blank" rel="noopener noreferrer" class="doc-figure-link" aria-label="Open full-size image: ${alt}"><img ${imgAttrs} loading="lazy" decoding="async" /></a>${alt ? `<figcaption>${alt}</figcaption>` : ''}</figure>`;
}

export function enhanceDocImages(html: string): string {
	const linkedFigure = /<a[^>]*class="doc-figure-link"[^>]*>[\s\S]*?<\/a>/gi;
	const placeholders: string[] = [];

	const protectedHtml = html.replace(linkedFigure, (match) => {
		placeholders.push(match);
		return `__DOC_FIGURE_PLACEHOLDER_${placeholders.length - 1}__`;
	});

	const enhanced = protectedHtml
		.replace(/<p>\s*<img\s+([^>]*?)\s*\/?>\s*<\/p>/gi, (_, attrs) => docFigureFromImg(attrs))
		.replace(/<img\s+([^>]*?)\s*\/?>/gi, (_, attrs) => docFigureFromImg(attrs));

	return placeholders.reduce(
		(result, placeholder, index) =>
			result.replace(`__DOC_FIGURE_PLACEHOLDER_${index}__`, placeholder),
		enhanced
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
