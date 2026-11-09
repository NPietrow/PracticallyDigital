import { describe, it, expect, afterEach, vi } from 'vitest';
import { showDrafts, allowIndexing } from '../../src/lib/env';

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
