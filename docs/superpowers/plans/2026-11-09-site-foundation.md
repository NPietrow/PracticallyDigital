# Site Foundation Implementation Plan (plan 1 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, sequentially in the main session (per project `CLAUDE.md`). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A complete, locally running Practically Digital site with every MVP page, the "Stone and signal" design, search, SEO outputs and automated accessibility checks, tested against fixture content.

**Architecture:** Astro 7 static site. Articles are Markdown/MDX in an Astro content collection validated by a shared Zod schema. Topic and problem pages are pre-rendered static routes, with no client-side filtering. Plain CSS with design tokens. Pagefind builds the search index after `astro build`. Pure logic (taxonomy, article selection, contents, SEO meta) lives in `src/lib/` and is unit-tested with Vitest. Rendered behaviour is tested with Playwright and axe against `astro preview` of a fixture build.

**Tech Stack:** Astro 7.x, @astrojs/mdx, @astrojs/sitemap, @astrojs/rss, Pagefind 1.x (via astro-pagefind), Vitest, Playwright + @axe-core/playwright, @fontsource/ibm-plex-sans and ibm-plex-mono, TypeScript (strict), npm.

**Spec:** [docs/superpowers/specs/2026-11-09-practically-digital-design.md](../specs/2026-11-09-practically-digital-design.md)

**The three plans:**
1. **Site foundation** (this plan): everything runs locally; merged to `main` via Nikita's first PR.
2. **Deploy and operate:** GitHub Actions CI, Azure Static Web Apps Free plan with PR previews, branch protection, secret scanning, gitleaks, Dependabot, cost guardrails, Cloudflare analytics, domain and DNS runbooks, hosting ADRs, architecture and deployment docs.
3. **Content workflow and launch:** article-request issue template, `/write-article` skill (research subagents, humanizer, fact-check subagent), the Data foundations and Digital twins articles, About details, and the launch checklist.

## Global Constraints

- Site name **Practically Digital**. No earlier working title anywhere in code, copy or docs.
- `site` in Astro config is `https://practicallydigital.co.uk`.
- **Indexing off by default:** pages emit `<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows everything unless env `PUBLIC_ALLOW_INDEXING === "true"`.
- **Drafts:** articles with `draft: true` are excluded from every output (pages, listings, sitemap, RSS, search index) unless env `PUBLIC_SHOW_DRAFTS === "true"`, in which case they render with a visible "Draft" banner.
- **Content directory:** articles load from `src/content/articles/` unless env `PD_CONTENT_DIR` is set. Tests set it to `tests/fixtures/articles`. Fixture content is never placed under `src/`.
- **Taxonomy is fixed** (spec, approved). Topic slugs: `data-foundations`, `ai-and-analytics`, `digital-twins`, `iot-and-connectivity`, `cloud-and-infrastructure`, `digital-strategy`. Problem slugs: `untrusted-data`, `unplanned-downtime`, `no-visibility`, `quality-and-scrap`, `energy-and-cost`, `skills-and-adoption`. Display names as in the spec.
- **Design tokens** (from the approved mockup B): `--stone: #ECECE7`, `--stone-line: #D5D5CE`, `--paper: #FFFFFF`, `--ink: #1B1F23`, `--ink-soft: #3C413B`, `--muted: #62675F`, `--signal: #F2B705`. Signal yellow is never a text colour on light backgrounds. Light theme only for the MVP (Claude's call: the spec defines one palette).
- **Type:** IBM Plex Sans (body and headings), IBM Plex Mono (metadata labels), self-hosted via Fontsource (OFL licence). No third-party font requests.
- **No client JavaScript** except: contents scroll-spy, reading-progress bar and the Pagefind search UI. Every page must be fully readable and navigable with JS disabled.
- **Accessibility:** WCAG 2.2 AA. Zero axe violations (tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`) on every route.
- **Layout:** no horizontal page scroll at 375px width.
- British English in all copy. All page copy gets a humanizer pass before it's committed.
- Node `>=22.23.4` (`engines` in `package.json`, plus `.nvmrc`).
- **Git:** Claude never runs state-changing git commands. Each task ends with a **Handover** step: Claude stops, lists the changed files and gives Nikita the commit message. Nikita commits in GitHub Desktop.

## Review Focus

1. **Zero published articles** (the real state of production until plan 3): home, Insights, topic and problem pages show a friendly empty state; the build, sitemap, RSS and Pagefind all still succeed. Tested in Task 6 and Task 8.
2. **Typo in front-matter taxonomy** (e.g. `topics: [digital-twin]`): the build fails with an error naming the bad value, never silently drops the article. Tested in Task 2.
3. **Draft leakage:** a `draft: true` article must not appear in listings, sitemap, RSS or the search index of a normal build. Tested in Task 3 (logic), Task 8 (search) and Task 9 (sitemap/RSS).
4. **Phone-width layout with long content** (long title, long heading, wide table or figure): no horizontal page scroll at 375px; the contents pane becomes a dropdown. Tested in Task 4 and Task 5.
5. **JavaScript disabled:** articles render, contents links jump to sections as plain anchors, and the search page explains that search needs JavaScript. Tested in Task 5 and Task 8.

---

### Task 0: Prepare the machine and branch (Nikita)

- [ ] **Step 1: Update Node.js (Nikita).** Download the current **LTS** installer from nodejs.org and run it. *What it does:* replaces Node 22.19 with a version Astro 7 accepts (needs ≥22.23.4). Close and reopen the VS Code terminal, then run `node -v`. **Expect** a version of 22.23.4 or higher.
- [ ] **Step 2: Create a working branch (Nikita, GitHub Desktop).** Top bar: **Current branch → New branch**, name it `site-foundation`, base it on `main`, then **Create branch**. Then click **Publish branch**. *What it does:* a branch is a parallel line of commits. All of this plan's work happens there, and `main` (which will become the live site) stays untouched until you merge it through a pull request at the end. **Expect** the top bar to show `site-foundation`.

### Task 1: Scaffold the project and test tooling

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `src/pages/index.astro` (temporary), `vitest.config.ts`, `playwright.config.ts`, `tests/e2e/smoke.spec.ts`, `tests/unit/.gitkeep`, `docs/adr/0000-template.md`, `docs/adr/0001-static-site-with-astro.md`
- Modify: `.gitignore` (add `test-results/`, `playwright-report/`)

**Interfaces:**
- Produces npm scripts: `dev`, `build` (= `astro check && astro build`; Pagefind runs as an integration from Task 8), `preview`, `test` (= `vitest run`), `test:e2e` (= `playwright test`).
- `astro.config.mjs` reads `outDir` from env `PD_OUT_DIR` (default `./dist`), so test builds don't overwrite each other.
- Produces `playwright.config.ts` whose `webServer` runs `npm run build && npm run preview -- --port 4321` with env `PD_CONTENT_DIR=tests/fixtures/articles`, `PD_OUT_DIR=./dist-test`, `PUBLIC_SHOW_DRAFTS=false`, and `baseURL` `http://localhost:4321`. Projects: `desktop` (1280×800) and `mobile` (375×812). Add `dist-test/` and `dist-empty/` to `.gitignore`.

- [ ] **Step 1:** Before scaffolding, read the Astro 7 docs on content collections, `astro/zod` and MDX, and note any API differences from Astro 5/6 in a scratch note (not committed).
- [ ] **Step 2:** Scaffold with `npm create astro@latest -- --template minimal --typescript strict --no-git --install` in a temp folder, then move the files in (the folder isn't empty). Add MDX and sitemap via `npx astro add mdx sitemap`. Set `site`, `trailingSlash: "always"` and `output: "static"`. If `@astrojs/check` rejects the installed TypeScript major version, pin `typescript@5`.
- [ ] **Step 3: Write the failing smoke test** `tests/e2e/smoke.spec.ts`: `test('home responds with site title')`: `page.goto('/')`, then expect `page` to have title matching `/Practically Digital/`.
- [ ] **Step 4:** Run `npx playwright install chromium`, then `npm run test:e2e`. **Expect** FAIL (the template title isn't the site name).
- [ ] **Step 5:** Set the temporary `index.astro` `<title>` to `Practically Digital`. Run `npm run test:e2e`. **Expect** PASS on both projects. Run `npm test`. **Expect** "no test files" exit 0 (configure `passWithNoTests: true`).
- [ ] **Step 6:** Write `docs/adr/0000-template.md` (sections: Status, Context, Options considered, Decision, Consequences, Cost impact) and `0001-static-site-with-astro.md` (options: Astro, Hugo, Next.js, Eleventy; down-select on content focus, islands for the future calculator, static hosting at £0, learning value). Write it for Nikita: plain language, with each term explained.
- [ ] **Step 7: Handover.** Commit message: `chore: scaffold Astro project with Vitest and Playwright`. First-time instructions for Nikita in GitHub Desktop: review the **Changes** list (there should be no `node_modules` or `dist`), type the summary, **Commit to site-foundation**, **Push origin**.

### Task 2: Taxonomy and article schema

**Files:**
- Create: `src/data/taxonomy.ts`, `src/lib/schema.ts`, `src/content.config.ts`, `tests/unit/taxonomy.test.ts`, `tests/unit/schema.test.ts`, `tests/fixtures/articles/` (four fixture files, below)

**Interfaces:**
- Produces `src/data/taxonomy.ts`:
  - `type Term = { slug: string; name: string; description: string }`
  - `TOPICS: readonly Term[]`, `PROBLEMS: readonly Term[]` (slugs from Global Constraints; one-sentence descriptions)
  - `TOPIC_SLUGS`, `PROBLEM_SLUGS` as non-empty readonly tuples (for `z.enum`)
  - `getTopic(slug: string): Term | undefined`, `getProblem(slug: string): Term | undefined`
- Produces `src/lib/schema.ts`: `articleSchema` (Zod object), `type ArticleData = z.infer<typeof articleSchema>`. Fields: `title` string 10–90 chars; `description` string 50–160; `gist` string 1–400; `author` string default `"Nikita Pietrow"`; `published` coerced date; `reviewed` coerced date optional; `topics` array of `z.enum(TOPIC_SLUGS)` min 1; `problems` array of `z.enum(PROBLEM_SLUGS)` default `[]`; `draft` boolean default `false`; `heroImage` string optional; `heroAlt` string optional, required when `heroImage` is set (refine).
- Produces collection `articles` in `src/content.config.ts`: glob loader `**/*.{md,mdx}`, base `process.env.PD_CONTENT_DIR ?? "./src/content/articles"`, schema `articleSchema`.
- Fixtures: `alpha-data-quality.md` (topics `data-foundations`, problems `untrusted-data`; contains the word `kryptonite-alpha` for search tests; body has six `##` sections, one with a 90-character heading, plus a wide figure, a 10-column table and a `heroImage` with `heroAlt`), `beta-digital-twins.mdx` (topics `digital-twins`, problems `unplanned-downtime`), `gamma-draft.md` (`draft: true`, contains `kryptonite-draft`), `delta-old.md` (published earliest, topic `ai-and-analytics`).

- [ ] **Step 1: Write failing tests.** `taxonomy.test.ts`: six topics and six problems with exactly the spec slugs; `getTopic('digital-twins')?.name === 'Digital twins'`; `getTopic('digital-twin') === undefined`; slugs unique across both lists. `schema.test.ts`: a valid object parses and `author` defaults to `"Nikita Pietrow"`; `topics: ['digital-twin']` fails with an issue whose message includes `digital-twin`; empty `topics` fails; `heroImage` without `heroAlt` fails; `draft` defaults to `false`.
- [ ] **Step 2:** Run `npm test`. **Expect** FAIL (modules missing).
- [ ] **Step 3:** Implement `taxonomy.ts`, `schema.ts` and `content.config.ts`, and create the fixtures.
- [ ] **Step 4:** Run `npm test`. **Expect** PASS. Run `npm run build` with `PD_CONTENT_DIR=tests/fixtures/articles` (set it in the VS Code terminal as `$env:PD_CONTENT_DIR="tests/fixtures/articles"`). **Expect** success. Temporarily change a fixture topic to `digital-twin` and rebuild. **Expect** the build to fail naming `digital-twin`. Revert.
- [ ] **Step 5: Handover.** `feat: add fixed taxonomy and validated article schema`

### Task 3: Article selection, reading time and contents logic

**Files:**
- Create: `src/lib/articles.ts`, `src/lib/toc.ts`, `src/lib/env.ts`, `tests/unit/articles.test.ts`, `tests/unit/toc.test.ts`

**Interfaces:**
- Produces `src/lib/env.ts`: `showDrafts(): boolean` (`import.meta.env.PUBLIC_SHOW_DRAFTS === "true"`), `allowIndexing(): boolean` (`PUBLIC_ALLOW_INDEXING === "true"`).
- Produces `src/lib/articles.ts` (generic over `{ id: string; data: ArticleData; body?: string }` so tests don't need Astro):
  - `selectArticles<T>(entries: T[], opts: { showDrafts: boolean }): T[]`: drops drafts unless `showDrafts`, sorts by `published` descending, then by `id`.
  - `byTopic<T>(entries: T[], slug: string): T[]`, `byProblem<T>(entries: T[], slug: string): T[]`
  - `readingTime(markdown: string): number`: whole minutes at 230 words per minute, minimum 1, ignoring code fences and front-matter.
  - `getPublishedArticles(): Promise<CollectionEntry<'articles'>[]>`: wraps `getCollection` + `selectArticles` + `showDrafts()`. This is the **only** function pages use to get articles.
- Produces `src/lib/toc.ts`: `type TocItem = { slug: string; text: string; number: string }`; `buildToc(headings: { depth: number; slug: string; text: string }[]): TocItem[]`, keeping depth 2 only, numbered `"01"`, `"02"`…

- [ ] **Step 1: Write failing tests.** `selectArticles` with a draft and `showDrafts:false` excludes it; with `true` includes it; order is newest first and stable on equal dates. `byTopic(..., 'digital-twins')` returns only matching. `readingTime` of 460 words returns 2; of 10 words returns 1; a 1,000-word code fence isn't counted. `buildToc` drops depth 1 and 3, numbers `01`, `02`, and keeps the slugs.
- [ ] **Step 2:** `npm test` → **Expect** FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm test` → **Expect** PASS.
- [ ] **Step 5: Handover.** `feat: add article selection, reading time and contents helpers`

### Task 4: Design system, base layout and SEO head

**Before writing any UI:** invoke **taste-skill:design-taste-frontend**, with frontend-design guidance, and apply it within the approved Stone and signal direction and the Global Constraints. Where the taste skill conflicts with the spec (for example, it wants photography or shader effects), the spec wins. Note the conflict in the handover.

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/lib/seo.ts`, `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/SeoHead.astro`, `tests/unit/seo.test.ts`, `tests/e2e/helpers/axe.ts`, `tests/e2e/layout.spec.ts`, `docs/adr/0002-plain-css-and-ibm-plex.md`
- Modify: `src/pages/index.astro` (use BaseLayout)

**Interfaces:**
- Produces `src/lib/seo.ts`: `buildMeta(input: { title?: string; description: string; path: string; image?: string; type?: 'website' | 'article'; publishedTime?: Date }): { title: string; description: string; canonical: string; ogImage: string; type: string }`. Title becomes `"<title> · Practically Digital"`, or `"Practically Digital"` with no title. Canonical is the absolute URL on `https://practicallydigital.co.uk` with a trailing slash. `ogImage` defaults to `/og-default.png` as an absolute URL.
- Produces `BaseLayout.astro` props: `{ title?: string; description: string; path: string; image?: string; type?: 'website'|'article'; publishedTime?: Date }`, plus slots `default` and `head`. Renders skip link (`Skip to content`, targets `#main`), header (wordmark `practically/digital` with signal-yellow slash; nav: Insights, Topics, Digital Lab, About, Search), `<main id="main">`, and footer.
- Produces `tests/e2e/helpers/axe.ts`: `expectNoA11yViolations(page: Page): Promise<void>`, using the tags in Global Constraints.

- [ ] **Step 1: Write failing tests.** `seo.test.ts`: `buildMeta({title:'Digital twins', description:'x'.repeat(60), path:'/insights/digital-twins/'})` gives title `Digital twins · Practically Digital` and canonical `https://practicallydigital.co.uk/insights/digital-twins/`; a path without a trailing slash gains one; no title gives `Practically Digital`. `layout.spec.ts`: home has `meta[name=robots][content="noindex, nofollow"]`; the first Tab focuses the "Skip to content" link; the header nav has five links in the order above; at the mobile project `document.documentElement.scrollWidth <= 375`; `expectNoA11yViolations` passes on `/`.
- [ ] **Step 2:** `npm test && npm run test:e2e` → **Expect** FAIL.
- [ ] **Step 3:** Implement tokens (Global Constraints values plus a spacing and type scale), global CSS (Plex fonts via Fontsource imports at 400, 500, 600 and Mono 400; visible focus ring using ink and a signal outline), components, and the robots meta from `allowIndexing()`.
- [ ] **Step 4:** `npm test && npm run test:e2e` → **Expect** PASS. Visual check in the browser pane at 1280 and 375 widths against mockup B.
- [ ] **Step 5:** Write ADR-0002 (plain CSS vs Tailwind vs a component library; IBM Plex vs Inter vs system fonts).
- [ ] **Step 6: Handover.** `feat: add Stone and signal design system and base layout`

### Task 5: Article page

**Files:**
- Create: `src/pages/insights/[slug].astro`, `src/layouts/ArticleLayout.astro`, `src/components/Gist.astro`, `src/components/Toc.astro`, `src/components/ReadingProgress.astro`, `src/components/Figure.astro`, `src/components/DraftBanner.astro`, `src/components/TermTags.astro`, `tests/e2e/article.spec.ts`

**Interfaces:**
- Consumes: `getPublishedArticles`, `readingTime`, `buildToc`, `getTopic`, `getProblem`, `BaseLayout`.
- Produces `Figure.astro` props: `{ src: string; alt: string; caption?: string; size?: 'inline' | 'wide' }` (default `inline`). `wide` breaks out of the text column to the full content width. Markdown tables are also wrapped to scroll horizontally *inside* their own box, never the page.
- Produces `TermTags.astro` props: `{ topics: string[]; problems: string[] }`, linking to `/topics/<slug>/` and `/problems/<slug>/`.
- Page layout: metadata label (`TOPIC / N MIN`), h1, author and dates (published; "Last reviewed" when `reviewed` is set), Gist box (signal-yellow left rule), body, Further reading styling for the final `##` section. On the left, a sticky `Toc` with numbered items and the current section highlighted via IntersectionObserver. Under 900px wide, the `Toc` renders as a `<details>` "Contents" dropdown above the body. The `ReadingProgress` bar sits under the header. JSON-LD `Article` structured data goes in the `head` slot. When `heroImage` is set, it renders above the body via Astro's `<Image>` (optimised, with `heroAlt`) and is passed to `BaseLayout` as the `image` for social previews.

- [ ] **Step 1: Write failing tests** in `article.spec.ts` against `/insights/alpha-data-quality/`: h1 equals the fixture title; the Gist box contains the fixture gist; the contents has six items numbered `01`–`06` with hrefs matching the h2 ids; clicking item `03` scrolls the h2 into view and marks the item `aria-current="true"`; on mobile the contents is a closed `<details>` with summary "Contents" and `scrollWidth <= 375`; the wide figure is wider than the paragraph column on desktop; topic tag links to `/topics/data-foundations/`; with `javaScriptEnabled: false`, contents links are plain `#` anchors and the body text is visible; `/insights/gamma-draft/` returns 404; axe passes.
- [ ] **Step 2:** `npm run test:e2e -- article` → **Expect** FAIL.
- [ ] **Step 3:** Implement. Use the taste skill's guidance for the gist box, contents and figure treatments.
- [ ] **Step 4:** `npm run test:e2e -- article` → **Expect** PASS. Visual check in the browser pane, desktop and mobile.
- [ ] **Step 5: Handover.** `feat: add article page with contents pane, progress bar and figures`

### Task 6: Insights, topic and problem listings

**Files:**
- Create: `src/components/ArticleCard.astro`, `src/components/EmptyState.astro`, `src/pages/insights/index.astro`, `src/pages/topics/index.astro`, `src/pages/topics/[slug].astro`, `src/pages/problems/[slug].astro`, `tests/e2e/listings.spec.ts`

**Interfaces:**
- Consumes: `getPublishedArticles`, `byTopic`, `byProblem`, `TOPICS`, `PROBLEMS`, `TermTags`.
- `ArticleCard` props: `{ article: CollectionEntry<'articles'> }`, showing title, description, topic label, reading time and date (British format, `9 November 2026`).
- `EmptyState` props: `{ heading: string; body: string; linkHref?: string; linkText?: string }`.
- Insights page: all articles newest first, plus two rows of filter chips ("By problem", "By technology") linking to the static pages. Every topic and problem page is generated even with zero articles.

- [ ] **Step 1: Write failing tests:** `/insights/` lists 3 fixture articles (not the draft) in date order; `/topics/digital-twins/` lists only beta; `/problems/energy-and-cost/` (no fixtures) shows the empty state with a link back to Insights; `/topics/` lists six topics with descriptions; dates render as `D Month YYYY`; axe passes on all four page types.
- [ ] **Step 2: Write the zero-article test:** a second Playwright project `empty`, with its own `webServer` on port 4322, sets `PD_CONTENT_DIR=tests/fixtures/empty` (folder containing only `.gitkeep`) and `PD_OUT_DIR=./dist-empty`. If the two builds clash when Playwright starts them in parallel (shared `.astro` cache), chain both builds in one command before either preview starts. It checks that `/`, `/insights/` and `/topics/data-foundations/` return 200 and show the empty state.
- [ ] **Step 3:** Run → **Expect** FAIL.
- [ ] **Step 4:** Implement. If the glob loader errors on an empty folder, handle that in `content.config.ts` rather than adding a dummy article.
- [ ] **Step 5:** Run → **Expect** PASS.
- [ ] **Step 6: Handover.** `feat: add insights, topic and problem listings with empty states`

### Task 7: Homepage, Digital Lab, About and 404

**Files:**
- Create: `src/data/author.ts`, `src/pages/digital-lab.astro`, `src/pages/about.astro`, `src/pages/404.astro`, `tests/e2e/pages.spec.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- `src/data/author.ts`: `AUTHOR = { name: 'Nikita Pietrow', role: string, bio: string, email: string, linkedin: string }`. `bio`, `email` and `linkedin` hold values beginning with `PLACEHOLDER:` (filled in plan 3).
- Homepage sections in order: a short hero (what the site is, for whom, the data-first stance); "Start with a problem" (six problem links); "Explore a technology" (six topic links); "Latest insights" (up to 3 `ArticleCard`s, or `EmptyState`).
- Digital Lab: placeholder explaining what's coming, plus the **live / simulated / conceptual** labelling convention as three labelled definitions.
- About: who's behind the site (from `AUTHOR`), why it exists and the editorial principles (sourced claims, no invented figures, limitations stated fairly, AI-assisted drafting with human review), plus an "Ask a question" block with `mailto:` and LinkedIn links.

- [ ] **Step 1: Write failing tests:** home has the four sections in order, with six problem and six topic links that resolve with 200; `/digital-lab/` contains the terms "Live", "Simulated" and "Conceptual"; `/about/` has a `mailto:` link; an unknown URL shows the 404 page with links to Home and Insights; axe passes on each.
- [ ] **Step 2:** Run → **Expect** FAIL.
- [ ] **Step 3:** Draft the copy (British English, plain, no hype; the About page says honestly that drafts are AI-assisted and edited by Nikita). Run **humanizer:humanizer** over all of it, then implement.
- [ ] **Step 4:** Run → **Expect** PASS. Visual check.
- [ ] **Step 5: Handover.** `feat: add homepage, Digital Lab, About and 404 pages`. Ask Nikita to read the copy on the local preview and give edits before committing.

### Task 8: Search

**Files:**
- Create: `src/pages/search.astro`, `src/components/SearchBox.astro`, `tests/e2e/search.spec.ts`, `docs/adr/0003-search-with-pagefind.md`
- Modify: `package.json` and `astro.config.mjs` (add the `astro-pagefind` integration, which indexes whatever `outDir` the build used), `src/layouts/ArticleLayout.astro` (`data-pagefind-body` on the article body only; `data-pagefind-ignore` on the contents and tags)

**Interfaces:**
- Only article bodies are indexed (`data-pagefind-body`), so listing pages and the home page don't show up as results. The draft banner page is never built in normal builds, so drafts can't be indexed.
- The search page loads Pagefind's default UI, styled with the design tokens through its CSS variables. A `<noscript>` message says search needs JavaScript and links to Insights.

- [ ] **Step 1: Write failing tests:** on `/search/`, typing `kryptonite-alpha` shows a result linking to `/insights/alpha-data-quality/`; typing `kryptonite-draft` shows no results; with JS disabled the noscript message is visible; in the `empty` project the search page loads without console errors; axe passes.
- [ ] **Step 2:** Run → **Expect** FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → **Expect** PASS.
- [ ] **Step 5:** Write ADR-0003 (Pagefind vs Azure AI Search vs Algolia vs Lunr; the cost exposure of each).
- [ ] **Step 6: Handover.** `feat: add static search with Pagefind`

### Task 9: Sitemap, RSS, robots.txt and social previews

**Files:**
- Create: `src/pages/rss.xml.ts`, `src/pages/robots.txt.ts`, `scripts/make-og-image.mjs`, `public/og-default.png` (generated), `public/favicon.svg`, `tests/e2e/feeds.spec.ts`
- Modify: `astro.config.mjs` (sitemap `filter` excludes `/404/` and `/search/`), `package.json` (`og` script)

**Interfaces:**
- RSS feed: title "Practically Digital", items from `getPublishedArticles()` with title, description, link and pubDate.
- `robots.txt`: `User-agent: *` + `Disallow: /` unless `allowIndexing()`; when indexing is allowed, `Allow: /` plus `Sitemap: https://practicallydigital.co.uk/sitemap-index.xml`.
- `scripts/make-og-image.mjs`: renders a 1200×630 PNG (stone background, ink wordmark, signal slash, tagline) from inline SVG using `sharp` (already an Astro dependency). Run once, and commit the output.

- [ ] **Step 1: Write failing tests:** `/rss.xml` contains 3 `<item>`s and not the draft title; `/sitemap-0.xml` contains `/insights/alpha-data-quality/` and not `gamma-draft`, `/404/` or `/search/`; `/robots.txt` contains `Disallow: /`; the article page has `og:title`, `og:description`, `og:image` (absolute URL) and `twitter:card` = `summary_large_image`.
- [ ] **Step 2:** Run → **Expect** FAIL.
- [ ] **Step 3:** Implement and generate the OG image (`npm run og`).
- [ ] **Step 4:** Run → **Expect** PASS.
- [ ] **Step 5: Handover.** `feat: add RSS, sitemap rules, robots.txt and social preview image`

### Task 10: Quality pass, docs and the first pull request

**Files:**
- Create: `docs/architecture/overview.md`
- Modify: `README.md`

- [ ] **Step 1:** Run the whole suite: `npm test && npm run test:e2e`. **Expect** all PASS on the desktop, mobile and empty projects.
- [ ] **Step 2:** Run Lighthouse locally against `npm run preview` (home and one article, mobile preset). **Expect** Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95. Fix anything below. (SEO will show the deliberate `noindex` warning; that's expected.) Record the scores in the overview doc.
- [ ] **Step 3:** Write `docs/architecture/overview.md` for Nikita: a diagram (Mermaid in Markdown, which GitHub renders) of content → build → static output, the role of each folder, how the env flags work, and what plans 2 and 3 add. Rewrite `README.md`: what the site is, how to run it (`npm install`, `npm run dev`), how to run tests, and links to the spec, ADRs and overview.
- [ ] **Step 4:** Dispatch a fresh reviewer subagent per **superpowers:requesting-code-review** over the whole `site-foundation` branch diff against `main`. Fix confirmed issues and re-run Step 1.
- [ ] **Step 5: Handover: first pull request (Nikita).** After the final commit and push: in GitHub Desktop, click **Create Pull Request** (it opens GitHub.com). Base `main`, compare `site-foundation`. Title `Site foundation`; Claude supplies the description. *What a PR is:* a request to merge one branch into another, with a page showing every change, where you can read, comment and approve. Read the **Files changed** tab, then click **Merge pull request**, then **Confirm**. Back in GitHub Desktop, switch to `main` and click **Fetch origin**, then **Pull**. *What pull does:* downloads the merged commits so your local `main` matches GitHub. **Expect** `main` to now contain the whole site. You can then delete the `site-foundation` branch (GitHub offers a button after the merge).
