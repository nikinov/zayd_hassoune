<script lang="ts">
	import '$lib/styles/app.css';
	import Noise from '$lib/components/Noise.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<!-- #top is also the target of the brand mark and the footer's "back to top". -->
<a class="skip-link" href="#top">Skip to content</a>

<Noise />
<Header />

<main id="top" tabindex="-1">
	{@render children()}
</main>

<Footer {year} />
