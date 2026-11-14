import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { allSteps, loadAction, loadWorkflow, rawWorkflows } from './helpers/workflows';

const SWA_ACTION = 'Azure/static-web-apps-deploy@';
const TOKEN_REF = 'secrets.AZURE_STATIC_WEB_APPS_API_TOKEN';
const SAME_REPO = 'github.event.pull_request.head.repo.full_name == github.repository';
const NOT_DEPENDABOT = "github.event.pull_request.user.login != 'dependabot[bot]'";

function buildSteps(workflow: any) {
  return allSteps(workflow).filter(({ step }) => /npm run build\b/.test(step.run ?? ''));
}

describe('all workflows', () => {
  it('there is at least one workflow to check', () => {
    expect(rawWorkflows().length).toBeGreaterThan(0);
  });

  it('no workflow uses pull_request_target', () => {
    for (const { file, text } of rawWorkflows()) expect(text, file).not.toContain('pull_request_target');
  });

  it('every third-party action is pinned to a full commit SHA with a version comment', () => {
    for (const { file, text } of rawWorkflows()) {
      for (const line of text.split(/\r?\n/)) {
        const m = line.match(/^\s*(?:-\s+)?uses:\s*(\S+)(.*)$/);
        if (!m || m[1].startsWith('./')) continue;
        expect(`${m[1]}${m[2]}`, `${file}: ${line.trim()}`).toMatch(/@[0-9a-f]{40}\s+#\s+v\d+(\.\d+)*/);
      }
    }
  });

  it('the deploy token reaches only the Static Web Apps action', () => {
    for (const { file, text } of rawWorkflows()) {
      if (!file.includes('workflows')) {
        expect(text, file).not.toContain(TOKEN_REF);
        continue;
      }
      const name = file.split(/[\\/]/).pop()!;
      const steps = allSteps(loadWorkflow(name)).map(({ step }) => step);
      const inSwaSteps = steps
        .filter((s) => String(s.uses ?? '').startsWith(SWA_ACTION))
        .reduce((n, s) => n + JSON.stringify(s).split(TOKEN_REF).length - 1, 0);
      const everywhere = text.split(TOKEN_REF).length - 1;
      expect(everywhere, `${file}: token used outside the SWA action`).toBe(inSwaSteps);
    }
  });
});

describe('ci.yml (pull requests)', () => {
  const ci = () => loadWorkflow('ci.yml');

  it('runs on pull requests, including when they close', () => {
    expect(ci().on.pull_request.types).toEqual(['opened', 'synchronize', 'reopened', 'closed']);
  });

  it('workflows default to read-only contents', () => {
    expect(ci().permissions).toEqual({ contents: 'read' });
  });

  it('the PR checks are named build, gitleaks and accessibility', () => {
    const jobs = ci().jobs;
    expect(jobs.build.name).toBe('build');
    expect(jobs.gitleaks.name).toBe('gitleaks');
    expect(jobs.accessibility.name).toBe('accessibility');
  });

  it('build and gitleaks skip closed PRs', () => {
    for (const job of ['build', 'gitleaks']) {
      expect(ci().jobs[job].if, job).toContain("github.event.action != 'closed'");
    }
  });

  it('the preview deploy is skipped for forks and Dependabot', () => {
    for (const job of ['accessibility', 'close-preview']) {
      const condition = ci().jobs[job].if;
      expect(condition, job).toContain(SAME_REPO);
      expect(condition, job).toContain(NOT_DEPENDABOT);
    }
  });

  it('the preview checks run only after a successful build, one run per PR at a time', () => {
    const job = ci().jobs.accessibility;
    expect(job.needs).toBe('build');
    expect(job.if).toContain("github.event.action != 'closed'");
    expect(job.concurrency).toEqual({
      group: 'preview-${{ github.event.pull_request.number }}',
      'cancel-in-progress': true,
    });
    expect(job.permissions).toEqual({ contents: 'read', 'pull-requests': 'write' });
  });

  it('deploys the tested build to a preview, then checks it', () => {
    const steps = ci().jobs.accessibility.steps;
    const deploy = steps.find((s: any) => String(s.uses ?? '').startsWith(SWA_ACTION));
    expect(deploy.id).toBe('deploy');
    expect(deploy.with).toMatchObject({
      action: 'upload',
      app_location: 'dist',
      output_location: '',
      skip_app_build: true,
      azure_static_web_apps_api_token: '${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}',
      repo_token: '${{ secrets.GITHUB_TOKEN }}',
    });
    const download = steps.find((s: any) => String(s.uses ?? '').startsWith('actions/download-artifact@'));
    expect(download.with).toEqual({ name: 'site', path: 'dist' });
    expect(steps.indexOf(download)).toBeLessThan(steps.indexOf(deploy));

    const after = steps.slice(steps.indexOf(deploy) + 1);
    for (const script of ['npm run test:deployed', 'npm run test:lighthouse']) {
      const step = after.find((s: any) => s.run === script);
      expect(step, script).toBeDefined();
      expect(step.env.PD_DEPLOYED_URL).toBe('${{ steps.deploy.outputs.static_web_app_url }}');
    }
  });

  it('the build job uploads the site it tested', () => {
    const steps = ci().jobs.build.steps;
    const upload = steps.find(
      (s: any) => String(s.uses ?? '').startsWith('actions/upload-artifact@') && s.with?.name === 'site',
    );
    expect(upload.with).toMatchObject({ path: 'dist', 'retention-days': 7 });
    const order = ['npm test', 'npm run build', 'npm run test:e2e'].map((cmd) =>
      steps.findIndex((s: any) => s.run === cmd),
    );
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(steps.indexOf(upload)).toBeGreaterThan(order[2]);
  });

  it('gitleaks scans the full history and stays read-only', () => {
    const job = ci().jobs.gitleaks;
    const checkout = job.steps.find((s: any) => String(s.uses ?? '').startsWith('actions/checkout@'));
    expect(checkout.with['fetch-depth']).toBe(0);
    const scan = job.steps.find((s: any) => String(s.uses ?? '').startsWith('gitleaks/gitleaks-action@'));
    expect(scan.env).toMatchObject({ GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}', GITLEAKS_ENABLE_COMMENTS: false });
  });

  it('closing a PR removes its preview', () => {
    const job = ci().jobs['close-preview'];
    expect(job.if).toContain("github.event.action == 'closed'");
    const swa = job.steps.find((s: any) => String(s.uses ?? '').startsWith(SWA_ACTION));
    expect(swa.with.action).toBe('close');
  });

  it('PR builds never load the analytics token', () => {
    expect(readFileSync('.github/workflows/ci.yml', 'utf8')).not.toContain('vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN');
  });

  it('every build pins drafts and indexing off, and analytics blank', () => {
    const steps = buildSteps(ci());
    expect(steps.length).toBeGreaterThan(0);
    for (const { job, step } of steps) {
      expect(step.env, job).toMatchObject({
        PUBLIC_SHOW_DRAFTS: 'false',
        PUBLIC_ALLOW_INDEXING: 'false',
        PUBLIC_CF_WEB_ANALYTICS_TOKEN: '',
      });
    }
  });
});

describe('setup action and Node version', () => {
  it("CI's Node comes from .nvmrc and engines agrees", () => {
    const setup = loadAction('setup');
    expect(setup.runs.using).toBe('composite');
    const node = setup.runs.steps.find((s: any) => String(s.uses ?? '').startsWith('actions/setup-node@'));
    expect(node.with).toMatchObject({ 'node-version-file': '.nvmrc', cache: 'npm' });
    expect(setup.runs.steps.some((s: any) => s.run === 'npm ci')).toBe(true);

    const nvmrc = readFileSync('.nvmrc', 'utf8').trim();
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(pkg.engines.node).toBe(`>=${nvmrc}`);
  });

  it('every job checks out the repo before using the local setup action', () => {
    for (const { job, step } of allSteps(loadWorkflow('ci.yml'))) {
      if (step.uses !== './.github/actions/setup') continue;
      const steps = loadWorkflow('ci.yml').jobs[job].steps;
      const checkout = steps.findIndex((s: any) => String(s.uses ?? '').startsWith('actions/checkout@'));
      expect(checkout, job).toBeGreaterThanOrEqual(0);
      expect(checkout, job).toBeLessThan(steps.indexOf(steps.find((s: any) => s.uses === './.github/actions/setup')));
    }
  });
});
