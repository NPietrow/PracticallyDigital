import { defineConfig, devices } from '@playwright/test';

// Checks that run against a site that's already deployed: an SWA preview, the
// production site, or a local `astro preview`. Nothing is built or started
// here. The address comes from PD_DEPLOYED_URL, for example:
//   $env:PD_DEPLOYED_URL = "https://<words>-12.westeurope.azurestaticapps.net"; npm run test:deployed
const deployedUrl = process.env.PD_DEPLOYED_URL?.trim().replace(/\/+$/, '');
if (!deployedUrl) {
  throw new Error('PD_DEPLOYED_URL is not set: give the address of the deployed site to check.');
}

export default defineConfig({
  testDir: './tests/deployed',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // On CI the html report is uploaded as an artifact, so a failure can be read
  // without re-running anything.
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: deployedUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
  ],
});
