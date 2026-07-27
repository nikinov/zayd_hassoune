import { siteUrl } from '$lib/data/seo';

export const prerender = true;

export function GET() {
	const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
