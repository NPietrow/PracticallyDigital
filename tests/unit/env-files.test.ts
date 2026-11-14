import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import playwrightConfig from '../../playwright.config';

const EXPECTED_KEYS = [
  'PUBLIC_SHOW_DRAFTS',
  'PUBLIC_ALLOW_INDEXING',
  'PUBLIC_CF_WEB_ANALYTICS_TOKEN',
  'PD_CONTENT_DIR',
  'PD_OUT_DIR',
];

// KEY=value lines only; comments and blank lines are skipped.
function parseEnvFile(text: string): Map<string, string> {
  const entries = new Map<string, string>();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    entries.set(trimmed.slice(0, eq), trimmed.slice(eq + 1));
  }
  return entries;
}

// `git check-ignore` exits 0 when a path is ignored and 1 when it isn't.
function isIgnored(path: string): boolean {
  try {
    execFileSync('git', ['check-ignore', '-q', '--no-index', path]);
    return true;
  } catch {
    return false;
  }
}

describe('.env.example', () => {
  const entries = () => parseEnvFile(readFileSync('.env.example', 'utf8'));

  it('lists exactly the five build and test switches', () => {
    expect([...entries().keys()].sort()).toEqual([...EXPECTED_KEYS].sort());
  });

  it('leaves every value blank', () => {
    for (const [key, value] of entries()) expect(value, key).toBe('');
  });

  it('gives each key a one-line comment above it', () => {
    const lines = readFileSync('.env.example', 'utf8').split(/\r?\n/);
    for (const key of EXPECTED_KEYS) {
      const at = lines.findIndex((l) => l.startsWith(`${key}=`));
      expect(lines[at - 1], key).toMatch(/^# \S/);
    }
  });
});

describe('.gitignore', () => {
  it('ignores .env and keeps .env.example', () => {
    expect(isIgnored('.env')).toBe(true);
    expect(isIgnored('.env.local')).toBe(true);
    expect(isIgnored('.env.example')).toBe(false);
  });
});

describe('Playwright test servers', () => {
  const servers = [playwrightConfig.webServer].flat();

  it('has both test servers', () => {
    expect(servers).toHaveLength(2);
  });

  // A developer's local .env must never turn on drafts, indexing or analytics
  // in a test build, so every switch is pinned here.
  it('pins drafts, indexing and analytics off on every server', () => {
    for (const server of servers) {
      expect(server?.env).toMatchObject({
        PUBLIC_SHOW_DRAFTS: 'false',
        PUBLIC_ALLOW_INDEXING: 'false',
        PUBLIC_CF_WEB_ANALYTICS_TOKEN: '',
      });
    }
  });
});
