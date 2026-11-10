import { test, expect, type Page } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/axe';

// Pagefind's default UI markup.
const input = (page: Page) => page.locator('.pagefind-ui__search-input');
const resultLinks = (page: Page) => page.locator('.pagefind-ui__result-link');
const message = (page: Page) => page.locator('.pagefind-ui__message');

async function search(page: Page, query: string) {
  await page.goto('/search/');
  await input(page).fill(query);
}

test.describe('search', () => {
  test('finds the article containing a unique word', async ({ page }) => {
    await search(page, 'kryptonite-alpha');
    await expect(resultLinks(page).first()).toHaveAttribute('href', '/insights/alpha-data-quality/');
    await expect(resultLinks(page).first()).toHaveText('Fixture alpha on data quality for test runs');
  });

  test('never finds the draft', async ({ page }) => {
    // Pagefind splits hyphenated words, so "kryptonite" also matches alpha's
    // "kryptonite-alpha". What matters is that the draft itself never appears.
    await search(page, 'kryptonite-draft');
    await expect(message(page)).toContainText(/result/i);
    await expect(message(page)).not.toContainText(/searching/i);
    await expect(page.locator('.pagefind-ui__result-link[href*="gamma-draft"]')).toHaveCount(0);
    await expect(page.getByText('Fixture gamma, a draft that must never ship')).toHaveCount(0);
  });

  test('results are articles only, never listing or other pages', async ({ page }) => {
    // "fixture" appears in every fixture article and in their titles on the listings.
    await search(page, 'fixture');
    await expect(resultLinks(page)).toHaveCount(3);
    const hrefs = await resultLinks(page).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const href of hrefs) expect(href).toMatch(/^\/insights\/[^/]+\/$/);
  });

  test('has no axe violations, with results showing', async ({ page }) => {
    await search(page, 'fixture');
    await expect(resultLinks(page).first()).toBeVisible();
    await expectNoA11yViolations(page);
  });

  test('the search box uses the site font at normal weight', async ({ page }) => {
    await page.goto('/search/');
    const style = await input(page).evaluate((el) => {
      const s = getComputedStyle(el);
      return { family: s.fontFamily, weight: s.fontWeight };
    });
    expect(style.family).toContain('IBM Plex Sans');
    expect(style.weight).toBe('400');
  });

  test('header Search link opens the search page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(/\/search\/$/);
    await expect(input(page)).toBeVisible();
  });
});

test.describe('search without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('explains that search needs JavaScript and links to Insights', async ({ page }) => {
    await page.goto('/search/');
    const note = page.locator('[data-search-noscript]');
    await expect(note).toBeVisible();
    await expect(note).toContainText(/needs JavaScript/);
    await expect(note.getByRole('link')).toHaveAttribute('href', '/insights/');
  });
});

test.describe('search with zero articles', { tag: '@empty' }, () => {
  // An empty index has no language data and Pagefind's UI would wait forever,
  // so with nothing to search the page says so instead of loading the UI.
  test('the search page loads without console errors and explains there is nothing yet', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const res = await page.goto('/search/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('[data-empty-state]')).toBeVisible();
    await expect(input(page)).toHaveCount(0);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('has no axe violations', async ({ page }) => {
    await page.goto('/search/');
    await expectNoA11yViolations(page);
  });
});
