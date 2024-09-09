<script lang="ts">
	import type { Snippet } from "svelte";

	let { children}: { children: Snippet} = $props();
</script>

<p class="mx-4 text-left text-lg text-snow-300">
	{@render children()}
</p>
