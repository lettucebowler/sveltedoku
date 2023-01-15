<script lang="ts">
	import '$lib/assets/app.css';
	import { page } from '$app/stores';

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
	<nav
		class="box-border flex justify-between gap-x-1 rounded-2xl bg-charade-600 p-1"
		id="primary-nav"
	>
		{#each links as link}
			<a
				data-sveltekit-preload-data
				class="flex h-14 flex-[1_0_auto] cursor-pointer rounded-xl text-3xl font-medium text-snow-300 hover:bg-charade-700 active:bg-charade-800"
				class:bg-charade-700={link.path === $page.url.pathname}
				href={link.path}
				><span class="grid h-full w-full place-items-center p-2 text-center duration-150">
					{link.name}
				</span></a
			>
		{/each}
	</nav>
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
