<script>
	import { appName } from '$lib/util/store';
	import P from '$lib/components/util/P.svelte';
	import A from '$lib/components/util/A.svelte';
	import Card from '$lib/components/util/Card.svelte';
</script>

<svelte:head>
	<title>About {$appName}</title>
	<meta name="description" content="Sudoku game with custom hint value" />
</svelte:head>

<Card>
	<h1 class="text-6xl m-0 font-bold text-center">Hello, I'm Grant!</h1>
	<P>
		I like Sudoku puzzles and I like learning new things. I made this game to give myself a reason
		to experiment with <a href="https://kit.svelte.dev" target="_blank">svelte-kit</a>. Code
		available on
		<A target="_blank" href="https://github.com/lettucebowler/sveltedoku">Github</A>.
	</P>
</Card>
