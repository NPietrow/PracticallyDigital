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
