import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSearchIndex } from '../../src/lib/search-index';

// Real Pagefind runs here (no mocks), against a tiny fake build output.
const page = (title: string, body: string) =>
  `<!doctype html><html lang="en-GB"><head><title>${title}</title></head><body>${body}</body></html>`;

let outDir: string;

function write(path: string, html: string) {
  const full = join(outDir, path);
  mkdirSync(join(full, '..'), { recursive: true });
  writeFileSync(full, html);
}

beforeEach(() => {
  outDir = mkdtempSync(join(tmpdir(), 'pd-search-'));
  write('index.html', page('Home', '<main>Home page words about data and pumps.</main>'));
  write('insights/index.html', page('Insights', '<main>Listing page words about data.</main>'));
  write('about/index.html', page('About', '<main>About page words about data.</main>'));
});

afterEach(() => {
  rmSync(outDir, { recursive: true, force: true });
});

describe('buildSearchIndex', () => {
  it('indexes only article pages, never home, listings or About', async () => {
    write(
      'insights/pump-data/index.html',
      page('Pump data', '<article><div data-pagefind-body>Pump data article words.</div></article>'),
    );
    const { pageCount } = await buildSearchIndex(outDir);
    expect(pageCount).toBe(1);
  });

  it('with zero articles indexes nothing, rather than falling back to every page', async () => {
    const { pageCount } = await buildSearchIndex(outDir);
    expect(pageCount).toBe(0);
  });

  it('with zero articles still writes the search bundle, so the search page loads', async () => {
    await buildSearchIndex(outDir);
    expect(existsSync(join(outDir, 'pagefind', 'pagefind.js'))).toBe(true);
  });
});
