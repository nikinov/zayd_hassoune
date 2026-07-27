<script lang="ts">
	import '$lib/styles/app.css';
	import Noise from '$lib/components/Noise.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const year = new Date().getFullYear();
</script>

<Noise />
<Header />

<main id="top">
	{@render children()}
</main>

<Footer {year} />
