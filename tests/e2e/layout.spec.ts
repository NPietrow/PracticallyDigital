import { test, expect } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/axe';

test.describe('base layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('is noindex by default', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('has a canonical URL and social tags on the production domain', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://practicallydigital.co.uk/',
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://practicallydigital.co.uk/og-default.png',
    );
  });

  test('first Tab focuses the skip link, which targets main', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveText('Skip to content');
    await expect(focused).toHaveAttribute('href', '#main');
    await expect(page.locator('main#main')).toHaveCount(1);
  });

  test('header nav has the five links in order', async ({ page }) => {
    const links = page.getByRole('navigation', { name: 'Main' }).getByRole('link');
    await expect(links).toHaveText(['Insights', 'Topics', 'Digital Lab', 'About', 'Search']);
  });

  test('has no axe violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });
});

test('no horizontal scroll at phone width', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'phone-width check');
  await page.goto('/');
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(375);
});
