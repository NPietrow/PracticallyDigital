import { describe, it, expect, afterEach, vi } from 'vitest';
import { showDrafts, allowIndexing, analyticsToken } from '../../src/lib/env';

afterEach(() => vi.unstubAllEnvs());

describe('env flags', () => {
  it('are off when unset', () => {
    vi.stubEnv('PUBLIC_SHOW_DRAFTS', undefined);
    vi.stubEnv('PUBLIC_ALLOW_INDEXING', undefined);
    expect(showDrafts()).toBe(false);
    expect(allowIndexing()).toBe(false);
  });

  it('turn on only for the exact string "true"', () => {
    vi.stubEnv('PUBLIC_SHOW_DRAFTS', 'true');
    vi.stubEnv('PUBLIC_ALLOW_INDEXING', 'true');
    expect(showDrafts()).toBe(true);
    expect(allowIndexing()).toBe(true);
  });

  it('stay off for other truthy-looking values', () => {
    vi.stubEnv('PUBLIC_SHOW_DRAFTS', 'TRUE');
    vi.stubEnv('PUBLIC_ALLOW_INDEXING', '1');
    expect(showDrafts()).toBe(false);
    expect(allowIndexing()).toBe(false);
  });
});

describe('analyticsToken', () => {
  const TOKEN = '0123456789abcdef0123456789ABCDEF';

  it('is null when unset', () => {
    vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', undefined);
    expect(analyticsToken()).toBeNull();
  });

  it('is null when empty or only spaces', () => {
    vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', '');
    expect(analyticsToken()).toBeNull();
    vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', '  ');
    expect(analyticsToken()).toBeNull();
  });

  it('returns a 32-character alphanumeric token as it is', () => {
    vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', TOKEN);
    expect(analyticsToken()).toBe(TOKEN);
  });

  it('trims surrounding spaces from a pasted token', () => {
    vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', ` ${TOKEN}\n`);
    expect(analyticsToken()).toBe(TOKEN);
  });

  it('fails the build on anything that is not a plain token', () => {
    for (const bad of ['abc"><script>', 'short', `${TOKEN}x`.repeat(3), 'token with spaces inside']) {
      vi.stubEnv('PUBLIC_CF_WEB_ANALYTICS_TOKEN', bad);
      expect(() => analyticsToken(), bad).toThrow('Invalid PUBLIC_CF_WEB_ANALYTICS_TOKEN');
    }
  });
});
