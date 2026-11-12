# ADR-0003: Search the site with Pagefind

## Status

Accepted, 10 November 2026. Pagefind is named in the [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md)'s MVP scope; this records the options behind it and how it's wired in.

## Context

Readers need to find a guide by a word or phrase, not only by browsing topics and problems. The constraints:

- **£0 a month**, with no service that can run up a bill on its own.
- **Static hosting.** The site is plain files (ADR-0001), so there's no server program to run search queries.
- **Little client JavaScript.** Search is one of the three places the plan allows it.
- **No draft leakage.** A `draft: true` article must never be findable.

Terms used below:

- **Search index.** A file (or set of files) listing which words appear in which pages, so a search doesn't have to read every page.
- **Hosted search service.** A company runs the index and answers queries over the internet. You send it your content and pay for storage and queries.
- **Client-side search.** The index is a set of static files. The reader's browser downloads what it needs and runs the search itself.

## Options considered

**Pagefind.** An open-source tool that builds a search index from the finished HTML after the site is built. The index is split into small chunks, and the browser downloads only the chunks a query needs, so the download stays small as the site grows ([pagefind.app](https://pagefind.app/)). It ships a ready-made search box and results list, styled through CSS variables. Nothing runs on a server. It needs JavaScript in the browser.

**Azure AI Search.** Microsoft's hosted search service. The Free tier allows 3 indexes and 50 MB of storage, one free service per subscription, and Microsoft says a free service "might be deleted after extended periods of inactivity" ([limits](https://learn.microsoft.com/azure/search/search-limits-quotas-capacity)). Microsoft positions Free for "small projects, such as tutorials and development" ([tiers](https://learn.microsoft.com/azure/search/search-sku-tier)). Paid tiers charge "a fixed hourly rate" per search unit, running "around the clock" whether anyone searches or not (same page). A consumption-based Serverless tier exists but is in preview and "isn't recommended for production workloads" (same page). Using any of these also means a server-side or client-side piece that sends queries and keeps an API key out of the public repo.

**Algolia.** A hosted search service with a free Build plan: 10,000 search requests and 1 million records a month ([Build plan](https://www.algolia.com/pricing/build-plan)). Past those limits, Algolia "may suspend the applicable Service" until you move to a paid plan ([Build plan terms](https://www.algolia.com/policies/build-plan-specific-terms)). Paid usage is billed per thousand requests. Content has to be pushed to Algolia on every publish, which needs an API key held as a secret.

**Lunr.** An open-source JavaScript search library ([lunrjs.com](https://lunrjs.com/)). The site builds one index file and the browser downloads all of it before the first search. That's fine for a few articles, but the download grows with every article. It has no ready-made search interface, so we'd build and maintain one.

### How they compare

| Criterion | Pagefind | Azure AI Search | Algolia | Lunr |
|---|---|---|---|---|
| Monthly cost | £0 | £0 on Free; paid tiers bill every hour | £0 within the Build limits | £0 |
| Can run up a bill | No | Yes, on a paid tier | Only after upgrading | No |
| Fits static hosting | Yes | Needs query plumbing and a key | Needs a key and an upload step | Yes |
| Browser download | Only the chunks a query needs | Results only | Results only | The whole index |
| Ready-made search UI | Yes | No | Yes (libraries) | No |
| Works without JavaScript | No | No (without a server) | No | No |
| Secrets to manage | None | API key | API key | None |

## Decision

Use **Pagefind**. It's the only option that costs nothing, can't start costing anything, needs no secrets and fits static hosting as it is.

How it's wired in:

- After every build, a small integration in `astro.config.mjs` calls `buildSearchIndex` (`src/lib/search-index.ts`). It uses Pagefind's Node API directly rather than the `astro-pagefind` package, for two reasons found while building it:
  - Pagefind indexes every page when no page carries `data-pagefind-body`. That's exactly the zero-article state the site is in until the first guide ships, and search would then return the home, listing and About pages. The integration only gives Pagefind `insights/*/index.html`, so only articles can ever be indexed.
  - `astro-pagefind` logs indexing errors without failing the build. Ours throws, so a broken index stops the build instead of shipping.
- On article pages, `data-pagefind-body` wraps the article, and the contents pane, tags, byline and reading-time label carry `data-pagefind-ignore`.
- Drafts are never built in a normal build, so they can't reach the index.
- The search page uses Pagefind's default UI, loaded from `/pagefind/` and styled with the site's design tokens through Pagefind's CSS variables.

## Consequences

- Search needs JavaScript. The search page shows a `<noscript>` message linking to Insights, and topic and problem pages still work without it.
- With zero articles, Pagefind writes an empty index whose UI would never finish loading. The search page detects this at build time and shows a "Nothing to search yet" message instead.
- Search works on a built site (`npm run build`, then `npm run preview`), not in `astro dev`, because the index only exists after a build.
- Pagefind splits hyphenated words, so a search for `real-time` also finds pages that only say `real`. That's normal search behaviour and we're keeping it.
- Each build runs Pagefind's binary, which adds a few seconds.
- If the site ever needs features Pagefind lacks (search analytics, synonyms managed outside the code), a hosted service could replace it. That would bring in cost and an API key, so it would need its own ADR.

## Cost impact

£0. Pagefind is free and open source, and its output is static files served by the same free hosting as the rest of the site. There's no service to call and no per-query charge, so there's no worst-case exposure from this decision.
