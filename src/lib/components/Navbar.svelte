<script lang="ts">
	import { page } from '$app/stores';

	export let links: {
		path: string;
		name: string;
		margin?: string;
		prefetch?: boolean;
	}[] = [];
</script>

<div id="big-papa-nav">
	<nav
		class="box-border flex justify-between gap-x-1 rounded-2xl bg-polar-400 p-1"
		id="primary-nav"
	>
		{#each links as link}
			<a
				class="flex h-14 flex-[1_0_auto] cursor-pointer overflow-hidden rounded-xl border-transparent p-0 text-3xl font-medium text-snow-300 active:backdrop-brightness-90"
				class:ml-auto={link.margin === 'left'}
				class:backdrop-brightness-90={link.path === $page.url.pathname}
				href={link.path}
				data-sveltekit-prefetch={link.prefetch ? '' : null}
				><span
					class="grid h-full w-full place-items-center p-2 text-center duration-150 hover:backdrop-brightness-90 hover:backdrop-filter"
				>
					<span class="flex items-center gap-2">
						<span>{link.name}</span>
					</span>
				</span></a
			>
		{/each}
	</nav>
</div>
