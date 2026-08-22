<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { principles, site } from '$lib/data/site';
</script>

<section id="about" class="about">
	<div class="about-heading" use:reveal>
		<p class="eyebrow">About</p>
		<h2>A relationship-driven approach.</h2>
	</div>

	<div class="about-copy" use:reveal={{ delay: true }}>
		<p>
			Based in Monaco and active across Europe and the Middle East, {site.name} primarily advises private
			clients in yachting, from acquisition and sale to charter and owner representation.
		</p>
		<p>
			In parallel, and only on a selective basis, he facilitates strategic introductions between
			entrepreneurs, companies, investors and family offices where there is clear relevance and
			mutual value.
		</p>
	</div>

	<div class="principles" use:reveal>
		{#each principles as principle (principle.number)}
			<div>
				<span>{principle.number}</span>
				<h3>{principle.title}</h3>
				<p>{principle.body}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.about {
		padding: 100px 24px;
		display: grid;
		gap: 45px;
		background: var(--white);
		color: var(--black);
	}

	.about h2 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.035em;
		font-size: clamp(36px, 8vw, 48px);
	}

	.about-copy {
		max-width: 780px;
		font-size: clamp(18px, 1.8vw, 26px);
		letter-spacing: -0.01em;
	}

	.about-copy p {
		margin: 0 0 28px;
	}

	.principles {
		grid-column: 1 / -1;
		display: grid;
		gap: 1px;
		margin-top: 30px;
		background: var(--dark-line);
		border: 1px solid var(--dark-line);
	}

	.principles > div {
		padding: 32px 24px;
		background: var(--white);
	}

	.principles span {
		font-size: 10px;
		letter-spacing: 0.15em;
		opacity: 0.5;
	}

	.principles h3 {
		font-family: var(--serif);
		font-size: 30px;
		margin: 28px 0 12px;
		font-weight: 500;
	}

	.principles p {
		margin: 0;
		opacity: 0.68;
		font-size: 14px;
	}

	@media (min-width: 681px) {
		.about {
			padding: 120px 7vw;
		}

		.about h2 {
			line-height: 0.98;
			font-size: clamp(48px, 6vw, 86px);
		}

		.principles > div {
			padding: 40px;
		}

		.principles h3 {
			font-size: 34px;
			margin-top: 36px;
		}
	}

	@media (min-width: 981px) {
		.about {
			padding: 140px 7vw 120px;
			grid-template-columns: 0.8fr 1.2fr;
			gap: 100px;
		}

		.principles {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
