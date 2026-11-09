import { describe, it, expect } from 'vitest';
import { markdownToHtml } from 'satteri';
import { tableScroll } from '../../src/lib/table-scroll';

const TABLE = '| A | B |\n|---|---|\n| 1 | 2 |\n';

describe('tableScroll hast plugin', () => {
  it('wraps a Markdown table in a focusable scroll region', () => {
    const { html } = markdownToHtml(TABLE, { hastPlugins: [tableScroll] });
    expect(html).toMatch(
      /^<div class="table-scroll" role="region" aria-label="Table \(scrolls sideways\)" tabindex="0"><table>/,
    );
    expect(html.trim()).toMatch(/<\/table><\/div>$/);
  });

  it('wraps every table separately', () => {
    const { html } = markdownToHtml(`${TABLE}\nText\n\n${TABLE}`, { hastPlugins: [tableScroll] });
    expect(html.match(/<div class="table-scroll"/g)).toHaveLength(2);
  });

  it('leaves other content alone', () => {
    const { html } = markdownToHtml('Just a paragraph.', { hastPlugins: [tableScroll] });
    expect(html.trim()).toBe('<p>Just a paragraph.</p>');
  });
});
