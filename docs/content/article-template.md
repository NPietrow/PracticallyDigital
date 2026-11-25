---
# Copy this file to src/content/articles/<slug>.mdx. The file name becomes the
# address, so data-foundations.mdx is published at /insights/data-foundations/.
title: Plain question or statement a reader would search for # 10 to 90 characters
description: One sentence for search results and link previews, saying who it is for and what they get. # 50 to 160 characters
# The gist: two or three sentences saying what the technology is, why it
# matters to this reader, and a one-line verdict. It renders in the
# highlighted "The gist" box above the article, not as a heading, so don't
# repeat it in the body. Up to 400 characters, and nothing the body doesn't support.
gist: What it is, in a sentence. Why it matters to someone running a plant. The verdict, in a line.
author: Nikita Pietrow # optional; this is the default
published: 2026-11-20 # the day it merges
reviewed: 2026-11-20 # optional; the last full fact-check, shown as "last reviewed"
topics: [data-foundations] # 1 to 3 slugs from src/data/taxonomy.ts, main topic first
problems: [untrusted-data] # 0 to 3 slugs from src/data/taxonomy.ts
draft: false # optional; true only to park unfinished work on main (it is then not built)
# heroImage: ./images/<slug>-hero.png # optional; none at launch (plan 3, decision 5)
# heroAlt: Describe the image for someone who can't see it # required if heroImage is set
---

{/*
  Everything between these markers is guidance: delete it as you write.

  The sections below are suggestions. Reword the headings,
  merge them, reorder them or add your own. Headings become the contents pane
  and its links, so settle the wording before the article merges.

  Whatever the headings, every guide must cover:
  - what it costs, its limitations, and when not to bother;
  - a link to the data foundations guide (/insights/data-foundations/) in every
    technology guide, because every one of them fails on data you can't trust.

  Every factual claim links to its source where it is made. A figure with no
  link must be labelled as an estimate. British English throughout.

  Highlights (src/components/), each with a usage note at the top of its file:
  StatRow and Stat for two to four headline figures, PullQuote for a sourced
  quotation (one or two per article), Callout type="note" or "warning" for
  asides, and BarChart for one ranked series. Every figure keeps a source link.

  Diagrams: an SVG in src/content/articles/images/<slug>-<name>.svg, shown with
    import Figure from '../../components/Figure.astro';
    import layers from './images/<slug>-layers.svg';
    <Figure src={layers} alt="..." caption="..." size="wide" />
*/}

## What it is

{/* Suggested. Plain definition, with an analogy or a real example. */}

## How it works

{/* Suggested. The idea, not the implementation: the parts and how data moves between them. */}

## The business problems it solves

{/* Suggested. In the reader's terms: downtime, scrap, energy, visibility, skills. */}

## What it is worth

{/* Suggested. Measurable value, with sourced figures or clearly labelled estimates. */}

## Costs, limitations and challenges

{/* Suggested. What it costs to start and to run, what goes wrong, and the skills it needs. */}

## Is it right for you?

{/* Suggested. When to adopt, when not to bother, and a quick win to start with. */}

## Tools and resources

{/*
  Required, and second to last. Things to use: a bullet list, each item a link
  plus one line on what it is for and who it suits.
  - Free, open and public first: standards bodies, government and Catapult
    guidance, open-source tools, free templates and self-assessments.
  - Paid products only where they are the usual choice, labelled "(paid)",
    and never one vendor alone where alternatives exist.
  - No affiliate or tracking links. Nothing from client or employer work.
*/}

- [Resource name](https://example.org/): what it is for, and who it suits. Free.

## Further reading

{/*
  Required, and last. Things to read: at least three items, each with an
  https link. Curated, credible and public.
*/}

- [Title of the report or guide](https://example.org/), publisher, year. One line on why it is worth reading.
