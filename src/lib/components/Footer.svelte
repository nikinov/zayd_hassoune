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
		flex-direction: column;
		gap: 14px;
		padding: 28px 24px;
		border-top: 1px solid var(--line);
		font-size: 10px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--grey);
	}

	@media (min-width: 681px) {
		footer {
			flex-direction: row;
			justify-content: space-between;
			gap: 20px;
			padding: 28px 5vw;
		}
	}
</style>
