// Builds the numbered contents list for an article from its rendered headings.

export type TocItem = { slug: string; text: string; number: string };

export function buildToc(headings: { depth: number; slug: string; text: string }[]): TocItem[] {
  return headings
    .filter((h) => h.depth === 2)
    .map((h, i) => ({ slug: h.slug, text: h.text, number: String(i + 1).padStart(2, '0') }));
}
