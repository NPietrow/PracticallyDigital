import { describe, it, expect } from 'vitest';
import { buildToc } from '../../src/lib/toc';

const headings = [
  { depth: 1, slug: 'page-title', text: 'Page title' },
  { depth: 2, slug: 'what-it-is', text: 'What it is' },
  { depth: 3, slug: 'an-example', text: 'An example' },
  { depth: 2, slug: 'how-it-works', text: 'How it works' },
  { depth: 4, slug: 'detail', text: 'Detail' },
  { depth: 2, slug: 'further-reading', text: 'Further reading' },
];

describe('buildToc', () => {
  it('keeps only level-2 headings, numbered from 01, with their slugs and text', () => {
    expect(buildToc(headings)).toEqual([
      { slug: 'what-it-is', text: 'What it is', number: '01' },
      { slug: 'how-it-works', text: 'How it works', number: '02' },
      { slug: 'further-reading', text: 'Further reading', number: '03' },
    ]);
  });

  it('pads numbers to two digits past nine', () => {
    const many = Array.from({ length: 11 }, (_, i) => ({ depth: 2, slug: `s${i}`, text: `S${i}` }));
    expect(buildToc(many).map((t) => t.number).slice(8)).toEqual(['09', '10', '11']);
  });

  it('returns an empty list when there are no level-2 headings', () => {
    expect(buildToc([{ depth: 1, slug: 'x', text: 'X' }])).toEqual([]);
  });
});
