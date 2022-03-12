<script context="module">
	export const hydrate = false;
	export const prerender = true;
</script>

<script>
	import { appName } from '$lib/util/store';
</script>

<title>About {$appName}</title>
<main>
	<h1>Hello I'm Grant!</h1>
	<p>
		I like Sudoku puzzles. I made this game to give myself a reason to experiment with <a
			href="https://kit.svelte.dev"
			target="_blank">svelte-kit</a
		>. Code for this project can be found
		<a target="_blank" href="https://github.com/lettucebowler/sveltedoku">here</a>.
	</p>
</main>

<style>
	main {
		justify-content: start;
		flex-direction: column;
		display: flex;
		padding: 0 30px;
		text-align: center;
		min-height: 50vh;
		color: var(--nord-4);
		height: 95vh;
	}

	h1 {
		font-size: 3.75rem;
	}

	p {
		font-size: 1.5rem;
	}

	a {
		text-decoration: none;
		color: var(--nord-14);
	}
</style>
