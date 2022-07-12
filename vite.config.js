import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [VitePWA({ registerType: 'autoUpdate' }), sveltekit()]
};

export default config;
