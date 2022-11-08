<script lang="ts">
	import '$lib/assets/app.css';
	import PageContentContainer from '$lib/components/PageContentContainer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import smallFavicon from '$lib/assets/favicon-16x16.png';
	import bigFavicon from '$lib/assets/favicon-32x32.png';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import safariPinnedTabIcon from '$lib/assets/safari-pinned-tab.svg';

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
</svelte:head>

<PageContentContainer>
	<Navbar {links} />
	<slot />
</PageContentContainer>

<style>
	:global(body) {
		background-color: var(--nord-0);
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

	:global(::-webkit-scrollbar) {
		width: 16px;
		height: 1em;
	}

	:global(::-webkit-scrollbar-track) {
		background: transparent;
		border-radius: 100vw;
		margin-block: 4px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #4c566a;
		border: 0.25em solid #2e3440;
		border-radius: 100vw;
	}
</style>
