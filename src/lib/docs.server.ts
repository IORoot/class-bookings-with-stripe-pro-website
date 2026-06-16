import matter from 'gray-matter';

export type DocMeta = {
	slug: string;
	title: string;
	description: string;
	order: number;
	category: string;
	pro?: boolean;
};

export type Doc = DocMeta & {
	content: string;
};

export type DocNavCategory = {
	name: string;
	items: DocMeta[];
};

const modules = import.meta.glob('../content/docs/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string | { default: string }>;

function readRaw(value: string | { default: string }): string {
	if (typeof value === 'string') return value;
	if (value?.default) return value.default;
	throw new Error('Invalid markdown module');
}

function parseDoc(path: string, raw: string | { default: string }): Doc {
	const content = readRaw(raw);
	const { data, content: body } = matter(content);
	const slug = path.split('/').pop()!.replace('.md', '');

	return {
		slug,
		title: (data.title as string) ?? slug,
		description: (data.description as string) ?? '',
		order: (data.order as number) ?? 99,
		category: (data.category as string) ?? 'Guides',
		pro: Boolean(data.pro),
		content: body
	};
}

export function getAllDocs(): Doc[] {
	return Object.entries(modules)
		.map(([path, raw]) => parseDoc(path, raw))
		.sort((a, b) => a.order - b.order);
}

export function getDoc(slug: string): Doc | undefined {
	return getAllDocs().find((d) => d.slug === slug);
}

export function getDocNav(): DocNavCategory[] {
	const docs = getAllDocs();
	const categories = new Map<string, DocMeta[]>();

	for (const doc of docs) {
		const list = categories.get(doc.category) ?? [];
		list.push(doc);
		categories.set(doc.category, list);
	}

	return [...categories.entries()].map(([name, items]) => ({
		name,
		items: items.sort((a, b) => a.order - b.order)
	}));
}
