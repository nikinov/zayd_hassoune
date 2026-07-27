<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/data/site';
</script>

<section class="hero">
	<div class="hero-grid"></div>

	<div class="hero-content" use:reveal>
		<p class="eyebrow">{site.region}</p>
		<h1>
			Private yachting advisory
			<span>with selective strategic connections.</span>
		</h1>
		<p class="hero-copy">
			Independent support for yacht owners, buyers and charter clients, with discreet access to
			selected investment opportunities and strategic introductions when relevant.
		</p>

		<div class="hero-actions">
			<a href="#verticals" class="button button-light">Explore services</a>
			<a href="#contact" class="text-link">Start a conversation <span>↗</span></a>
		</div>
	</div>

	<div class="hero-art" use:reveal={{ delay: true }} aria-hidden="true">
		<!-- Decorative, but it is the LCP element: eager + high priority, served as
		     AVIF/WebP at several widths by enhanced-img. -->
		<enhanced:img
			class="hero-yacht-visual"
			src="$lib/assets/yacht-connected-white-lines.png?w=1200;900;600"
			sizes="(max-width: 980px) 80vw, 45vw"
			alt=""
			loading="eager"
			fetchpriority="high"
		/>
	</div>

	<div class="hero-bottom">
		<span>Discretion</span>
		<span>Access</span>
		<span>Execution</span>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		/* svh accounts for mobile browser chrome, so the hero is not cut off. */
		min-height: 100svh;
		position: relative;
		display: grid;
		align-items: center;
		padding: 128px 24px 96px;
		overflow: hidden;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
		background-size: 70px 70px;
		mask-image: linear-gradient(to bottom, black, transparent 90%);
	}

	.hero-content,
	.hero-art,
	.hero-bottom {
		position: relative;
		z-index: 2;
	}

	.hero h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 0.98;
		letter-spacing: -0.035em;
		font-size: clamp(38px, 10.5vw, 58px);
		max-width: 900px;
	}

	.hero h1 span {
		display: block;
		color: var(--grey);
		font-style: italic;
		font-size: 0.6em;
		line-height: 1.08;
		margin-top: 20px;
		max-width: 770px;
	}

	.hero-copy {
		max-width: 620px;
		color: #c6c6c1;
		font-size: clamp(16px, 1.4vw, 20px);
		margin: 32px 0 36px;
	}

	.hero-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}

	.hero-bottom {
		position: absolute;
		left: 24px;
		right: 24px;
		bottom: 24px;
		display: flex;
		justify-content: space-between;
		gap: 12px;
		border-top: 1px solid var(--line);
		padding-top: 18px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 10px;
		color: var(--grey);
	}

	/* On phones the illustration is atmosphere behind the copy rather than a
	   column of its own. */
	.hero-art {
		position: absolute;
		right: -43%;
		bottom: 12%;
		width: 105%;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 0;
	}

	/* enhanced-img wraps the image in <picture>; keep the img itself as the flex
	   item so the sizing below still applies. */
	.hero-art :global(picture) {
		display: contents;
	}

	.hero-yacht-visual {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
		mix-blend-mode: screen;
		filter: contrast(1.08) brightness(1.04);
		opacity: 0.25;
		transform: translateY(2%);
		-webkit-mask-image: radial-gradient(ellipse 92% 86% at 50% 50%, #000 62%, transparent 100%);
		mask-image: radial-gradient(ellipse 92% 86% at 50% 50%, #000 62%, transparent 100%);
	}

	@media (min-width: 681px) {
		.hero {
			padding: 150px 5vw 90px;
		}

		.hero h1 {
			font-size: clamp(58px, 7.5vw, 126px);
		}

		.hero h1 span {
			font-size: 0.58em;
		}

		.hero-copy {
			margin: 36px 0 40px;
		}

		.hero-actions {
			flex-direction: row;
			align-items: center;
			gap: 28px;
		}

		.hero-bottom {
			left: 5vw;
			right: 5vw;
			bottom: 28px;
			letter-spacing: 0.18em;
		}

		.hero-art {
			width: 72%;
			right: -9%;
			bottom: 10%;
		}

		.hero-yacht-visual {
			opacity: 0.42;
		}
	}

	@media (min-width: 981px) {
		.hero {
			grid-template-columns: 1.05fr 0.95fr;
			padding-top: 140px;
		}

		/* Wide enough for the illustration to become its own column. */
		.hero-art {
			position: static;
			width: auto;
		}

		.hero-yacht-visual {
			width: min(100%, 920px);
			opacity: 0.96;
		}
	}
</style>
