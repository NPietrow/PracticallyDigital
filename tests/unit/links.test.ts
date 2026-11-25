import { describe, it, expect } from 'vitest';
import { checkExternal, classifyStatus, describeResult, extractLinks, isFileLink, type LinkResult } from '../../src/lib/links';

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

describe('checkExternal', () => {
  // A stand-in for the network: answers by method, and records what was asked.
  function server(answers: Record<'HEAD' | 'GET', LinkResult>) {
    const asked: string[] = [];
    const request = async (_url: string, method: 'HEAD' | 'GET') => {
      asked.push(method);
      return answers[method];
    };
    return { asked, request };
  }

  it('stops at HEAD when HEAD succeeds', async () => {
    const s = server({ HEAD: { status: 200 }, GET: { status: 500 } });
    expect(await checkExternal('https://example.org', s.request)).toEqual({ status: 200 });
    expect(s.asked).toEqual(['HEAD']);
  });

  // Some servers and CDNs answer HEAD wrongly (404, 403, 405) but serve the page to GET.
  it('retries with GET whenever HEAD does not succeed, and trusts the GET answer', async () => {
    for (const head of [{ status: 404 }, { status: 403 }, { status: 405 }, { error: 'ECONNRESET' }]) {
      const s = server({ HEAD: head, GET: { status: 200 } });
      expect(await checkExternal('https://example.org', s.request)).toEqual({ status: 200 });
      expect(s.asked).toEqual(['HEAD', 'GET']);
    }
  });

  it('reports a real 404 when GET agrees', async () => {
    const s = server({ HEAD: { status: 404 }, GET: { status: 404 } });
    expect(classifyStatus(await checkExternal('https://example.org', s.request))).toBe('broken');
  });

  it('does not retry a host that does not exist', async () => {
    const s = server({ HEAD: { error: 'ENOTFOUND' }, GET: { status: 200 } });
    expect(await checkExternal('https://example.org', s.request)).toEqual({ error: 'ENOTFOUND' });
    expect(s.asked).toEqual(['HEAD']);
  });
});

describe('isFileLink', () => {
  it('spots links straight to a document file', () => {
    expect(isFileLink('https://example.org/report.pdf')).toBe(true);
    expect(isFileLink('https://example.org/data/tables.XLSX')).toBe(true);
    expect(isFileLink('https://example.org/templates.zip?v=2')).toBe(true);
    expect(isFileLink('https://example.org/docs/annual-report/download')).toBe(true);
    expect(isFileLink('https://www.ons.gov.uk/file?uri=/economy/datasets/wave165.xlsx')).toBe(true);
  });

  it('leaves pages alone', () => {
    expect(isFileLink('https://www.gov.uk/government/publications/ai-adoption-survey-2026')).toBe(false);
    expect(isFileLink('https://example.org/reports/pdf-accessibility-guide/')).toBe(false);
    expect(isFileLink('/insights/data-foundations/')).toBe(false);
  });
});

describe('describeResult', () => {
  it('says in plain words why a link needs checking by hand or is broken', () => {
    expect(describeResult({ status: 200 })).toBe('200');
    expect(describeResult({ status: 401 })).toBe('401 sign-in');
    expect(describeResult({ status: 403 })).toBe('403 blocked');
    expect(describeResult({ status: 429 })).toBe('429 rate-limited');
    expect(describeResult({ status: 503 })).toBe('503 server error');
    expect(describeResult({ status: 404 })).toBe('404 not found');
    expect(describeResult({ status: 410 })).toBe('410 gone');
    expect(describeResult({ error: 'timeout' })).toBe('timeout');
    expect(describeResult({ error: 'ENOTFOUND' })).toBe('no such site');
    expect(describeResult({ error: 'ECONNREFUSED' })).toBe('refused');
    expect(describeResult({ error: 'ECONNRESET' })).toBe('ECONNRESET');
  });
});
