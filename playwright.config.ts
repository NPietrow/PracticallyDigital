import { defineConfig, devices } from '@playwright/test';

const PORT = 4321; // fixture articles
const EMPTY_PORT = 4322; // zero articles

// Tests tagged @empty run only against the zero-article build; every other
// test runs only against the fixture build.
const EMPTY_TAG = /@empty/;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      grepInvert: EMPTY_TAG,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      grepInvert: EMPTY_TAG,
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
    {
      name: 'empty',
      grep: EMPTY_TAG,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        baseURL: `http://localhost:${EMPTY_PORT}`,
      },
    },
  ],
  // Each server builds the site into its own folder, then serves it. Playwright
  // starts web servers one after another (each waits for its URL), so the two
  // builds never run at the same time and can't clash over Astro's cache.
  webServer: [
    {
      command: `npm run build && npm run preview -- --port ${PORT}`,
      url: `http://localhost:${PORT}/`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        PD_CONTENT_DIR: 'tests/fixtures/articles',
        PD_OUT_DIR: './dist-test',
        PUBLIC_SHOW_DRAFTS: 'false',
      },
    },
    {
      // Type-checking already ran in the first build, so this one skips astro check.
      // Astro allows one tracked preview server per project; --ignore-lock lets
      // this one run alongside the fixture server.
      command: `npm run astro -- build && npm run preview -- --port ${EMPTY_PORT} --ignore-lock`,
      url: `http://localhost:${EMPTY_PORT}/`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        PD_CONTENT_DIR: 'tests/fixtures/empty',
        PD_OUT_DIR: './dist-empty',
        PUBLIC_SHOW_DRAFTS: 'false',
      },
    },
  ],
});
