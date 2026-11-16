// Article linter: the house rules a machine can check, run on every article
// by tests/unit/content.test.ts (so CI's build job enforces them).
// Rules and their reasons: docs/superpowers/plans/2026-11-15-content-and-launch.md, Task 1.
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

/** The two fixed closing sections every article ends with, in this order. */
export const END_SECTIONS = ['Tools and resources', 'Further reading'] as const;
const [TOOLS, READING] = END_SECTIONS;

/** American spellings to catch in prose, with the British form to suggest. */
export const US_SPELLINGS: Readonly<Record<string, string>> = {
  color: 'colour',
  behavior: 'behaviour',
  center: 'centre',
  analyze: 'analyse',
  organization: 'organisation',
  optimize: 'optimise',
  modeling: 'modelling',
  labeled: 'labelled',
  favor: 'favour',
  catalog: 'catalogue',
  defense: 'defence',
};

export type LintRule =
  | 'end-sections'
  | 'tools-and-resources'
  | 'further-reading'
  | 'unsourced-figure'
  | 'leftover-marker'
  | 'link'
  | 'spelling'
  | 'data-foundations-link';

export type LintIssue = { rule: LintRule; line: number; message: string };

type Section = { name: string; line: number };
type Unit = {
  kind: 'paragraph' | 'list' | 'table';
  bullet: boolean;
  section: Section | null;
  lines: { n: number; text: string }[];
};

const FENCE = /^\s*(`{3,}|~{3,})/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const LIST_ITEM = /^\s*(?:[-*+]|\d+[.)])\s+/;
const BULLET = /^\s*[-*+]\s+/;
const TABLE_ROW = /^\s*\|/;
const BLOCKQUOTE = /^\s*>/;
const MDX_ESM = /^(import|export)\s/;
const JSX_TAG = /^\s*<[A-Za-z/!]/;
const JSX_COMMENT = /^\s*\{\/\*/;

const FIGURES = [
  /\d(\.\d+)?\s?%/,
  /\d(\.\d+)?\s?per\s?cent\b/i,
  /[£$€]\s?\d/,
  // No bare "m": it is usually minutes or metres, and "£2m" is a currency amount anyway.
  /\d(\.\d+)?\s?(million|billion|bn)\b/i,
];
const MD_LINK = /\]\([^)\s]+(\s+("[^"]*"|'[^']*'))?\)|<https?:\/\/[^>]+>/;
const HTTPS_LINK = /\]\(https:\/\/|<https:\/\//;
const ESTIMATE = /\bestimated?\b/i;
const MARKERS = [
  /\b(TODO|TBC|FIXME|PLACEHOLDER)\b/,
  // A link whose text is "source", [source](https://…), is a real citation.
  /\[citation needed\](?!\()/i,
  /\[source\](?!\()/i,
  /\(source\?\)/i,
  /XX\s?%/i,
];
const URLS = /\bhttps?:\/\/[^\s)\]>"'`]+/g;
const DATA_FOUNDATIONS_LINK = /\/(insights|topics)\/data-foundations\//;

// Every simple inflection of each American spelling, mapped back to its base word.
const SPELLING_FORMS = new Map<string, string>();
for (const word of Object.keys(US_SPELLINGS)) {
  const forms = [word, `${word}s`, `${word}d`, `${word}ed`, `${word}ing`];
  if (word.endsWith('e')) forms.push(`${word.slice(0, -1)}ing`);
  for (const form of forms) SPELLING_FORMS.set(form, word);
}
const SPELLING = new RegExp(`\\b(${[...SPELLING_FORMS.keys()].join('|')})\\b`, 'gi');

const withoutInlineCode = (text: string) => text.replace(/`[^`]*`/g, ' ');

// Text a reader sees as the author's own words: no code, links, URLs or quotations.
function ownWords(text: string): string {
  return withoutInlineCode(text)
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\[[^\]]*\]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(URLS, ' ')
    .replace(/"[^"]*"/g, ' ')
    .replace(/“[^”]*”/g, ' ')
    .replace(/‘[^’]*’/g, ' ')
    .replace(/(^|[\s(])'[^']+'(?=[\s.,;:!?)]|$)/g, '$1 ');
}

// American spellings in one line of prose. A capitalised word in mid-sentence
// is taken as part of a name ("International Organization for Standardization").
function spellingMessages(text: string): string[] {
  const words = ownWords(text);
  const messages: string[] = [];
  for (const match of words.matchAll(SPELLING)) {
    const found = match[0];
    const before = words.slice(0, match.index).trimEnd();
    const sentenceStart = before === '' || /[.!?:]$/.test(before);
    if (/^[A-Z]/.test(found) && !sentenceStart) continue;
    const base = SPELLING_FORMS.get(found.toLowerCase())!;
    messages.push(`"${found}" is American spelling: use the British form (${base} → ${US_SPELLINGS[base]}).`);
  }
  return messages;
}

function frontMatter(lines: string[]): { end: number; data: Record<string, unknown> | null } {
  if (lines[0]?.trim() !== '---') return { end: -1, data: null };
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (end < 0) return { end: -1, data: null };
  try {
    const data = parse(lines.slice(1, end).join('\n'));
    return { end, data: data && typeof data === 'object' ? data : null };
  } catch {
    return { end, data: null };
  }
}

function linkProblem(url: string): string | null {
  let host = '';
  try {
    host = new URL(url).hostname;
  } catch {
    // Not a parseable URL; the scheme check below still applies.
  }
  if (['localhost', '127.0.0.1', '[::1]'].includes(host)) {
    return `${url} points at a local address. Link to the live page instead.`;
  }
  if (host.endsWith('azurestaticapps.net')) {
    return `${url} points at an Azure preview address. Use https://practicallydigital.co.uk or a relative link.`;
  }
  if (url.startsWith('http://')) return `${url} uses http://. Use https://.`;
  return null;
}

/**
 * Lints one article. `source` is the whole file including front matter, and
 * line numbers count from the top of the file. Code blocks, MDX import/export
 * lines and JSX tags are ignored.
 */
export function lintArticle(source: string, opts: { topics: string[] }): LintIssue[] {
  const lines = source.split(/\r?\n/);
  const issues: LintIssue[] = [];
  const add = (rule: LintRule, line: number, message: string) => issues.push({ rule, line, message });

  const fm = frontMatter(lines);
  for (const key of ['title', 'description', 'gist']) {
    const value = fm.data?.[key];
    if (typeof value !== 'string') continue;
    const line = lines.findIndex((l, i) => i < fm.end && l.startsWith(`${key}:`)) + 1;
    for (const message of spellingMessages(value)) add('spelling', line, message);
  }

  const h2s: Section[] = [];
  const units: Unit[] = [];
  let section: Section | null = null;
  let unit: Unit | null = null;
  let fence: string | null = null;
  let jsxClose: string | null = null;
  let bodyHasDataFoundationsLink = false;

  const endUnit = () => {
    if (unit) units.push(unit);
    unit = null;
  };
  const inEndSection = () => section !== null && (END_SECTIONS as readonly string[]).includes(section.name);

  lines.forEach((line, i) => {
    const n = i + 1;

    if (fence) {
      if (line.trim().startsWith(fence)) fence = null;
      return;
    }
    const fenceMatch = FENCE.exec(line);
    if (fenceMatch) {
      fence = fenceMatch[1];
      endUnit();
      return;
    }

    // Markers and links count everywhere outside code, front matter and JSX included.
    const visible = withoutInlineCode(line);
    const marker = MARKERS.map((re) => re.exec(visible)).find((m) => m);
    if (marker) add('leftover-marker', n, `Leftover marker "${marker[0]}".`);
    for (const url of visible.matchAll(URLS)) {
      const problem = linkProblem(url[0]);
      if (problem) add('link', n, problem);
    }

    if (i <= fm.end) return;

    if (jsxClose) {
      if (line.includes(jsxClose)) jsxClose = null;
      return;
    }
    if (MDX_ESM.test(line) || JSX_TAG.test(line) || JSX_COMMENT.test(line)) {
      endUnit();
      if (JSX_COMMENT.test(line) && !line.includes('*/')) jsxClose = '*/';
      else if (JSX_TAG.test(line) && !line.includes('>')) jsxClose = '>';
      return;
    }

    // Only text outside code, comments and JSX tags counts as linking to the guide.
    if (DATA_FOUNDATIONS_LINK.test(visible)) bodyHasDataFoundationsLink = true;

    if (line.trim() === '') {
      endUnit();
      return;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      endUnit();
      if (heading[1].length === 2) {
        section = { name: heading[2], line: n };
        h2s.push(section);
      }
      if (!inEndSection()) for (const message of spellingMessages(heading[2])) add('spelling', n, message);
      return;
    }

    const isListItem = LIST_ITEM.test(line);
    if (isListItem || TABLE_ROW.test(line)) {
      endUnit();
      unit = { kind: isListItem ? 'list' : 'table', bullet: BULLET.test(line), section, lines: [] };
    } else if (!unit) {
      unit = { kind: 'paragraph', bullet: false, section, lines: [] };
    }
    unit.lines.push({ n, text: line });
    if (unit.kind === 'table') endUnit();

    // Blockquotes are quotations, so their spelling is the source's.
    if (!inEndSection() && !BLOCKQUOTE.test(line)) {
      for (const message of spellingMessages(line.replace(LIST_ITEM, ''))) add('spelling', n, message);
    }
  });
  endUnit();

  // Figures need a source (a link) or an "estimate" label in the same paragraph or list item.
  for (const u of units) {
    if (u.section?.name === READING) continue;
    const text = u.lines.map((l) => withoutInlineCode(l.text)).join(' ');
    if (!FIGURES.some((re) => re.test(text)) || MD_LINK.test(text) || ESTIMATE.test(text)) continue;
    const at = u.lines.find((l) => FIGURES.some((re) => re.test(withoutInlineCode(l.text)))) ?? u.lines[0];
    add(
      'unsourced-figure',
      at.n,
      'A figure with no source: link to the source in the same paragraph, or label it as an estimate.',
    );
  }

  for (const s of h2s) {
    const items = units.filter((u) => u.section === s && u.kind === 'list');
    if (s.name === TOOLS && !items.some((u) => u.bullet)) {
      add('tools-and-resources', s.line, `"${TOOLS}" needs a bullet list of at least one resource.`);
    }
    if (s.name === READING) {
      if (items.length < 3) {
        add('further-reading', s.line, `"${READING}" needs at least 3 items, found ${items.length}.`);
      }
      for (const item of items) {
        if (!HTTPS_LINK.test(item.lines.map((l) => l.text).join(' '))) {
          add('further-reading', item.lines[0].n, `Each "${READING}" item needs an https:// link.`);
        }
      }
    }
  }

  const endIssue = endSectionsProblem(h2s, lines.length);
  if (endIssue) add('end-sections', endIssue.line, endIssue.message);

  if (!opts.topics.includes('data-foundations') && !bodyHasDataFoundationsLink) {
    add(
      'data-foundations-link',
      fm.end + 2,
      'A technology guide must link to the data foundations guide (/insights/data-foundations/ or /topics/data-foundations/).',
    );
  }

  return issues.sort((a, b) => a.line - b.line);
}

function endSectionsProblem(h2s: Section[], lastLine: number): { line: number; message: string } | null {
  const rule = `The last two sections must be "## ${TOOLS}" then "## ${READING}".`;
  const tools = h2s.filter((h) => h.name === TOOLS);
  const reading = h2s.filter((h) => h.name === READING);

  const repeated = [tools, reading].find((list) => list.length > 1);
  if (repeated) return { line: repeated[1].line, message: `"${repeated[0].name}" appears more than once. ${rule}` };

  const missing = [tools.length ? null : TOOLS, reading.length ? null : READING].filter(Boolean);
  if (missing.length) return { line: lastLine, message: `Missing ${missing.map((m) => `"${m}"`).join(' and ')}. ${rule}` };

  if (tools[0].line > reading[0].line) {
    return { line: tools[0].line, message: `"${TOOLS}" and "${READING}" are in the wrong order. ${rule}` };
  }
  const extra = h2s.filter((h) => h.line > tools[0].line && h !== reading[0]);
  if (extra.length) {
    return { line: extra[0].line, message: `"${extra[0].name}" comes after the closing sections. ${rule}` };
  }
  return null;
}

/** Lints an article file. Drafts (draft: true) are skipped. */
export function lintArticleFile(path: string): LintIssue[] {
  const source = readFileSync(path, 'utf8');
  const { data } = frontMatter(source.split(/\r?\n/));
  if (data?.draft === true) return [];
  const topics = Array.isArray(data?.topics) ? data.topics.filter((t): t is string => typeof t === 'string') : [];
  return lintArticle(source, { topics });
}
