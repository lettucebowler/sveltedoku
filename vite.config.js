import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		assetsInlineLimit: 1024
	},
	server: {
		host: true
	}
};

export default config;
