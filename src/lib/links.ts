// Link extraction and status rules for the link checker (scripts/check-links.ts).
// Kept free of Astro and Vite imports so Node can run the script directly.

export type Link = { url: string; text: string; line: number };
export type LinkResult = { status: number } | { error: string };
export type LinkVerdict = 'ok' | 'broken' | 'check';

const FENCE = /^\s*(`{3,}|~{3,})/;
// [text](url "optional title"), allowing one level of brackets inside the URL.
const INLINE = /\[([^\]]*)\]\(((?:[^()\s]|\([^()\s]*\))+)(?:\s+"[^"]*")?\)/g;
const AUTOLINK = /<(https?:\/\/[^>\s]+)>/g;
const ATTRIBUTE = /\b(?:href|src)="([^"]+)"/g;

/** Every link in an article: Markdown links, autolinks and JSX href/src. Code blocks are skipped. */
export function extractLinks(source: string): Link[] {
  const links: Link[] = [];
  let fence: string | null = null;
  source.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1;
    if (fence) {
      if (raw.trim().startsWith(fence)) fence = null;
      return;
    }
    const opening = FENCE.exec(raw);
    if (opening) {
      fence = opening[1];
      return;
    }
    const text = raw.replace(/`[^`]*`/g, ' ');
    for (const m of text.matchAll(INLINE)) links.push({ url: m[2], text: m[1], line });
    for (const m of text.matchAll(AUTOLINK)) links.push({ url: m[1], text: m[1], line });
    for (const m of text.matchAll(ATTRIBUTE)) links.push({ url: m[1], text: '', line });
  });
  return links;
}

// The host doesn't exist or refused the connection: the link is dead.
const DEAD = /ENOTFOUND|ECONNREFUSED|EHOSTUNREACH|ENETUNREACH|ERR_INVALID_URL/;

/**
 * ok: 2xx or 3xx. broken: 404, 410, or no such host. check: anything a person
 * should open in a browser, because publishers often block bots (401, 403,
 * 429), servers have bad days (5xx) and some are just slow (timeouts).
 */
export function classifyStatus(result: LinkResult): LinkVerdict {
  if ('error' in result) return DEAD.test(result.error) ? 'broken' : 'check';
  const { status } = result;
  if (status >= 200 && status < 400) return 'ok';
  if (status === 404 || status === 410) return 'broken';
  return 'check';
}
