import { test, expect } from '@playwright/test';

test('home responds with site title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Practically Digital/);
});
