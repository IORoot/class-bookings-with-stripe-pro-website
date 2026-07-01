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
				// Doc screenshots are added to static/docs/images/ over time.
				if (path.startsWith('/docs/images/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
