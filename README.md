# Practically Digital

An independent educational site that explains practical digital technology (data foundations, AI, digital twins, IoT and cloud) to leaders and managers in UK industry. Each guide covers what a technology is, which problems it solves, what it costs and when it isn't worth doing.

It's a static site built with [Astro](https://astro.build), with articles written in Markdown. Planned address: `practicallydigital.co.uk`.

The site foundation is built and tested locally. Hosting, CI and the first articles come next (see [what plans 2 and 3 add](docs/architecture/overview.md#what-plans-2-and-3-add)).

## Run it on your machine

You need [Node.js](https://nodejs.org) 22.23.4 or later (`.nvmrc` names the version used here).

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>. The dev server reloads as you edit.

There are no articles in `src/content/articles/` yet, so listings show their empty states. To browse the site with the test articles instead (PowerShell):

```powershell
$env:PD_CONTENT_DIR = "tests/fixtures/articles"; npm run dev
```

Search works only on a built site, not the dev server:

```bash
npm run build
npm run preview
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at <http://localhost:4321> |
| `npm run build` | Type-checks, then builds the site into `dist/`, including the search index |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Browser tests (Playwright and axe), against a fixture build and an empty build |
| `npm run og` | Redraws the default social preview image, `public/og-default.png` |

The first time you run the browser tests on a new machine, install Chromium for Playwright:

```bash
npx playwright install chromium
```

## Documentation

- [Architecture overview](docs/architecture/overview.md): how the site is built, what each folder holds, the build switches and the tests
- [Design spec](docs/superpowers/specs/2026-11-09-practically-digital-design.md): what the site is for and the decisions behind it
- [Architecture decision records](docs/adr/): Astro, plain CSS and IBM Plex, Pagefind search
