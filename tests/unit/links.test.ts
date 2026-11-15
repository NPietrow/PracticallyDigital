import { describe, it, expect } from 'vitest';
import { classifyStatus, extractLinks } from '../../src/lib/links';

const SOURCE = [
  '---', // 1
  'title: Example', // 2
  '---', // 3
  '', // 4
  'See [the guide](https://example.org/guide) and <https://example.org/auto>.', // 5
  '', // 6
  '<Figure src="./images/a.svg" caption="A diagram" />', // 7
  '<a href="/topics/data-foundations/">the topic</a>', // 8
  '', // 9
  '```markdown', // 10
  '[not a link](https://example.org/in-code)', // 11
  '```', // 12
  '', // 13
  'A [link with brackets](https://en.wikipedia.org/wiki/Twin_(disambiguation)) here.', // 14
].join('\n');

describe('extractLinks', () => {
  const links = extractLinks(SOURCE);

  it('finds an inline link with its text and line', () => {
    expect(links).toContainEqual({ url: 'https://example.org/guide', text: 'the guide', line: 5 });
  });

  it('finds an autolink', () => {
    expect(links).toContainEqual({ url: 'https://example.org/auto', text: 'https://example.org/auto', line: 5 });
  });

  it('finds src and href attributes in JSX, internal links included', () => {
    expect(links).toContainEqual({ url: './images/a.svg', text: '', line: 7 });
    expect(links).toContainEqual({ url: '/topics/data-foundations/', text: '', line: 8 });
  });

  it('keeps brackets that are part of the URL', () => {
    expect(links).toContainEqual({
      url: 'https://en.wikipedia.org/wiki/Twin_(disambiguation)',
      text: 'link with brackets',
      line: 14,
    });
  });

  it('ignores links inside code blocks', () => {
    expect(links.map((l) => l.url)).not.toContain('https://example.org/in-code');
    expect(links).toHaveLength(5);
  });
});

describe('classifyStatus', () => {
  it('treats 2xx and 3xx as ok', () => {
    expect(classifyStatus({ status: 200 })).toBe('ok');
    expect(classifyStatus({ status: 301 })).toBe('ok');
  });

  it('treats 404, 410 and a missing host as broken', () => {
    expect(classifyStatus({ status: 404 })).toBe('broken');
    expect(classifyStatus({ status: 410 })).toBe('broken');
    expect(classifyStatus({ error: 'ENOTFOUND' })).toBe('broken');
    expect(classifyStatus({ error: 'ECONNREFUSED' })).toBe('broken');
  });

  // Many publishers answer bots with 403 or 429; those links usually work in a browser.
  it('sends blocked, rate-limited, failing and slow links to be checked by hand', () => {
    expect(classifyStatus({ status: 401 })).toBe('check');
    expect(classifyStatus({ status: 403 })).toBe('check');
    expect(classifyStatus({ status: 429 })).toBe('check');
    expect(classifyStatus({ status: 400 })).toBe('check');
    expect(classifyStatus({ status: 500 })).toBe('check');
    expect(classifyStatus({ error: 'timeout' })).toBe('check');
    expect(classifyStatus({ error: 'something odd' })).toBe('check');
  });
});
