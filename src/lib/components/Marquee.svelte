<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { shipyards, locations } from '$lib/data/site';
</script>

<section class="marquee-block" use:reveal>
	<div class="row">
		<p class="eyebrow">Preferred shipyards</p>
		<ul class="tags">
			{#each shipyards as yard (yard)}
				<li>{yard}</li>
			{/each}
		</ul>
	</div>

	<div class="row">
		<p class="eyebrow">Clients based in</p>
		<ul class="tags tags-muted">
			{#each locations as city (city)}
				<li>{city}</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.marquee-block {
		padding: 90px 5vw;
		display: grid;
		gap: 60px;
		border-bottom: 1px solid var(--line);
	}

	.row .eyebrow {
		color: var(--grey);
		margin-bottom: 26px;
	}

	.tags {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 14px 40px;
		font-family: var(--serif);
		font-size: clamp(22px, 2.6vw, 38px);
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.tags-muted {
		font-family: var(--sans);
		font-size: clamp(13px, 1.1vw, 15px);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--grey);
		gap: 12px 34px;
	}

	@media (max-width: 680px) {
		.marquee-block {
			padding: 70px 24px;
			gap: 44px;
		}
	}
</style>
