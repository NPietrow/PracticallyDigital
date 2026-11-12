import { describe, it, expect } from 'vitest';
import { selectArticles, byTopic, byProblem, readingTime, countGuides } from '../../src/lib/articles';
import type { ArticleData } from '../../src/lib/schema';

type Entry = { id: string; data: ArticleData; body?: string };

function entry(id: string, overrides: Partial<ArticleData> = {}): Entry {
  return {
    id,
    data: {
      title: `Article ${id}`,
      description: 'd'.repeat(60),
      gist: 'gist',
      author: 'Nikita Pietrow',
      published: new Date('2026-10-01'),
      topics: ['data-foundations'],
      problems: [],
      draft: false,
      ...overrides,
    },
  };
}

const words = (n: number) => Array.from({ length: n }, () => 'word').join(' ');

describe('selectArticles', () => {
  const live = entry('live');
  const draft = entry('draft', { draft: true });

  it('drops drafts when showDrafts is false', () => {
    expect(selectArticles([live, draft], { showDrafts: false }).map((e) => e.id)).toEqual(['live']);
  });

  it('keeps drafts when showDrafts is true', () => {
    const ids = selectArticles([live, draft], { showDrafts: true }).map((e) => e.id);
    expect(ids).toContain('draft');
    expect(ids).toHaveLength(2);
  });

  it('sorts newest first', () => {
    const old = entry('old', { published: new Date('2026-01-01') });
    const mid = entry('mid', { published: new Date('2026-06-01') });
    const recent = entry('recent', { published: new Date('2026-11-01') });
    const ids = selectArticles([old, recent, mid], { showDrafts: false }).map((e) => e.id);
    expect(ids).toEqual(['recent', 'mid', 'old']);
  });

  it('breaks ties on equal dates by id, whatever the input order', () => {
    const b = entry('b');
    const a = entry('a');
    const c = entry('c');
    expect(selectArticles([c, a, b], { showDrafts: false }).map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(selectArticles([b, c, a], { showDrafts: false }).map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  it('does not reorder the array it was given', () => {
    const input = [entry('z', { published: new Date('2026-01-01') }), entry('y')];
    selectArticles(input, { showDrafts: false });
    expect(input.map((e) => e.id)).toEqual(['z', 'y']);
  });
});

describe('byTopic and byProblem', () => {
  const twin = entry('twin', { topics: ['digital-twins'], problems: ['unplanned-downtime'] });
  const both = entry('both', { topics: ['data-foundations', 'digital-twins'] });
  const data = entry('data', { topics: ['data-foundations'], problems: ['untrusted-data'] });

  it('returns only articles tagged with the topic', () => {
    expect(byTopic([twin, both, data], 'digital-twins').map((e) => e.id)).toEqual(['twin', 'both']);
  });

  it('returns only articles tagged with the problem', () => {
    expect(byProblem([twin, both, data], 'untrusted-data').map((e) => e.id)).toEqual(['data']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(byProblem([twin, both, data], 'energy-and-cost')).toEqual([]);
  });
});

describe('readingTime', () => {
  it('gives 2 minutes for 460 words', () => {
    expect(readingTime(words(460))).toBe(2);
  });

  it('never goes below 1 minute', () => {
    expect(readingTime(words(10))).toBe(1);
    expect(readingTime('')).toBe(1);
  });

  it('rounds to the nearest whole minute', () => {
    expect(readingTime(words(300))).toBe(1); // 1.3 minutes
    expect(readingTime(words(400))).toBe(2); // 1.7 minutes
  });

  it('ignores code fences', () => {
    const md = `${words(10)}\n\n\`\`\`python\n${words(1000)}\n\`\`\`\n\n${words(10)}`;
    expect(readingTime(md)).toBe(1);
  });

  it('ignores front-matter', () => {
    const md = `---\ntitle: ${words(1000)}\n---\n\n${words(10)}`;
    expect(readingTime(md)).toBe(1);
  });

  it('ignores HTML tags and their attributes', () => {
    const tag = `<img alt="${words(1000)}" src="x.png" />`;
    expect(readingTime(`${tag}\n\n${words(10)}`)).toBe(1);
  });
});

describe('countGuides', () => {
  it('uses the singular for one and the plural otherwise', () => {
    expect(countGuides(0)).toBe('0 guides');
    expect(countGuides(1)).toBe('1 guide');
    expect(countGuides(3)).toBe('3 guides');
  });
});
