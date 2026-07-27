<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { verticals } from '$lib/data/site';

	const [yachting, capital] = verticals;
</script>

<section id="verticals" class="verticals">
	<article id={yachting.id} class="vertical-card vertical-yachting" use:reveal>
		<div class="card-number">{yachting.number}</div>
		<div class="card-content">
			<p class="eyebrow">{yachting.eyebrow}</p>
			<h2>{yachting.title}</h2>
			<p>{yachting.body}</p>
			<ul>
				{#each yachting.points as point (point)}
					<li>{point}</li>
				{/each}
			</ul>
			<a href="#contact" class="text-link">{yachting.cta} <span>↗</span></a>
		</div>
		<div class="card-visual yacht-lines" aria-hidden="true">
			<span class="line line-1"></span>
			<span class="line line-2"></span>
			<span class="line line-3"></span>
			<span class="line line-4"></span>
		</div>
	</article>

	<article id={capital.id} class="vertical-card vertical-capital" use:reveal>
		<div class="card-number">{capital.number}</div>
		<div class="card-content">
			<p class="eyebrow">{capital.eyebrow}</p>
			<h2>{capital.title}</h2>
			<p>{capital.body}</p>
			<ul>
				{#each capital.points as point (point)}
					<li>{point}</li>
				{/each}
			</ul>
			<a href="#contact" class="text-link">{capital.cta} <span>↗</span></a>
		</div>
		<div class="card-visual network" aria-hidden="true">
			<span class="dot d1"></span>
			<span class="dot d2"></span>
			<span class="dot d3"></span>
			<span class="dot d4"></span>
			<span class="dot d5"></span>
			<span class="netline n1"></span>
			<span class="netline n2"></span>
			<span class="netline n3"></span>
			<span class="netline n4"></span>
		</div>
	</article>
</section>

<style>
	.verticals {
		display: grid;
	}

	.vertical-card {
		min-height: 0;
		position: relative;
		padding: 64px 24px 72px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 40px;
	}

	.vertical-yachting {
		background: var(--white);
		color: var(--black);
	}

	.vertical-capital {
		background: var(--off-black);
	}

	.card-number {
		font-size: 11px;
		letter-spacing: 0.15em;
		opacity: 0.5;
	}

	.card-content {
		position: relative;
		z-index: 2;
		max-width: 620px;
	}

	.card-content h2 {
		margin: 0 0 28px;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.035em;
		font-size: clamp(34px, 8vw, 46px);
	}

	.card-content > p {
		max-width: 560px;
		opacity: 0.72;
		margin-bottom: 34px;
	}

	.card-content ul {
		list-style: none;
		padding: 0;
		margin: 0 0 40px;
		border-top: 1px solid currentColor;
	}

	.card-content li {
		padding: 15px 0;
		border-bottom: 1px solid currentColor;
		opacity: 0.78;
		font-size: 14px;
	}

	.card-visual {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.yacht-lines .line {
		position: absolute;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 50%;
	}

	.line-1 {
		width: 720px;
		height: 720px;
		right: -290px;
		top: 120px;
	}

	.line-2 {
		width: 560px;
		height: 560px;
		right: -210px;
		top: 200px;
	}

	.line-3 {
		width: 400px;
		height: 400px;
		right: -130px;
		top: 280px;
	}

	.line-4 {
		width: 800px;
		height: 1px;
		right: -80px;
		bottom: 150px;
		background: rgba(0, 0, 0, 0.12);
		border: 0;
		border-radius: 0;
		transform: rotate(-12deg);
	}

	.network .dot {
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.75);
	}

	.d1 {
		right: 14%;
		top: 18%;
	}

	.d2 {
		right: 31%;
		top: 32%;
	}

	.d3 {
		right: 12%;
		top: 50%;
	}

	.d4 {
		right: 40%;
		top: 61%;
	}

	.d5 {
		right: 21%;
		top: 76%;
	}

	.netline {
		position: absolute;
		height: 1px;
		transform-origin: left center;
		background: rgba(255, 255, 255, 0.16);
	}

	.n1 {
		width: 220px;
		right: 14%;
		top: 19%;
		transform: rotate(142deg);
	}

	.n2 {
		width: 220px;
		right: 12%;
		top: 51%;
		transform: rotate(221deg);
	}

	.n3 {
		width: 240px;
		right: 21%;
		top: 77%;
		transform: rotate(232deg);
	}

	.n4 {
		width: 185px;
		right: 31%;
		top: 33%;
		transform: rotate(106deg);
	}

	@media (min-width: 681px) {
		.vertical-card {
			min-height: 720px;
			padding: 80px 6vw;
		}

		.vertical-capital {
			min-height: 620px;
		}

		.card-content h2 {
			font-size: clamp(46px, 5vw, 80px);
			line-height: 0.98;
			margin-bottom: 34px;
		}
	}

	/* Yachting is the primary business, so above 981px it takes the wider column
	   and the larger type; strategic connections becomes the sidebar. */
	@media (min-width: 981px) {
		.verticals {
			grid-template-columns: 1.45fr 0.55fr;
		}

		.vertical-card {
			min-height: 840px;
		}

		.vertical-yachting {
			padding-right: 8vw;
		}

		.vertical-yachting .card-content {
			max-width: 760px;
		}

		.vertical-yachting .card-content h2 {
			font-size: clamp(54px, 6vw, 96px);
		}

		.vertical-capital {
			padding-left: 4vw;
			padding-right: 4vw;
		}

		.vertical-capital .card-content h2 {
			font-size: clamp(36px, 3.5vw, 58px);
		}

		.vertical-capital .card-content > p,
		.vertical-capital .card-content li {
			font-size: 13px;
		}
	}
</style>
