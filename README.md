# Zayd Hassoune — Private Yachting Advisory

SvelteKit port of the original static HTML/CSS prototype, with content taken from the
live site at [zaydhassoune.com](https://www.zaydhassoune.com).

Every route is prerendered, so the site deploys as static CDN assets. It ships with
`@sveltejs/adapter-vercel`; swap the adapter in [svelte.config.js](svelte.config.js) for
`adapter-static`, `adapter-netlify` or `adapter-cloudflare` to host it elsewhere.

Deploying on Vercel: set the Framework Preset to **SvelteKit** and leave Build Command,
Output Directory and Install Command on their defaults.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server with HMR                       |
| `npm run build`   | Prerenders the site into `.vercel/output` |
| `npm run preview` | Serves the production build locally       |
| `npm run check`   | Type + a11y checks via `svelte-check`     |

## Structure

```
src/
  routes/
    +layout.svelte      Noise overlay, header, footer
    +layout.ts          prerender = true
    +page.svelte        Section order and page metadata
  lib/
    data/site.ts        All copy, nav, process steps and form questionnaires
    components/         One component per section
    actions/reveal.ts   Scroll-reveal action (IntersectionObserver)
    styles/app.css      Tokens, base elements, shared form + button styles
    assets/             Images (hashed by Vite at build time)
static/                 favicon
```

Section-specific CSS lives in each component's `<style>` block; only design tokens and
genuinely shared primitives (`.button`, `.field`, `.eyebrow`, `.reveal`) are global.

### Editing content

Nearly all copy lives in [src/lib/data/site.ts](src/lib/data/site.ts) — contact details,
navigation, the two service verticals, preferred shipyards, client cities, the five-step
process and every field of the dynamic enquiry questionnaires. Adding a question to the
charter/sale/purchase forms is a matter of adding one object to the relevant array.

## Contact form

The form reproduces the prototype's conditional flow: choosing **Yachting enquiry**
reveals a service selector, which in turn swaps in the charter, sale or acquisition
questionnaire; any other choice shows a plain message box instead.

Submission is wired to an optional endpoint. Copy `.env.example` to `.env` and set:

```
PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

The form then POSTs its `FormData` there (works with Formspree, Brevo, HubSpot forms, a
CRM webhook or your own function). Left unset, the form validates and confirms locally
without sending anything, so the site is safe to deploy before the CRM is chosen.

## SEO

- **Metadata** is centralised in [src/lib/data/seo.ts](src/lib/data/seo.ts) and rendered
  by [Seo.svelte](src/lib/components/Seo.svelte): title, description, canonical, robots,
  Open Graph and Twitter card. Pass `title` / `description` / `noindex` props to override
  per route.
- **Structured data** — a JSON-LD `@graph` with linked `ProfessionalService`, `Person`,
  `WebSite` and `HowTo` (the five-step process) nodes, including address, `areaServed`
  for all eight client hubs and an offer catalogue built from the service lists. Validate
  changes at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- **`/robots.txt` and `/sitemap.xml`** are prerendered endpoints, so they stay in sync
  with `PUBLIC_SITE_URL`. Add new routes to the `routes` array in
  [sitemap.xml/+server.ts](src/routes/sitemap.xml/+server.ts).
- **Images** go through `@sveltejs/enhanced-img`, which emits AVIF/WebP at several widths
  with intrinsic dimensions set. The hero visual drops from 545 KB to ~8 KB, and it is
  marked `fetchpriority="high"` since it is the LCP element.
- **`/og-image.jpg`** is a 1200×630 share card in the site's own type and palette.

`PUBLIC_SITE_URL` must be set per environment — canonical tags pointing at the wrong host
will keep the deployment out of the index. It defaults to `https://www.zaydhassoune.com`.

### Worth doing before launch

The `<h1>` currently reads "Private yachting advisory" and does not contain the primary
search term. The `<title>` and structured data target *yacht broker Monaco*, but a visible
heading carries more weight — consider working the phrase into the hero or the About
section. That is a copy decision, so it was left alone.

## Notes on content

The prototype's own copy (hero, the two verticals, the positioning quote, about and
principles) was carried over verbatim. Three blocks were added from the live site so the
Svelte version is not missing real business content: preferred shipyards, client
locations and the five-step process. Their wording is paraphrased from
zaydhassoune.com — review before launch.

## Possible next steps

- Bilingual EN/FR routing (`/[[lang]]`)
- Real yacht listings from a CMS or brokerage feed
- Cookie / privacy / sitemap pages, as on the live site
