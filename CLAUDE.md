# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Tiny Tides Site is the marketing/business website for Tiny Tides Therapy, a pediatric occupational
therapy and lactation practice in Baltimore. Built with Astro 5 in server (SSR) output mode, deployed
to Vercel.

## Commands

- `npm run dev` / `npm start` — start local dev server (astro dev)
- `npm run build` — typecheck (`astro check`) then build; **run this before considering any change done**
- `npm run preview` — preview the production build locally
- `npm run astro -- <cmd>` — pass through to the Astro CLI

There is no lint script and no test framework/script configured in this repo — don't assume `npm test`
or `npm run lint` exist.

## Tech stack

- **Astro 5**, `output: 'server'`, `@astrojs/vercel` adapter (see `astro.config.mjs`)
- **Svelte 5** for interactive islands (forms, modals) — plain `.astro` components for everything static
- **Tailwind CSS** — custom theme colors (`primary`/`secondary`/`text`/`accent`/`dark`/`light`/`error`)
  and font families in `tailwind.config.mjs`
- **MDX** for content files that need embedded components
- **Partytown** offloads GTM/analytics scripts off the main thread
- TypeScript throughout, `tsconfig.json` extends `astro/tsconfigs/strict`
- Formatting via Prettier (`.prettierrc.json`: no semicolons, single quotes, astro + tailwind plugins) —
  no ESLint is configured

### Third-party integrations
- **Stripe** — payments/checkout (`src/pages/api/verify-payment.ts`)
- **Airtable** — form submission storage/CRM (e.g. `src/pages/api/tummy-time.ts`)
- **Supabase** — client set up in `src/lib/SupabasClient.ts`
- **Nodemailer** — outbound email (`src/utils/sendEmail.ts`, `src/pages/api/email.ts`)

All of these read secrets via `import.meta.env.*` from a gitignored `.env`. Only one env var
(`GOOGLE_MAPS_PLACES_API_KEY`) is declared in Astro's typed env schema in `astro.config.mjs`; the rest
are used untyped. Never hardcode or log these values.

## Content architecture (important, non-obvious)

Content lives as `.md`/`.mdx` files directly inside `src/pages/<section>/` subdirectories, e.g.:
- `src/pages/services/*.md` → aggregated by `src/pages/services.astro`
- `src/pages/groups/*.mdx` → aggregated by `src/pages/groups.astro`
- `src/pages/what-we-treat/*.md`, `src/pages/faqs/*.md`, `src/pages/testamonials/*.md`

Each listing page eager-loads its sibling files with
`import.meta.glob<MarkdownInstance<any>>('./<section>/*md', { eager: true })`, then maps over
`Object.values(...)`, rendering frontmatter fields (title, id, price, duration, img, href, pubDate, etc.)
through a shared display component and the body via `<file.Content />`.

This is **not** Astro Content Collections — there's no `content.config.ts`. Because these files live
under `src/pages/`, Astro's file-based router also exposes each one as its own standalone route in
addition to appearing on the aggregated listing page. Keep this in mind when adding/renaming/moving
content files.

Most day-to-day changes to this repo are small content edits to these frontmatter/body files (dates,
prices, hrefs) rather than feature work — recent git history is dominated by commits like "update month"
or "new baby bunch href".

## Directory structure

- `src/pages/` — file-based routes: top-level `.astro` pages, `api/*.ts` server endpoints, and the
  content subdirectories described above
- `src/components/` — Astro components; `forms/` and `modals/` hold the Svelte islands
- `src/layouts/` — `BaseLayout.astro` (HTML shell, SEO/OG meta, GTM snippet, JSON-LD `MedicalClinic`
  schema.org data with the real business address/phone) and `CourseLayout.svelte`
- `src/lib/` — external client setup (Supabase)
- `src/utils/` — shared helpers (email sending, input validation)
- `public/` — static assets; note many images are instead hosted externally on a CloudFront CDN rather
  than living in this directory
