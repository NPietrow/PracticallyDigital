import { test, expect, type Page } from '@playwright/test';
import { expectNoA11yViolations } from './helpers/axe';

const ALPHA = '/insights/alpha-data-quality/';
const BETA = '/insights/beta-digital-twins/';

const isMobile = (name: string) => name === 'mobile';

// The visible contents list: the sidebar on desktop, the dropdown on phones.
const tocLinks = (page: Page) => page.locator('[data-toc-list]:visible a');
const openContents = (page: Page) => page.locator('details[data-toc-dropdown] > summary').click();

test.describe('article page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ALPHA);
  });

  test('h1 is the article title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Fixture alpha on data quality for test runs');
  });

  test('metadata label shows the topic and reading time', async ({ page }) => {
    await expect(page.locator('[data-article-meta]')).toHaveText(/^Data foundations \/ \d+ min$/);
  });

  test('byline shows published and last reviewed dates', async ({ page }) => {
    await expect(page.locator('time[datetime="2026-10-20"]')).toHaveText('20 October 2026');
    await expect(page.getByText('Last reviewed')).toBeVisible();
    await expect(page.locator('time[datetime="2026-11-01"]')).toHaveText('1 November 2026');
  });

  test('gist box shows the gist', async ({ page }) => {
    await expect(page.locator('[data-gist]')).toContainText(
      'Fixture gist for alpha. Bad data breaks every tool that sits on top of it.',
    );
  });

  test('contents has six numbered items linking to the h2 ids', async ({ page }, testInfo) => {
    if (isMobile(testInfo.project.name)) await openContents(page);
    const links = tocLinks(page);
    await expect(links).toHaveCount(6);
    const ids = await page.locator('[data-prose] h2').evaluateAll((hs) => hs.map((h) => h.id));
    expect(ids).toHaveLength(6);
    for (let i = 0; i < 6; i++) {
      await expect(links.nth(i)).toHaveAttribute('href', `#${ids[i]}`);
      await expect(links.nth(i).locator('[data-toc-number]')).toHaveText(String(i + 1).padStart(2, '0'));
    }
  });

  test('clicking item 03 scrolls to its heading and marks it current', async ({ page }, testInfo) => {
    if (isMobile(testInfo.project.name)) await openContents(page);
    const item = tocLinks(page).nth(2);
    const id = (await item.getAttribute('href'))!.slice(1);
    await item.click();
    await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
    await expect(page.locator(`[data-toc-list] a[href="#${id}"][aria-current="true"]`).first()).toBeAttached();
    if (isMobile(testInfo.project.name)) {
      // The dropdown closes after a jump so the text isn't hidden under the open list.
      await expect(page.locator('details[data-toc-dropdown]')).not.toHaveAttribute('open', /.*/);
    } else {
      await expect(page.locator('[data-toc-list] a[aria-current="true"]:visible')).toHaveCount(1);
    }
  });

  test('topic tag links to the topic page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Data foundations', exact: true })).toHaveAttribute(
      'href',
      '/topics/data-foundations/',
    );
    await expect(page.getByRole('link', { name: 'Untrusted or siloed data' })).toHaveAttribute(
      'href',
      '/problems/untrusted-data/',
    );
  });

  test('every topic and problem gets a tag, and the first topic labels the article', async ({
    page,
  }) => {
    const topics = page.getByRole('list', { name: 'Topics' }).getByRole('link');
    await expect(topics).toHaveText(['Data foundations', 'AI and analytics']);
    const problems = page.getByRole('list', { name: 'Problems' }).getByRole('link');
    await expect(problems).toHaveText(['Untrusted or siloed data', 'No visibility of operations']);
    await expect(page.locator('[data-article-meta]')).toHaveText(/^Data foundations \//);
  });

  test('hero image is optimised and has alt text', async ({ page }) => {
    const hero = page.getByAltText('Fixture hero image showing a plain grey rectangle');
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute('src', /\/_astro\/.+\.webp$/);
  });

  test('social image is the hero, as an absolute URL', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /^https:\/\/practicallydigital\.co\.uk\/_astro\/.+\.(jpg|jpeg|png)$/,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  });

  test('has Article structured data', async ({ page }) => {
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json!);
    expect(data['@type']).toBe('Article');
    expect(data.headline).toBe('Fixture alpha on data quality for test runs');
    expect(data.datePublished).toBe('2026-10-20T00:00:00.000Z');
    expect(data.dateModified).toBe('2026-11-01T00:00:00.000Z');
    expect(data.author).toEqual({ '@type': 'Person', name: 'Nikita Pietrow' });
  });

  test('wide table scrolls inside its own keyboard-reachable box', async ({ page }) => {
    const box = page.locator('[data-prose] .table-scroll');
    await expect(box).toHaveAttribute('tabindex', '0');
    await expect(box.locator('table')).toHaveCount(1);
  });

  test('reading progress bar sits under the header', async ({ page }) => {
    await expect(page.locator('[data-reading-progress]')).toBeAttached();
  });

  test('has no axe violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });
});

test('wide figure is wider than the paragraph column on desktop', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo.project.name), 'desktop layout');
  await page.goto(ALPHA);
  const figure = await page.locator('[data-prose] figure[data-size="wide"]').boundingBox();
  const para = await page.locator('[data-prose] > p').first().boundingBox();
  expect(figure!.width).toBeGreaterThan(para!.width + 50);
});

test('contents pane stays in view while reading on desktop', async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo.project.name), 'desktop layout');
  await page.goto(ALPHA);
  await page.getByText('Paragraph text for the fifth section.').scrollIntoViewIfNeeded();
  await expect(page.locator('.toc__pane')).toBeInViewport();
});

test('on phones the contents is a closed dropdown and nothing scrolls sideways', async ({
  page,
}, testInfo) => {
  test.skip(!isMobile(testInfo.project.name), 'phone layout');
  await page.goto(ALPHA);
  const details = page.locator('details[data-toc-dropdown]');
  await expect(details).toBeVisible();
  await expect(details).not.toHaveAttribute('open', /.*/);
  await expect(details.locator('summary')).toHaveText('Contents');
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(375);
});

test('MDX article renders, with an inline Figure and no review date', async ({ page }) => {
  await page.goto(BETA);
  await expect(page.getByText('MDX expression rendered')).toBeVisible();
  const figure = page.locator('[data-prose] figure[data-size="inline"]');
  await expect(figure.locator('img')).toHaveAttribute('alt', 'Fixture inline diagram, a plain grey square');
  await expect(figure.locator('figcaption')).toHaveText('Fixture inline figure.');
  await expect(page.locator('[data-prose] .table-scroll[tabindex="0"] table')).toHaveCount(1);
  await expect(page.getByText('Last reviewed')).toHaveCount(0);
});

test('draft article is not built', async ({ page }) => {
  const response = await page.goto('/insights/gamma-draft/');
  expect(response!.status()).toBe(404);
});

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('contents links are plain anchors and the body is visible', async ({ page }, testInfo) => {
    await page.goto(ALPHA);
    if (isMobile(testInfo.project.name)) await openContents(page);
    const hrefs = await tocLinks(page).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs).toHaveLength(6);
    for (const href of hrefs) expect(href).toMatch(/^#[\w-]+$/);
    await expect(page.getByText('Paragraph text for the fifth section.')).toBeVisible();
  });
});
