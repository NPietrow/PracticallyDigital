import { test, expect } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/axe';

const PAGES = ['/', '/digital-lab/', '/about/', '/no-such-page/'];

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the hero, problems, topics and latest sections in that order', async ({ page }) => {
    const sections = page.locator('[data-home-section]');
    const order = await sections.evaluateAll((els) => els.map((e) => e.getAttribute('data-home-section')));
    expect(order).toEqual(['hero', 'problems', 'topics', 'latest']);
    await expect(page.locator('main h2')).toHaveText([
      'Start with a problem',
      'Explore a technology',
      'Latest insights',
    ]);
  });

  test('hero states the data-first stance', async ({ page }) => {
    await expect(page.locator('[data-home-section="hero"]')).toContainText(/data you can.t trust/i);
  });

  for (const [section, base] of [
    ['problems', '/problems/'],
    ['topics', '/topics/'],
  ] as const) {
    test(`${section} section has six links that all load`, async ({ page }) => {
      const links = page.locator(`[data-home-section="${section}"] a`);
      await expect(links).toHaveCount(6);
      const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
      for (const href of hrefs) {
        expect(href.startsWith(base), href).toBe(true);
        const res = await page.request.get(href);
        expect(res.status(), href).toBe(200);
      }
    });
  }

  test('latest section shows the three newest articles', async ({ page }) => {
    const titles = page.locator('[data-home-section="latest"] [data-card-title]');
    await expect(titles).toHaveCount(3);
    await expect(titles.first()).toHaveText('Fixture alpha on data quality for test runs');
  });
});

test.describe('Digital Lab', () => {
  test('defines the live, simulated and conceptual labels', async ({ page }) => {
    await page.goto('/digital-lab/');
    await expect(page.locator('h1')).toHaveText('Digital Lab');
    await expect(page.locator('dl dt')).toHaveText(['Live', 'Simulated', 'Conceptual']);
    await expect(page.locator('dl dd')).toHaveCount(3);
  });
});

test.describe('About', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about/');
  });

  test('names the author', async ({ page }) => {
    await expect(page.locator('main')).toContainText('Nikita Pietrow');
  });

  test('says drafts are AI-assisted and edited by the author', async ({ page }) => {
    await expect(page.locator('[data-editorial]')).toContainText(/AI/);
    await expect(page.locator('[data-editorial]')).toContainText(/Nikita/);
  });

  test('"Ask a question" offers email and LinkedIn', async ({ page }) => {
    const ask = page.locator('[data-ask]');
    await expect(ask.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(ask.getByRole('link', { name: /LinkedIn/ })).toHaveCount(1);
  });
});

test.describe('404 page', () => {
  test('an unknown URL returns 404 with links home and to Insights', async ({ page }) => {
    const res = await page.goto('/no-such-page/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
    const main = page.locator('main');
    await expect(main.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(main.getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/insights/');
  });
});

for (const path of PAGES) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path);
    await expectNoA11yViolations(page);
  });
}

test('pages have no horizontal scroll at phone width', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'phone-width check');
  for (const path of PAGES) {
    await page.goto(path);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, path).toBeLessThanOrEqual(375);
  }
});
