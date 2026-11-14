// Build-time switches. Both are off unless set to the exact string "true",
// so a missing or mistyped value can never publish drafts or allow indexing.

export function showDrafts(): boolean {
  return import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';
}

export function allowIndexing(): boolean {
  return import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';
}

// Cloudflare Web Analytics site token. It's public (it ends up in every page),
// so it's a build variable rather than a secret. Unset or blank means no
// beacon. Anything that isn't a plain token fails the build, so a typo can't
// inject markup into every page or quietly switch analytics off.
const TOKEN_PATTERN = /^[A-Za-z0-9]{16,64}$/;

export function analyticsToken(): string | null {
  const value = (import.meta.env.PUBLIC_CF_WEB_ANALYTICS_TOKEN ?? '').trim();
  if (value === '') return null;
  if (!TOKEN_PATTERN.test(value)) {
    throw new Error(
      'Invalid PUBLIC_CF_WEB_ANALYTICS_TOKEN: expected 16 to 64 letters and digits, as shown in the Cloudflare snippet.',
    );
  }
  return value;
}
