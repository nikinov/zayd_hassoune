# Zayd Hassoune — Private Yachting Advisory

SvelteKit port of the original static HTML/CSS prototype, with content taken from the
live site at [zaydhassoune.com](https://www.zaydhassoune.com).

Built as a fully prerendered static site (`@sveltejs/adapter-static`), so the `build/`
output can be dropped on any static host — Vercel, Netlify, Cloudflare Pages or plain
nginx.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server with HMR                       |
| `npm run build`   | Prerenders the site into `build/`         |
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
