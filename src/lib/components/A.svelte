<script lang="ts">
	import type { Snippet } from "svelte";
	let { target = '_blank', href = '', children}: { target: string; href: string; children: Snippet} = $props();

</script>

<a class="text-aurora-400" {target} {href} rel={target === '_blank' ? 'noreferrer' : undefined}>
	{@render children()}
</a>
