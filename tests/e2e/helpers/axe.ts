import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

// The WCAG 2.2 AA rule sets from the plan's Global Constraints.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

export async function expectNoA11yViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  // Map to id + affected selectors so a failure names what to fix.
  const violations = results.violations.map((v) => ({
    id: v.id,
    help: v.help,
    targets: v.nodes.map((n) => n.target.join(' ')),
  }));
  expect(violations).toEqual([]);
}
