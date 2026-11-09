# ADR-0001: Build the site as a static site with Astro

## Status

Accepted, 9 November 2026 (agreed in the [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md)).

## Context

Practically Digital is mostly articles: long-form text with diagrams, tables and figures. Readers don't log in, and nothing on the page changes per visitor. The site needs to:

- make writing and publishing articles straightforward, with Markdown files kept in the Git repository
- run on a free hosting plan (the target is £0 a month)
- leave room for a small interactive tool later, the value calculator
- teach Nikita how a modern web build works

A few terms used below:

- **Static site.** Every page is built once, ahead of time, into plain HTML, CSS and image files. The web host just hands those files out. There's no server program or database running, which keeps hosting cheap and the attack surface small.
- **Static site generator (SSG).** The tool that turns content files (here, Markdown) and templates into that finished set of pages.
- **Client-side JavaScript.** Code the reader's browser has to download and run. Less of it means faster pages, especially on phones.
- **Islands.** A way of building pages where most of the page is plain HTML and only small, separate parts (the "islands") load JavaScript to become interactive. A calculator could be one island on an otherwise static page.
- **Content collection.** Astro's way of treating a folder of Markdown files as structured data, checking each file's front-matter (title, dates, topics) against a schema and failing the build if something is wrong.

## Options considered

**Astro.** A JavaScript-based SSG designed for content sites. Pages ship no client-side JavaScript unless a component asks for it, and it supports islands, so the calculator can be added later without turning the whole site into an app. Content collections validate article metadata at build time. It supports Markdown and MDX (Markdown that can include components, useful for figures). It uses the same JavaScript and TypeScript tooling as most current web work, so it's good learning value.

**Hugo.** A very fast SSG written in Go, distributed as a single program. Mature and well suited to content sites. Its templates use Go's template language, which is less widely used than JavaScript tooling. It has no built-in islands model, so interactive pieces would be added by hand outside its templating.

**Next.js.** A React framework widely used for web applications. It can export a static site, but it's built around React running in the browser, so pages carry more JavaScript than a content site needs. Many of its features assume a server, which would push us towards paid hosting or a narrower subset of the framework. It's more than this site needs.

**Eleventy (11ty).** A small, flexible JavaScript SSG that outputs plain HTML with no client-side JavaScript by default. A good fit for content, but it leaves more to assemble ourselves: front-matter validation, image handling and any islands approach would come from plugins or custom code.

### How they compare

| Criterion | Astro | Hugo | Next.js | Eleventy |
|---|---|---|---|---|
| Built for content and articles | Yes | Yes | Partly (app-first) | Yes |
| Islands for the future calculator | Built in | No | The whole page is React | Via a plugin |
| Static hosting at £0 | Yes | Yes | Yes, with limits on features | Yes |
| Metadata validation at build time | Built in (content collections) | Limited | Do it yourself | Do it yourself |
| Learning value for modern web work | High | Medium | High, but app-focused | Medium |

## Decision

Use **Astro**, with static output. It's the option built for content that also has a clear, built-in route to the interactive calculator later. Content collections catch mistakes such as a mistyped topic before anything is published.

## Consequences

- Articles are Markdown or MDX files in the repo. Publishing an article means a pull request, which suits the review workflow in the spec.
- Every page is plain HTML. Pages work with JavaScript turned off, apart from features that need it (search, for instance).
- We depend on Astro's release cycle. Major versions can include breaking changes that need small code edits. This site starts on Astro 7.
- Adding server-side features later (forms, logins) would need an adapter and possibly paid hosting. None are planned.

## Cost impact

£0. The build runs on a laptop or in GitHub Actions, and the output is plain files that fit the Azure Static Web Apps Free plan (covered in plan 2). Astro itself is free and open source (MIT licence). No worst-case exposure arises from this decision on its own. Hosting costs are covered in the hosting ADR.
