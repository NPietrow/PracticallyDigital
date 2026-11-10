import { test, expect, type APIRequestContext } from '@playwright/test';

// Feeds and crawler files: RSS, sitemap, robots.txt, social preview tags and icons.
// The file checks are plain HTTP requests, so they run once (desktop), not per viewport.

const SITE = 'https://practicallydigital.co.uk';
const ALPHA = '/insights/alpha-data-quality/';

async function text(request: APIRequestContext, path: string): Promise<string> {
  const res = await request.get(path);
  expect(res.status(), `${path} status`).toBe(200);
  return res.text();
}

const count = (haystack: string, needle: RegExp) => (haystack.match(needle) ?? []).length;

test.describe('feeds and crawler files', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'file checks run once');
  });

  test('RSS lists the three published articles, newest first, and not the draft', async ({ request }) => {
    const rss = await text(request, '/rss.xml');
    expect(rss).toContain('<title>Practically Digital</title>');
    expect(count(rss, /<item>/g)).toBe(3);
    expect(rss).not.toContain('Fixture gamma');
    expect(rss).not.toContain('gamma-draft');

    const links = [...rss.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)].map((m) => m[1]);
    expect(links).toEqual([
      `${SITE}/insights/alpha-data-quality/`,
      `${SITE}/insights/beta-digital-twins/`,
      `${SITE}/insights/delta-old/`,
    ]);
    expect(rss).toContain('<description>Test fixture article about data quality');
    expect(count(rss, /<pubDate>/g)).toBe(3);
  });

  test('sitemap lists articles but not the draft, 404 or search pages', async ({ request }) => {
    const index = await text(request, '/sitemap-index.xml');
    expect(index).toContain(`${SITE}/sitemap-0.xml`);

    const sitemap = await text(request, '/sitemap-0.xml');
    expect(sitemap).toContain(`${SITE}${ALPHA}`);
    expect(sitemap).not.toContain('gamma-draft');
    expect(sitemap).not.toContain('/404');
    expect(sitemap).not.toContain('/search/');
  });

  test('robots.txt blocks all crawlers while indexing is off', async ({ request }) => {
    const robots = await text(request, '/robots.txt');
    expect(robots).toContain('User-agent: *');
    expect(robots).toMatch(/^Disallow: \/$/m);
    expect(robots).not.toContain('Sitemap:');
  });

  test('default social image is a 1200x630 PNG', async ({ request }) => {
    const res = await request.get('/og-default.png');
    expect(res.status()).toBe(200);
    const png = await res.body();
    // PNG signature, then the IHDR chunk holds width and height as 32-bit big-endian numbers.
    expect(png.subarray(1, 4).toString('ascii')).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  test('favicon is served as SVG', async ({ request }) => {
    const res = await request.get('/favicon.svg');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('<svg');
  });
});

test.describe('head links and social tags', () => {
  test('every page points at the favicon and the RSS feed', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
    const feed = page.locator('link[rel="alternate"][type="application/rss+xml"]');
    await expect(feed).toHaveAttribute('href', `${SITE}/rss.xml`);
    await expect(feed).toHaveAttribute('title', 'Practically Digital');
  });

  test('the article page has complete social preview tags', async ({ page }) => {
    await page.goto(ALPHA);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /^Fixture alpha on data quality/,
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      /^Test fixture article about data quality/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
  });
});

// Zero articles is the real production state until plan 3: feeds must still build.
test.describe('feeds with zero articles', { tag: '@empty' }, () => {
  test('RSS is a valid, empty feed', async ({ request }) => {
    const rss = await text(request, '/rss.xml');
    expect(rss).toContain('<channel>');
    expect(rss).toContain('<title>Practically Digital</title>');
    expect(count(rss, /<item>/g)).toBe(0);
  });

  test('sitemap and robots.txt still exist', async ({ request }) => {
    expect(await text(request, '/sitemap-0.xml')).toContain(`${SITE}/`);
    expect(await text(request, '/robots.txt')).toContain('Disallow: /');
  });
});
