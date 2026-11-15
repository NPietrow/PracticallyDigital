# Practically Digital

An independent educational site that explains practical digital technology (data foundations, AI, digital twins, IoT and cloud) to leaders and managers in UK industry. Each guide covers what a technology is, which problems it solves, what it costs and when it isn't worth doing.

It's a static site built with [Astro](https://astro.build), with articles written in Markdown. Planned address: `practicallydigital.co.uk`.

The site is built, tested and deployed automatically: every pull request gets a preview, and merging to `main` deploys to Azure Static Web Apps. It stays hidden from search engines until the first articles launch (see [what plan 2 added, and what plan 3 adds](docs/architecture/overview.md#what-plan-2-added-and-what-plan-3-adds)).

## Contributing

Changes go through a pull request into `main`; three checks (`build`, `gitleaks`, `accessibility`) must pass first. Turn on the secret-scanning hook in your clone with `git config core.hooksPath .githooks` ([runbook 05](docs/runbooks/05-gitleaks-hook.md)).

## Run it on your machine

You need [Node.js](https://nodejs.org) 26 or later. `.nvmrc` names the version, and CI reads it from there.

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
| `npm run test:deployed` | Checks a deployed site at `PD_DEPLOYED_URL` (404s, redirects, headers, axe) |
| `npm run test:lighthouse` | Lighthouse scores for a deployed site at `PD_DEPLOYED_URL` |
| `npm run og` | Redraws the default social preview image, `public/og-default.png` |

The first time you run the browser tests on a new machine, install Chromium for Playwright:

```bash
npx playwright install chromium
```

## Documentation

- [Architecture overview](docs/architecture/overview.md): how the site is built, what each folder holds, the build switches and the tests
- [Design spec](docs/superpowers/specs/2026-11-09-practically-digital-design.md): what the site is for and the decisions behind it
- [Architecture decision records](docs/adr/): Astro, plain CSS and IBM Plex, Pagefind search, hosting, the CI pipeline, DNS and analytics, secret hygiene
- [Deployment](docs/deployment.md): what runs on a pull request and on merge, previews, failures and rollback
- [Runbooks](docs/runbooks/README.md): the manual steps in Azure, Cloudflare and GitHub

## Licence

The code is under the [MIT licence](LICENSE). You can reuse it as long as you keep the copyright notice.

The articles, the text on the site's pages, and the Practically Digital name and logo are not covered. They're © Nikita Pietrow, all rights reserved. You're welcome to link to the guides and quote short extracts with credit and a link. For anything else, such as using a guide in training material, get in touch through the site's About page. [LICENSE](LICENSE) lists exactly which files this covers.

IBM Plex fonts are used under the SIL Open Font Licence.
