<script>
	import { appName } from '$lib/util/store';
	import P from '$lib/components/P.svelte';
	import A from '$lib/components/A.svelte';
</script>

<svelte:head>
	<title>About {$appName}</title>
	<meta name="description" content="Sudoku game with custom hint value" />
</svelte:head>

<main class="grid gap-8 pt-6">
	<h1 class="text-center text-3xl font-bold text-snow-300">Hello, I'm Grant!</h1>
	<P>
		I like Sudoku puzzles and I like learning new things. I made this game to give myself a reason
		to experiment with <A href="https://kit.svelte.dev" target="_blank">svelte-kit</A>. Code
		available on
		<A target="_blank" href="https://github.com/lettucebowler/sveltedoku">Github</A>.
	</P>
</main>
