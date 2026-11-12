import { describe, it, expect } from 'vitest';
import { robotsTxt } from '../../src/lib/robots';

const SITEMAP = 'https://practicallydigital.co.uk/sitemap-index.xml';

describe('robotsTxt', () => {
  it('blocks everything while indexing is off', () => {
    const txt = robotsTxt({ allowIndexing: false });
    expect(txt).toBe('User-agent: *\nDisallow: /\n');
    expect(txt).not.toContain('Sitemap:');
  });

  it('allows everything and names the sitemap once indexing is on', () => {
    const txt = robotsTxt({ allowIndexing: true });
    expect(txt).toBe(`User-agent: *\nAllow: /\n\nSitemap: ${SITEMAP}\n`);
    expect(txt).not.toMatch(/^Disallow/m);
  });
});
