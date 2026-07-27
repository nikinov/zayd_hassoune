<script lang="ts">
	import { nav, site } from '$lib/data/site';

	let open = $state(false);
	let scrollY = $state(0);

	// Past the fold the header sits over light sections, where `difference`
	// blending turns it into mush — swap to a solid blurred bar instead.
	const scrolled = $derived(scrollY > 40);

	$effect(() => {
		document.body.classList.toggle('menu-open', open);
		return () => document.body.classList.remove('menu-open');
	});
</script>

<svelte:window bind:scrollY />

<header class="site-header" class:scrolled={scrolled || open}>
	<a href="#top" class="brand" aria-label="Homepage">
		<span class="brand-mark">{site.initials}</span>
		<span class="brand-name">{site.name}</span>
	</a>

	<button
		class="menu-toggle"
		class:active={open}
		aria-label={open ? 'Close menu' : 'Open menu'}
		aria-expanded={open}
		aria-controls="main-nav"
		onclick={() => (open = !open)}
	>
		<span></span><span></span>
	</button>

	<nav id="main-nav" class="main-nav" class:open>
		{#each nav as item (item.href)}
			<a href={item.href} onclick={() => (open = false)}>{item.label}</a>
		{/each}
		<a href="#contact" class="nav-cta" onclick={() => (open = false)}>Contact</a>
	</nav>
</header>

<style>
	/* Mobile first: the base rules are the phone layout, widened at 681px and
	   again at 981px. */
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 24px;
		z-index: 20;
		mix-blend-mode: difference;
		transition: padding 0.35s ease;
	}

	/* The blurred bar lives on a pseudo-element rather than on .site-header
	   itself: backdrop-filter would make the header a containing block for
	   fixed-position descendants, which drags the fullscreen mobile nav inside
	   the header box and leaves its links showing through. */
	.site-header::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: rgba(5, 5, 5, 0.72);
		backdrop-filter: blur(16px) saturate(140%);
		-webkit-backdrop-filter: blur(16px) saturate(140%);
		border-bottom: 1px solid var(--line);
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.site-header.scrolled {
		mix-blend-mode: normal;
		color: var(--white);
	}

	.site-header.scrolled::before {
		opacity: 1;
	}

	/* Without backdrop-filter support the translucent bar would leave the light
	   sections showing through behind white text. */
	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		.site-header::before {
			background: rgba(5, 5, 5, 0.94);
		}
	}

	.brand {
		display: flex;
		gap: 14px;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 12px;
		font-weight: 500;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 38px;
		height: 38px;
		border: 1px solid currentColor;
		border-radius: 50%;
		font-family: var(--serif);
		letter-spacing: 0;
	}

	.brand-name {
		display: none;
	}

	.main-nav {
		position: fixed;
		inset: 0;
		z-index: 1;
		background: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 32px;
		font-size: 17px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		mix-blend-mode: normal;
		transform: translateY(-100%);
		visibility: hidden;
		transition:
			transform 0.4s ease,
			visibility 0.4s ease;
	}

	/* Hidden until opened, so off-screen links cannot be tabbed into. */
	.main-nav.open {
		transform: translateY(0);
		visibility: visible;
	}

	.main-nav a {
		opacity: 0.72;
		transition: opacity 0.3s ease;
	}

	.main-nav a:hover,
	.main-nav a:focus-visible {
		opacity: 1;
	}

	.nav-cta {
		border: 1px solid currentColor;
		padding: 10px 16px;
		border-radius: 999px;
	}

	.menu-toggle {
		/* 44px keeps the tap target at the recommended minimum; the bars stay 34px. */
		position: relative;
		z-index: 2;
		display: block;
		width: 44px;
		height: 44px;
		margin-right: -5px;
		border: 0;
		padding: 0;
		background: transparent;
		color: inherit;
		cursor: pointer;
	}

	.menu-toggle span {
		position: absolute;
		left: 5px;
		width: 34px;
		height: 1px;
		background: currentColor;
		transition: 0.3s ease;
	}

	.menu-toggle span:first-child {
		top: 17px;
	}

	.menu-toggle span:last-child {
		top: 27px;
	}

	.menu-toggle.active span:first-child {
		top: 22px;
		transform: rotate(45deg);
	}

	.menu-toggle.active span:last-child {
		top: 22px;
		transform: rotate(-45deg);
	}

	@media (min-width: 681px) {
		.site-header {
			padding: 20px 5vw;
		}

		.brand-name {
			display: block;
		}
	}

	@media (min-width: 981px) {
		.site-header {
			padding: 24px 5vw;
		}

		.site-header.scrolled {
			padding-top: 16px;
			padding-bottom: 16px;
		}

		.main-nav {
			position: static;
			z-index: auto;
			background: transparent;
			flex-direction: row;
			gap: 34px;
			font-size: 12px;
			transform: none;
			visibility: visible;
		}

		.menu-toggle {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-header,
		.site-header::before,
		.main-nav,
		.menu-toggle span {
			transition: none;
		}
	}
</style>
