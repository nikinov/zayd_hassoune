<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Verticals from '$lib/components/Verticals.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Statement from '$lib/components/Statement.svelte';
	import Process from '$lib/components/Process.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { site } from '$lib/data/site';
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
	<meta property="og:title" content="{site.name} — {site.tagline}" />
	<meta property="og:description" content={site.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<Hero />
<Verticals />
<Marquee />
<Statement />
<Process />
<About />
<Contact />
