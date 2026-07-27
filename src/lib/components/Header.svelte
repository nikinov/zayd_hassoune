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
		onclick={() => (open = !open)}
	>
		<span></span><span></span>
	</button>

	<nav class="main-nav" class:open>
		{#each nav as item (item.href)}
			<a href={item.href} onclick={() => (open = false)}>{item.label}</a>
		{/each}
		<a href="#contact" class="nav-cta" onclick={() => (open = false)}>Contact</a>
	</nav>
</header>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 5vw;
		z-index: 20;
		mix-blend-mode: difference;
		transition:
			padding 0.35s ease,
			background-color 0.35s ease,
			border-color 0.35s ease;
	}

	.site-header.scrolled {
		mix-blend-mode: normal;
		color: var(--white);
		padding-top: 16px;
		padding-bottom: 16px;
		background: rgba(5, 5, 5, 0.72);
		backdrop-filter: blur(16px) saturate(140%);
		-webkit-backdrop-filter: blur(16px) saturate(140%);
		border-bottom: 1px solid var(--line);
	}

	/* Without backdrop-filter support the translucent bar would leave the light
	   sections showing through behind white text. */
	@supports not (backdrop-filter: blur(1px)) {
		.site-header.scrolled {
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
		width: 38px;
		height: 38px;
		border: 1px solid currentColor;
		border-radius: 50%;
		font-family: var(--serif);
		letter-spacing: 0;
	}

	.main-nav {
		display: flex;
		gap: 34px;
		align-items: center;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.main-nav a {
		opacity: 0.72;
		transition: opacity 0.3s ease;
	}

	.main-nav a:hover {
		opacity: 1;
	}

	.nav-cta {
		border: 1px solid currentColor;
		padding: 10px 16px;
		border-radius: 999px;
	}

	.menu-toggle {
		display: none;
		border: 0;
		background: transparent;
		width: 34px;
		height: 30px;
		position: relative;
		cursor: pointer;
	}

	.menu-toggle span {
		position: absolute;
		left: 0;
		width: 100%;
		height: 1px;
		background: white;
		transition: 0.3s ease;
	}

	.menu-toggle span:first-child {
		top: 10px;
	}

	.menu-toggle span:last-child {
		top: 20px;
	}

	@media (max-width: 980px) {
		.main-nav {
			position: fixed;
			inset: 0;
			background: var(--black);
			flex-direction: column;
			justify-content: center;
			gap: 32px;
			font-size: 17px;
			transform: translateY(-100%);
			transition: transform 0.4s ease;
			mix-blend-mode: normal;
		}

		.main-nav.open {
			transform: translateY(0);
		}

		.menu-toggle {
			display: block;
			z-index: 2;
		}

		.menu-toggle.active span:first-child {
			top: 15px;
			transform: rotate(45deg);
		}

		.menu-toggle.active span:last-child {
			top: 15px;
			transform: rotate(-45deg);
		}
	}

	@media (max-width: 680px) {
		.brand-name {
			display: none;
		}
	}
</style>
