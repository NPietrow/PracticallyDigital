# ADR-0002: Style the site with plain CSS and self-hosted IBM Plex

## Status

Accepted, 9 November 2026 (the "Stone and signal" direction is in the [design spec](../superpowers/specs/2026-11-09-practically-digital-design.md); this ADR records how it's built).

## Context

The spec fixes the look: warm stone backgrounds, near-black ink text and top bar, signal yellow as the only highlight, and crisp, engineered type ("IBM-leaning"). This ADR settles two build questions behind that look: how the CSS is written, and which typeface carries it.

The constraints that matter:

- **Small and fast.** It's a reading site, often opened on a phone. Every kilobyte of CSS and font is downloaded before the page looks right.
- **One consistent system** across home, listings and articles, so a later page can't drift off-palette.
- **No third-party requests.** Loading fonts from Google's servers means every reader's browser contacts Google, sending their IP address, which raises a privacy-notice question. Hosting the font files ourselves avoids it.
- **Readable by Nikita.** He wants to follow every decision, so the styling should be something he can open and understand without learning a framework first.

Terms used below:

- **Design tokens.** Named values for colours, sizes and spacing (for example `--signal: #f2b705`), defined once and used everywhere. Changing a token changes it site-wide.
- **CSS custom properties.** The browser's built-in variables (`--name: value`), which is how the tokens are stored here.
- **Scoped styles.** Astro keeps the CSS written inside a component (`<style>` in a `.astro` file) applying only to that component, so styles for the header can't leak into an article.
- **Utility classes.** Many tiny single-purpose classes (`p-4`, `text-lg`) written straight into the HTML, which is how Tailwind works.

## Options considered

### How the CSS is written

**Plain CSS with tokens and Astro's scoped styles.** One `tokens.css` holds the palette, type scale and spacing; one `global.css` sets base typography, links, focus and the skip link; each component styles itself in its own `<style>` block. No extra dependency. The markup stays clean and the CSS reads top to bottom. The risk is drift: nothing stops someone typing a raw hex colour instead of a token, so reviews have to catch it.

**Tailwind CSS.** A widely used utility-class framework. It enforces a scale by default and produces small output by removing unused classes. Against it here: it's another tool and config to learn and keep updated, class lists in the HTML get long and are harder for a non-developer to read, and the site's palette and scale would have to be re-declared in Tailwind's config anyway.

**A component library (for example a ready-made UI kit).** Gives buttons, cards and menus out of the box. Most assume a JavaScript framework such as React, which conflicts with the spec's "no client JavaScript except three named features", and bring their own visual style that we'd spend effort overriding to reach Stone and signal.

### Which typeface

**IBM Plex Sans and IBM Plex Mono.** IBM's own corporate typeface, released as open source under the SIL Open Font Licence 1.1, so it's free to self-host and ship. Its slightly squared, mechanical letter shapes give the "engineered and precise" feel the spec asks for, and the spec's "IBM-leaning" is met literally. It comes with a matching monospace for metadata labels such as `TOPIC / 6 MIN`. Fontsource packages it for self-hosting.

**Inter.** A highly legible open-source sans (also OFL), widely used in web apps and dashboards. Neutral and safe, but for that reason it reads as generic rather than "IBM-leaning". It has no monospace partner, so labels would need a second family.

**System fonts** (whatever the device already has: Segoe UI on Windows, San Francisco on Apple devices). Zero download. But the site would look different on every device, and the precise, engineered character the spec asks for would depend on the reader's operating system.

### How they compare

| Criterion | Plain CSS + tokens | Tailwind | Component library |
|---|---|---|---|
| Extra dependencies | None | Tailwind and its config | Library plus usually React |
| Fits "almost no client JS" | Yes | Yes | Usually not |
| Easy for Nikita to read | Yes | Long class lists | Hidden inside the library |
| Enforces one scale | By review | By default | By the library's own style |

| Criterion | IBM Plex | Inter | System fonts |
|---|---|---|---|
| Matches "engineered, IBM-leaning" | Yes, by design | Partly | Varies by device |
| Matching monospace for labels | Plex Mono | No | Varies |
| Download | Yes (see below) | Yes | None |
| Licence | OFL 1.1 | OFL 1.1 | Comes with the device |

## Decision

**Plain CSS with design tokens and Astro's scoped component styles**, and **IBM Plex Sans with IBM Plex Mono, self-hosted through Fontsource.**

Only the Latin character subset is loaded, in the weights the design uses: Sans 400, 400 italic, 500 and 600, and Mono 400. In the first build these files are 14 to 25 KB each in WOFF2 format, about 110 KB if a page used every one; browsers only download a face when the page actually uses it. The whole site stylesheet was 7.6 KB at the same point.

Two accessibility rules are built into the tokens and base styles, not left to each page:

- Signal yellow on stone is only 1.5:1 contrast, so yellow is never a text colour on light grounds (a spec rule), and the keyboard focus ring pairs an ink ring with the yellow one so it stays visible on any background.
- Links and controls outside running text are at least 44px tall (the `--tap` token).

## Consequences

- Adding a page means using the existing tokens and components. A new colour or size goes into `tokens.css` first, then gets used; reviewers should reject raw hex values in component styles.
- The italic was added beyond the brief's four weights: articles use emphasis, and a browser faking italic from the upright face looks poor in Plex. It only downloads when a page has italic text.
- The Latin subset covers English, £, €, curly quotes and dashes (Unicode U+0000–00FF, U+2000–206F and U+20AC, per Fontsource's subset definition). A page in another script (Greek symbols in an equation, for example) would fall back to a system font for those characters, or we'd add that subset.
- If the CSS grows enough that drift becomes a real problem, Tailwind or a CSS linter (such as Stylelint with a "use tokens" rule) can be reconsidered in a new ADR.

## Cost impact

£0. Fonts and CSS are static files served with the rest of the site, inside the hosting plan's free allowance. Fontsource packages and the Plex fonts are free (OFL 1.1). No worst-case exposure arises from this decision on its own.
