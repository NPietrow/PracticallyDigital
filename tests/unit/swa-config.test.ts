import { existsSync, readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Azure Static Web Apps reads this file from the root of the deployed site.
// Astro copies everything in public/ to the build root, so this is where it lives.
const PATH = 'public/staticwebapp.config.json';

function loadConfig(): any {
  return JSON.parse(readFileSync(PATH, 'utf8'));
}

describe('Static Web Apps config', () => {
  it('exists and parses as JSON', () => {
    expect(existsSync(PATH)).toBe(true);
    expect(() => loadConfig()).not.toThrow();
  });

  it('serves the site 404 page with a real 404 status', () => {
    expect(loadConfig().responseOverrides['404']).toEqual({
      rewrite: '/404.html',
      statusCode: 404,
    });
  });

  it('redirects folder addresses to the trailing-slash form and leaves files alone', () => {
    expect(loadConfig().trailingSlash).toBe('auto');
  });

  it('has no single-page-app fallback, which would turn unknown addresses into 200s', () => {
    expect(loadConfig()).not.toHaveProperty('navigationFallback');
  });

  it('sends the five security headers with exact values', () => {
    expect(loadConfig().globalHeaders).toEqual({
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000',
    });
  });

  it('stays within the 20 KB file size Static Web Apps accepts', () => {
    expect(statSync(PATH).size).toBeLessThanOrEqual(20 * 1024);
  });
});
