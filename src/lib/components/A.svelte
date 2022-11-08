<script>
	export let target = '_blank';
	export let href = '';
</script>

<a class="text-aurora-400" {target} {href} rel={target === '_blank' ? 'noreferrer' : undefined}>
	<slot />
</a>
