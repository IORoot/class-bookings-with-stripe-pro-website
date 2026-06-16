import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'] })],
	kit: {
		adapter: adapter({
			fallback: '404.html',
			precompress: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'ignore',
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/api/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
