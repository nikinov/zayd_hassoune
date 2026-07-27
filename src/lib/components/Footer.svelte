<script lang="ts">
	import { site } from '$lib/data/site';

	let { year }: { year: number } = $props();
</script>

<footer>
	<span>© {year} {site.name}</span>
	<span>Private Advisory · {site.location}</span>
	<a href="#top">Back to top ↑</a>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 28px 5vw;
		border-top: 1px solid var(--line);
		font-size: 10px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--grey);
	}

	@media (max-width: 680px) {
		footer {
			flex-direction: column;
		}
	}
</style>
