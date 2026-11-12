---
title: Fixture alpha on data quality for test runs
description: Test fixture article about data quality, used by the automated tests only.
gist: Fixture gist for alpha. Bad data breaks every tool that sits on top of it.
published: 2026-10-20
reviewed: 2026-11-01
topics: [data-foundations, ai-and-analytics]
problems: [untrusted-data, no-visibility]
heroImage: ./images/alpha-hero.png
heroAlt: Fixture hero image showing a plain grey rectangle
---

This fixture exists for the automated tests. The search tests look for the unique word kryptonite-alpha, which appears only in this article.

## First section

Paragraph text for the first section. It is long enough to wrap across more than one line at desktop width, so the layout tests have real text to measure against the figure and table further down.

## Second section

Paragraph text for the second section. Short paragraphs, one idea each.

<figure data-size="wide">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='400' viewBox='0 0 1600 400'%3E%3Crect width='1600' height='400' fill='%23D5D5CE'/%3E%3C/svg%3E" alt="Fixture wide diagram, a plain grey band" width="1600" height="400" />
  <figcaption>Fixture wide figure that should break out of the text column.</figcaption>
</figure>

## Why a deliberately long section heading must wrap cleanly in the contents panel on a phone

Paragraph text under the long heading.

## Fourth section

A ten-column table, wider than a phone screen, which must scroll inside its own box rather than the page.

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 | Column 10 |
|---|---|---|---|---|---|---|---|---|---|
| Value one | Value two | Value three | Value four | Value five | Value six | Value seven | Value eight | Value nine | Value ten |
| Value one | Value two | Value three | Value four | Value five | Value six | Value seven | Value eight | Value nine | Value ten |

## Fifth section

Paragraph text for the fifth section.

## Further reading

- A fixture reading-list item, not a real reference.
