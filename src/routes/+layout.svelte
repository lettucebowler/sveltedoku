<script lang="ts">
	import '$lib/assets/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import smallFavicon from '$lib/assets/favicon-16x16.png';
	import bigFavicon from '$lib/assets/favicon-32x32.png';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import safariPinnedTabIcon from '$lib/assets/safari-pinned-tab.svg';
	import { appName } from '$lib/util/store';

	const links = [
		{
			path: '/',
			name: 'Home'
		},
		{
			path: '/about',
			name: 'About'
		}
	];
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<link rel="icon" type="image/png" sizes="32x32" href={bigFavicon} />
	<link rel="icon" type="image/png" sizes="16x16" href={smallFavicon} />
	<link rel="mask-icon" href={safariPinnedTabIcon} color="#a3be8c" />
	<title>{$appName}</title>
	<meta name="description" content="Sudoku game" />
</svelte:head>

<div
	class="mx-auto box-border flex flex max-h-[100dvh] w-full max-w-screen-md flex-auto flex-col gap-2 p-1"
>
	<Navbar {links} />
	<div class="box-border flex w-full flex-auto flex-col items-center">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		margin: 0px 0px;
		display: flex;
		flex-direction: column;
	}

	:global(#svelte) {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
	}

	:global(body, html) {
		height: 100%;
		min-height: 100%;
		overflow-y: overlay;
	}
</style>
