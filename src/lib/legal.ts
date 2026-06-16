import matter from 'gray-matter';

export type LegalPage = {
	slug: string;
	title: string;
	description: string;
	content: string;
};

const modules = import.meta.glob('../content/legal/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

function parse(path: string, raw: string): LegalPage {
	const { data, content } = matter(raw);
	const slug = path.split('/').pop()!.replace('.md', '');
	return {
		slug,
		title: (data.title as string) ?? slug,
		description: (data.description as string) ?? '',
		content
	};
}

export function getAllLegal(): LegalPage[] {
	return Object.entries(modules).map(([path, raw]) => parse(path, raw));
}

export function getLegal(slug: string): LegalPage | undefined {
	return getAllLegal().find((p) => p.slug === slug);
}
