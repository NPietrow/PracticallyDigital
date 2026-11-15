import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const HOOK = '.githooks/pre-commit';

describe('Dependabot', () => {
  const config = () => parse(readFileSync('.github/dependabot.yml', 'utf8'));
  const updates = () => config().updates as any[];
  const forEcosystem = (name: string) => updates().find((u) => u['package-ecosystem'] === name);

  it('covers exactly npm and GitHub Actions, both at the repo root', () => {
    expect(config().version).toBe(2);
    expect(updates().map((u) => u['package-ecosystem']).sort()).toEqual(['github-actions', 'npm']);
    for (const u of updates()) expect(u.directory, u['package-ecosystem']).toBe('/');
  });

  it('checks weekly on Monday and waits 7 days before suggesting a new release', () => {
    for (const u of updates()) {
      expect(u.schedule, u['package-ecosystem']).toEqual({ interval: 'weekly', day: 'monday' });
      expect(u.cooldown, u['package-ecosystem']).toEqual({ 'default-days': 7 });
    }
  });

  it('groups npm minor and patch updates, leaving majors as their own PRs', () => {
    expect(forEcosystem('npm').groups).toEqual({
      'minor-and-patch': { 'update-types': ['minor', 'patch'] },
    });
  });

  it('groups every GitHub Actions update into one PR', () => {
    expect(forEcosystem('github-actions').groups).toEqual({ actions: { patterns: ['*'] } });
  });
});

describe('gitleaks pre-commit hook', () => {
  const hook = () => readFileSync(HOOK, 'utf8');

  it('is a POSIX shell script', () => {
    expect(hook().startsWith('#!/bin/sh\n')).toBe(true);
  });

  it('scans only what is staged, with secrets redacted from the output', () => {
    expect(hook()).toContain('exec gitleaks git --pre-commit --staged --redact --verbose');
  });

  it('refuses the commit, with install instructions, when gitleaks is missing', () => {
    expect(hook()).toMatch(/command -v gitleaks/);
    expect(hook()).toMatch(/winget install/);
    expect(hook()).toMatch(/exit 1/);
  });

  it('has Unix line endings, because a CRLF shebang breaks it on Windows', () => {
    expect(hook()).not.toContain('\r');
  });

  it('.gitattributes forces LF for the hooks folder', () => {
    const attrs = execFileSync('git', ['check-attr', 'text', 'eol', '--', HOOK], { encoding: 'utf8' });
    expect(attrs).toContain(`${HOOK}: eol: lf`);
  });

  it('is committed as an executable file', () => {
    // Mode 100755 in the index; git on Windows doesn't read file permissions,
    // so the executable bit is recorded explicitly.
    const entry = execFileSync('git', ['ls-files', '--stage', '--', HOOK], { encoding: 'utf8' });
    expect(entry).toMatch(/^100755 /);
  });
});

describe('gitleaks config', () => {
  // The two fake analytics tokens the unit tests use look like API keys to
  // gitleaks's generic-api-key rule. They're public test values, so they're
  // allowlisted by exact value; everything else is still scanned.
  const FIXTURE_TOKENS = ['0123456789abcdef0123456789abcdef', '0123456789abcdef0123456789ABCDEF'];
  const config = () => readFileSync('.gitleaks.toml', 'utf8');
  const allowRegexes = () =>
    [...config().matchAll(/'''([^']+)'''/g)].map((m) => new RegExp(m[1]));

  it('keeps every default gitleaks rule', () => {
    expect(config()).toMatch(/^\[extend\]\s*\nuseDefault = true$/m);
  });

  it('allowlists the two fixture tokens and nothing that only resembles them', () => {
    const regexes = allowRegexes();
    expect(regexes.length).toBeGreaterThan(0);
    for (const token of FIXTURE_TOKENS) expect(regexes.some((r) => r.test(token)), token).toBe(true);
    for (const other of ['0123456789abcdef0123456789abcdeg', '0123456789abcdef0123456789abcde', `x${FIXTURE_TOKENS[0]}`]) {
      expect(regexes.some((r) => r.test(other)), other).toBe(false);
    }
  });

  it('the fixture tokens are still the ones the tests use', () => {
    const tests = readFileSync('tests/unit/env.test.ts', 'utf8') + readFileSync('tests/unit/cloudflare-analytics.test.ts', 'utf8');
    for (const token of FIXTURE_TOKENS) expect(tests).toContain(`'${token}'`);
  });
});
