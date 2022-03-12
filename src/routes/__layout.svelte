<script lang="ts">
	import '$lib/styles/app.css';
	import PageContentContainer from '$lib/components/PageContentContainer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

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
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>
<body>
	<PageContentContainer>
		<Navbar {links} />
		<slot />
	</PageContentContainer>
</body>

<style>
	body {
		background-color: var(--nord-0);
		margin: 0px 0px;
	}
</style>
