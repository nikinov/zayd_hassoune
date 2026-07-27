<script lang="ts">
	import { page } from '$app/state';
	import { seo, siteUrl, structuredData } from '$lib/data/seo';
	import { site } from '$lib/data/site';

	let {
		title = seo.title,
		description = seo.description,
		noindex = false
	}: { title?: string; description?: string; noindex?: boolean } = $props();

	// Resolved through URL so the form matches the sitemap exactly — the root is
	// emitted with its trailing slash, deeper routes without.
	const canonical = $derived(new URL(page.url.pathname, `${siteUrl}/`).href);
	// Escaping `<` keeps a stray closing script tag in any content field from
	// ending the block early — the standard precaution for inlined JSON-LD.
	const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
	<meta name="author" content={site.name} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content={seo.locale} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={seo.ogImageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={seo.ogImage} />
	<meta name="twitter:image:alt" content={seo.ogImageAlt} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>
