import { siteUrl } from '$lib/data/seo';

export const prerender = true;

/** Every prerendered, indexable route. Add entries here as pages are added. */
const routes = [{ path: '', changefreq: 'monthly', priority: '1.0' }];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `	<url>
		<loc>${siteUrl}/${route.path}</loc>
		<changefreq>${route.changefreq}</changefreq>
		<priority>${route.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
