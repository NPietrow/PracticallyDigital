// Checks every link in the given article files.
//   npm run build
//   npm run check:links -- src/content/articles/<slug>.mdx
// External links get a HEAD request (GET if the server refuses HEAD), internal
// links are looked up in dist/, and relative files next to the article must exist.
// Prints one line per link and exits 1 if any link is broken. "check" lines
// are links a person should open in a browser; they don't fail the run.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { classifyStatus, extractLinks, type Link, type LinkResult, type LinkVerdict } from '../src/lib/links.ts';

const USER_AGENT = 'practically-digital-linkcheck';
const TIMEOUT_MS = 10_000;
const CONCURRENCY = 4;
const DIST = 'dist';

type Row = { verdict: LinkVerdict; detail: string; file: string; link: Link };

async function request(url: string, method: 'HEAD' | 'GET'): Promise<LinkResult> {
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    await response.body?.cancel();
    return { status: response.status };
  } catch (err) {
    const e = err as Error & { cause?: { code?: string } };
    if (e.name === 'TimeoutError' || e.name === 'AbortError') return { error: 'timeout' };
    return { error: e.cause?.code ?? e.message };
  }
}

async function checkExternal(url: string): Promise<LinkResult> {
  const head = await request(url, 'HEAD');
  if ('status' in head && (head.status === 405 || head.status === 501)) return request(url, 'GET');
  return head;
}

function checkInternal(url: string): LinkResult {
  const path = url.split(/[?#]/)[0];
  const target = /\.[a-z0-9]+$/i.test(path) ? join(DIST, path) : join(DIST, path, 'index.html');
  return existsSync(target) ? { status: 200 } : { status: 404 };
}

async function checkLink(file: string, link: Link): Promise<Row> {
  const { url } = link;
  let result: LinkResult;
  if (/^https?:\/\//.test(url)) result = await checkExternal(url);
  else if (url.startsWith('/')) result = checkInternal(url);
  else result = existsSync(resolve(dirname(file), url.split(/[?#]/)[0])) ? { status: 200 } : { status: 404 };
  const detail = 'status' in result ? String(result.status) : result.error;
  return { verdict: classifyStatus(result), detail, file, link };
}

// Anchors, email links and inline data don't point at anything to fetch.
const skip = (url: string) => /^(#|mailto:|tel:|data:)/.test(url);

async function main() {
  const args = process.argv.slice(2);
  const files = args.filter((f) => /\.mdx?$/.test(f));
  for (const f of args.filter((a) => !files.includes(a))) console.error(`Skipping ${f}: not a .md or .mdx file.`);
  if (files.length === 0) {
    console.error('Usage: npm run check:links -- <article file> [more files]');
    process.exit(2);
  }
  if (!existsSync(DIST)) {
    console.error('dist/ is missing, so internal links cannot be checked. Run "npm run build" first.');
    process.exit(2);
  }

  const jobs = files.flatMap((file) =>
    extractLinks(readFileSync(file, 'utf8'))
      .filter((link) => !skip(link.url))
      .map((link) => () => checkLink(file, link)),
  );

  const rows: Row[] = [];
  let next = 0;
  async function worker() {
    while (next < jobs.length) rows.push(await jobs[next++]());
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  rows.sort((a, b) => a.file.localeCompare(b.file) || a.link.line - b.link.line);
  for (const r of rows) {
    console.log(`${r.verdict.padEnd(6)} ${r.detail.padEnd(12)} ${r.file}:${r.link.line}  ${r.link.url}`);
  }
  const count = (v: LinkVerdict) => rows.filter((r) => r.verdict === v).length;
  console.log(`\n${rows.length} links: ${count('ok')} ok, ${count('check')} to check by hand, ${count('broken')} broken.`);
  if (count('broken') > 0) process.exit(1);
}

await main();
