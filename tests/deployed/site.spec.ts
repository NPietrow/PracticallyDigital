import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { expectNoA11yViolations } from '../e2e/helpers/axe';

// What the deployed site must do. Header values come from the SWA config
// itself, so this file never disagrees with what we asked Azure to send.
const swaConfig = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8'));
const expectAnalytics = process.env.PD_EXPECT_ANALYTICS === 'true';
const expectIndexing = process.env.PD_EXPECT_INDEXING === 'true';

test('every page in the sitemap loads and passes axe', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap-0.xml');
  expect(sitemap.status()).toBe(200);
  // The sitemap lists production addresses, so keep only each path and load it
  // from whichever deployment is under test.
  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  expect(paths.length).toBeGreaterThanOrEqual(10);

  for (const path of paths) {
    await test.step(path, async () => {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expectNoA11yViolations(page);
    });
  }
});

test('an unknown address returns the 404 page with status 404', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
});

test('a folder address without a trailing slash redirects permanently', async ({ request }) => {
  const res = await request.get('/about', { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()['location']).toMatch(/\/about\/$/);
});

test('file addresses are served as they are', async ({ request }) => {
  for (const path of ['/rss.xml', '/robots.txt', '/sitemap-index.xml']) {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), path).toBe(200);
  }
});

test('every response carries the security headers', async ({ request }) => {
  const headers = (await request.get('/')).headers();
  for (const [name, value] of Object.entries(swaConfig.globalHeaders)) {
    expect(headers[name.toLowerCase()], name).toBe(value);
  }
});

test('search engines are kept out until launch', async ({ page, request }) => {
  await page.goto('/');
  const robotsTxt = await (await request.get('/robots.txt')).text();
  if (expectIndexing) {
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    expect(robotsTxt).not.toMatch(/^Disallow: \/\s*$/m);
  } else {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    expect(robotsTxt).toMatch(/^Disallow: \/\s*$/m);
  }
});

test('the analytics beacon matches the build', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('script[src*="cloudflareinsights"]')).toHaveCount(expectAnalytics ? 1 : 0);
});

test('the search page loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  const res = await page.goto('/search/');
  expect(res?.status()).toBe(200);
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
