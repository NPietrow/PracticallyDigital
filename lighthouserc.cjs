// Lighthouse CI: scores six key pages of a deployed site and fails if any
// category falls below its threshold. The address comes from PD_DEPLOYED_URL,
// the same variable the deployed Playwright checks use.
const base = (process.env.PD_DEPLOYED_URL ?? '').trim().replace(/\/+$/, '');
if (!base) {
  throw new Error('PD_DEPLOYED_URL is not set: give the address of the deployed site to check.');
}

const PAGES = ['/', '/insights/', '/topics/', '/digital-lab/', '/about/', '/search/'];

module.exports = {
  ci: {
    collect: {
      url: PAGES.map((path) => `${base}${path}`),
      // Three runs per page; Lighthouse CI asserts on the median, which smooths
      // out noise from shared CI machines.
      numberOfRuns: 3,
      settings: {
        // The site is deliberately noindex until launch (plan 3), which would
        // otherwise fail the "page is blocked from indexing" SEO audit.
        skipAudits: ['is-crawlable'],
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-report',
    },
  },
};
