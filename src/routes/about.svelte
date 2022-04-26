<script context="module">
	export const hydrate = false;
	export const prerender = true;
</script>

<script>
	import { appName } from '$lib/util/store';
</script>

<svelte:head>
	<title>About {$appName}</title>
	<meta name="description" content="Sudoku game with custom hint value" />
</svelte:head>

<div class="card">
	<h1>Hello, I'm Grant!</h1>
	<p>
		I like Sudoku puzzles and I like learning new things. I made this game to give myself a reason to experiment with <a
			href="https://kit.svelte.dev"
			target="_blank">svelte-kit</a
		>. Code available on
		<a target="_blank" href="https://github.com/lettucebowler/sveltedoku">Github</a>.
	</p>
</div>

<style>
	.card {
		justify-content: start;
		flex-direction: column;
		padding: 8px 32px;
		border-radius: 12px;
		color: var(--nord-4);
		background-color: var(--nord-1);
	}

	h1 {
		font-size: 3.75rem;
		text-align: center;
	}

	p {
		font-size: 1.5rem;
	}

	a {
		text-decoration: none;
		color: var(--nord-14);
	}
</style>
