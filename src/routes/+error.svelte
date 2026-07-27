<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/data/site';
</script>

<Seo title="Page not found — {site.name}" description="This page could not be found." noindex />

<section class="error">
	<p class="eyebrow">Error {page.status}</p>
	<h1>{page.status === 404 ? 'This page has slipped its mooring.' : 'Something went wrong.'}</h1>
	<p class="error-copy">
		{page.error?.message ?? 'An unexpected error occurred.'}
	</p>
	<a href="/" class="button button-light">Back to the homepage</a>
</section>

<style>
	.error {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 160px 7vw 120px;
	}

	.error h1 {
		margin: 0 0 28px;
		font-family: var(--serif);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.035em;
		font-size: clamp(42px, 6vw, 88px);
		max-width: 900px;
	}

	.error-copy {
		color: var(--grey);
		margin: 0 0 44px;
		max-width: 560px;
	}

	.error .button {
		align-self: flex-start;
	}

	@media (max-width: 680px) {
		.error {
			padding: 140px 24px 100px;
		}
	}
</style>
