import { env } from '$env/dynamic/public';
import { process, site, verticals } from './site';

/**
 * Absolute origin used for canonical URLs, Open Graph tags and the sitemap.
 * Override with PUBLIC_SITE_URL at build time when deploying to a preview or a
 * different domain — a canonical pointing at the wrong host is worse than none.
 */
export const siteUrl = (env.PUBLIC_SITE_URL ?? 'https://www.zaydhassoune.com').replace(/\/$/, '');

export const seo = {
	title: 'Yacht Broker in Monaco — Private Yachting Advisory | Zayd Hassoune',
	/* Kept under ~155 characters so Google is unlikely to truncate it. */
	description:
		'Zayd Hassoune is a private yacht broker in Monaco advising on yacht acquisition, sale and charter, with off-market access across Europe and the Middle East.',
	ogImage: `${siteUrl}/og-image.jpg`,
	ogImageAlt: `${site.name} — private yachting advisory, Monaco`,
	locale: 'en_GB'
};

/**
 * JSON-LD describing the business and the person behind it. Two linked nodes in
 * one @graph so search engines can resolve `founder` rather than guessing that
 * the brand and the individual are the same entity.
 */
export function structuredData() {
	const businessId = `${siteUrl}/#business`;
	const personId = `${siteUrl}/#person`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfessionalService',
				'@id': businessId,
				name: site.name,
				alternateName: `${site.name} — Yacht Broker Monaco`,
				description: seo.description,
				url: siteUrl,
				image: seo.ogImage,
				email: site.email,
				telephone: `+${site.phoneHref.replace(/\D/g, '')}`,
				priceRange: '$$$$',
				founder: { '@id': personId },
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Monaco',
					addressCountry: 'MC'
				},
				areaServed: ['Monaco', 'Europe', 'Middle East'].map((name) => ({
					'@type': 'Place',
					name
				})),
				knowsAbout: [
					'Yacht brokerage',
					'Yacht acquisition',
					'Yacht chartering',
					'Owner representation',
					'Off-market yacht opportunities'
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Yachting and advisory services',
					itemListElement: verticals.flatMap((vertical) =>
						vertical.points.map((point) => ({
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: point,
								serviceType: vertical.eyebrow,
								provider: { '@id': businessId },
								areaServed: 'Worldwide'
							}
						}))
					)
				}
			},
			{
				'@type': 'Person',
				'@id': personId,
				name: site.name,
				jobTitle: 'Yacht Broker',
				description: `Private yacht broker based in ${site.location}, advising owners, buyers and charter clients across Europe and the Middle East.`,
				url: siteUrl,
				email: site.email,
				telephone: `+${site.phoneHref.replace(/\D/g, '')}`,
				worksFor: { '@id': businessId },
				knowsLanguage: ['en', 'fr'],
				homeLocation: { '@type': 'Place', name: site.location }
			},
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: site.name,
				description: seo.description,
				inLanguage: 'en',
				publisher: { '@id': businessId }
			},
			{
				'@type': 'HowTo',
				'@id': `${siteUrl}/#process`,
				name: 'How a yacht acquisition is handled',
				description:
					'The five-step engagement used for every yacht acquisition, from first consultation to charter and resale strategy.',
				step: process.map((step, index) => ({
					'@type': 'HowToStep',
					position: index + 1,
					name: step.title,
					text: step.body,
					url: `${siteUrl}/#process`
				}))
			}
		]
	};
}
