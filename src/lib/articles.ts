// Choosing, filtering and timing articles. The pure functions take any
// { id, data } entries so they can be unit-tested without Astro.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ArticleData } from './schema';
import { showDrafts } from './env';

// Only the fields selection needs, so both the unit-test entries (heroImage as a
// string) and real collection entries (heroImage as optimised image data) fit.
type Entry = { id: string; data: Pick<ArticleData, 'published' | 'draft' | 'topics' | 'problems'> };

const WORDS_PER_MINUTE = 230;

/** Drops drafts (unless showDrafts), then sorts newest first, ties broken by id. */
export function selectArticles<T extends Entry>(entries: T[], opts: { showDrafts: boolean }): T[] {
  return entries
    .filter((e) => opts.showDrafts || !e.data.draft)
    .sort(
      (a, b) =>
        b.data.published.getTime() - a.data.published.getTime() || a.id.localeCompare(b.id),
    );
}

export function byTopic<T extends Entry>(entries: T[], slug: string): T[] {
  return entries.filter((e) => (e.data.topics as readonly string[]).includes(slug));
}

export function byProblem<T extends Entry>(entries: T[], slug: string): T[] {
  return entries.filter((e) => (e.data.problems as readonly string[]).includes(slug));
}

/** Whole minutes at 230 words per minute, minimum 1. Code, front-matter and HTML tags don't count. */
export function readingTime(markdown: string): number {
  const prose = markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---(\r?\n|$)/, ' ')
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, ' ')
    .replace(/<[^>]*>/g, ' ');
  // A "word" is any whitespace-separated run containing a letter or digit,
  // so Markdown symbols such as #, | and - aren't counted.
  const words = prose.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** "1 guide", "3 guides": the count shown in listing labels. */
export function countGuides(n: number): string {
  return `${n} ${n === 1 ? 'guide' : 'guides'}`;
}

/** The only way pages should get articles: drafts are handled here, once. */
export async function getPublishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const all = await getCollection('articles');
  return selectArticles(all, { showDrafts: showDrafts() });
}
