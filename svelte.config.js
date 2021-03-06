import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			out: 'build',
			edge: true
		}),
		inlineStyleThreshold: 4096
	}
};

export default config;
