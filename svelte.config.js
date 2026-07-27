import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Every route is prerendered (see src/routes/+layout.ts), so this deploys
		// as static assets on Vercel's CDN — no serverless functions involved.
		// `runtime` is pinned only so the adapter does not have to infer it from
		// the local Node version; it applies if server routes are added later.
		adapter: adapter({ runtime: 'nodejs22.x' })
	}
};

export default config;
