import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import CloudflareAnalytics from '../../src/components/CloudflareAnalytics.astro';

const TOKEN = '0123456789abcdef0123456789abcdef';
const BEACON = 'https://static.cloudflareinsights.com/beacon.min.js';

async function render(token: string): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(CloudflareAnalytics, { props: { token } });
}

// Reads one attribute's value out of the rendered tag, decoding the HTML
// entities Astro uses inside attribute values.
function attr(html: string, name: string): string | null {
  const match = html.match(new RegExp(String.raw`\s${name}="([^"]*)"`));
  if (!match) return null;
  return match[1].replace(/&quot;/g, '"').replace(/&#34;/g, '"').replace(/&amp;/g, '&');
}

describe('CloudflareAnalytics', () => {
  it('renders exactly one script tag', async () => {
    const html = await render(TOKEN);
    expect(html.match(/<script\b/g)).toHaveLength(1);
  });

  it('loads the Cloudflare beacon, deferred', async () => {
    const html = await render(TOKEN);
    expect(attr(html, 'src')).toBe(BEACON);
    expect(html).toMatch(/<script\b[^>]*\sdefer[\s>=]/);
  });

  // Cloudflare's FAQ: manual snippets need type="module" so browsers too old
  // to run the beacon (Internet Explorer and similar) skip it.
  it('is a module script, so very old browsers skip it', async () => {
    const html = await render(TOKEN);
    expect(attr(html, 'type')).toBe('module');
  });

  it('passes the token as JSON in data-cf-beacon', async () => {
    const html = await render(TOKEN);
    expect(JSON.parse(attr(html, 'data-cf-beacon') ?? 'null')).toEqual({ token: TOKEN });
  });
});
