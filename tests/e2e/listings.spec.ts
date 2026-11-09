import { test, expect, type Page } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/axe';

// Fixture dates: alpha 20 Oct 2026, beta 5 Oct 2026, delta 1 Mar 2026; gamma is a draft.
const ALPHA = 'Fixture alpha on data quality for test runs';
const BETA = 'Fixture beta on digital twins for test runs';
const DELTA = 'Fixture delta, the oldest article for test runs';
const GAMMA = 'Fixture gamma, a draft that must never ship';

const cards = (page: Page) => page.locator('[data-article-card]');
const cardTitles = (page: Page) => cards(page).locator('[data-card-title]');
const emptyState = (page: Page) => page.locator('[data-empty-state]');

test.describe('Insights listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/');
  });

  test('lists every published article, newest first, without the draft', async ({ page }) => {
    await expect(cardTitles(page)).toHaveText([ALPHA, BETA, DELTA]);
    await expect(page.getByText(GAMMA)).toHaveCount(0);
  });

  test('card titles link to the article pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: ALPHA })).toHaveAttribute(
      'href',
      '/insights/alpha-data-quality/',
    );
  });

  test('a card shows the description, main topic, reading time and date', async ({ page }) => {
    const alpha = cards(page).first();
    await expect(alpha).toContainText(
      'Test fixture article about data quality, used by the automated tests only.',
    );
    await expect(alpha.locator('[data-card-meta]')).toHaveText(/^Data foundations \/ \d+ min$/);
    await expect(alpha.locator('time')).toHaveAttribute('datetime', '2026-10-20');
  });

  test('dates are written as D Month YYYY', async ({ page }) => {
    await expect(cards(page).locator('time')).toHaveText([
      '20 October 2026',
      '5 October 2026',
      '1 March 2026',
    ]);
  });

  test('has filter chips by problem and by technology linking to the static pages', async ({
    page,
  }) => {
    const byProblem = page.getByRole('list', { name: 'By problem' }).getByRole('link');
    const byTech = page.getByRole('list', { name: 'By technology' }).getByRole('link');
    await expect(byProblem).toHaveCount(6);
    await expect(byTech).toHaveCount(6);
    await expect(byProblem.first()).toHaveAttribute('href', '/problems/untrusted-data/');
    await expect(byTech.first()).toHaveAttribute('href', '/topics/data-foundations/');
  });

  test('has no axe violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });
});

test.describe('topic page', () => {
  test('lists only the articles on that topic', async ({ page }) => {
    await page.goto('/topics/digital-twins/');
    await expect(page.locator('h1')).toHaveText('Digital twins');
    await expect(cardTitles(page)).toHaveText([BETA]);
  });

  test('counts an article under each of its topics, not just the first', async ({ page }) => {
    await page.goto('/topics/ai-and-analytics/');
    await expect(cardTitles(page)).toHaveText([ALPHA, DELTA]);
  });

  test('marks its own chip as current', async ({ page }) => {
    await page.goto('/topics/digital-twins/');
    await expect(
      page.getByRole('list', { name: 'By technology' }).locator('[aria-current="page"]'),
    ).toHaveText('Digital twins');
  });

  test('a topic with no articles still exists and shows the empty state', async ({ page }) => {
    const res = await page.goto('/topics/cloud-and-infrastructure/');
    expect(res?.status()).toBe(200);
    await expect(emptyState(page)).toBeVisible();
  });

  test('has no axe violations', async ({ page }) => {
    await page.goto('/topics/digital-twins/');
    await expectNoA11yViolations(page);
  });
});

test.describe('problem page', () => {
  test('lists only the articles on that problem', async ({ page }) => {
    await page.goto('/problems/no-visibility/');
    await expect(page.locator('h1')).toHaveText('No visibility of operations');
    await expect(cardTitles(page)).toHaveText([ALPHA]);
  });

  test('with no articles, shows the empty state with a link back to Insights', async ({ page }) => {
    const res = await page.goto('/problems/energy-and-cost/');
    expect(res?.status()).toBe(200);
    await expect(cards(page)).toHaveCount(0);
    await expect(emptyState(page)).toBeVisible();
    await expect(emptyState(page).getByRole('link')).toHaveAttribute('href', '/insights/');
  });

  test('has no axe violations', async ({ page }) => {
    await page.goto('/problems/energy-and-cost/');
    await expectNoA11yViolations(page);
  });
});

test.describe('Topics index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/topics/');
  });

  test('lists the six topics with their descriptions', async ({ page }) => {
    const topics = page.locator('[data-term-list="topics"] [data-term]');
    await expect(topics).toHaveCount(6);
    const first = topics.first();
    await expect(first.getByRole('link')).toHaveText('Data foundations');
    await expect(first.getByRole('link')).toHaveAttribute('href', '/topics/data-foundations/');
    await expect(first).toContainText(
      'Getting data you can trust: collecting it, cleaning it, joining it up and looking after it.',
    );
  });

  test('lists the six problems too, linking to their pages', async ({ page }) => {
    const problems = page.locator('[data-term-list="problems"] [data-term]');
    await expect(problems).toHaveCount(6);
    await expect(problems.first().getByRole('link')).toHaveAttribute(
      'href',
      '/problems/untrusted-data/',
    );
  });

  test('has no axe violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });
});

test('listing pages have no horizontal scroll at phone width', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'phone-width check');
  const paths = ['/insights/', '/topics/', '/topics/digital-twins/', '/problems/energy-and-cost/'];
  for (const path of paths) {
    await page.goto(path);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, path).toBeLessThanOrEqual(375);
  }
});

// Run only by the `empty` Playwright project: a build with zero articles,
// which is the real state of production until the first article ships.
test.describe('with zero articles', { tag: '@empty' }, () => {
  for (const path of ['/', '/insights/', '/topics/data-foundations/']) {
    test(`${path} loads and shows the empty state`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(emptyState(page)).toBeVisible();
      await expect(cards(page)).toHaveCount(0);
    });
  }

  test('a problem page still exists', async ({ page }) => {
    const res = await page.goto('/problems/untrusted-data/');
    expect(res?.status()).toBe(200);
    await expect(emptyState(page)).toBeVisible();
  });

  test('the Insights empty state has no axe violations', async ({ page }) => {
    await page.goto('/insights/');
    await expectNoA11yViolations(page);
  });
});
