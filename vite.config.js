import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: {
				name: 'WordLettuce',
				short_name: 'WordLettuce',
				description: 'WordLettuce',
				theme_color: '#2e3440',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		}),
		sveltekit()
	]
};

export default config;
