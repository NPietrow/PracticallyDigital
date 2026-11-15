import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'yaml';
import { END_SECTIONS, lintArticle, lintArticleFile, type LintIssue } from '../../src/lib/article-lint';

const FRONT = {
  title: 'What a digital twin is',
  description: 'A plain explanation of digital twins for people who run factories and plants.',
  gist: 'A digital twin is a live model of a real asset.',
  published: '2026-11-01',
  topics: ['data-foundations'],
};

const TOOLS = [
  '## Tools and resources',
  '',
  '- [Eclipse Ditto](https://eclipse.dev/ditto/): open-source framework for building twins. Free.',
  '',
].join('\n');

const READING = [
  '## Further reading',
  '',
  '- [Report A](https://example.org/a)',
  '- [Report B](https://example.org/b)',
  '- [Report C](https://example.org/c)',
  '',
].join('\n');

type Parts = { tools?: string; reading?: string };

// Wraps a body in valid front matter and appends valid closing sections.
// Pass tools: '' or reading: '' to leave one out and write your own.
function article(body: string, frontMatter: object = {}, parts: Parts = {}): string {
  const fm = stringify({ ...FRONT, ...frontMatter });
  return `---\n${fm}---\n\n${body}\n\n${parts.tools ?? TOOLS}\n${parts.reading ?? READING}`;
}

function lint(source: string, topics: string[] = ['data-foundations']): LintIssue[] {
  return lintArticle(source, { topics });
}

function only(issues: LintIssue[], rule: LintIssue['rule']): LintIssue[] {
  return issues.filter((i) => i.rule === rule);
}

// 1-based line number of the first line containing needle.
function lineOf(source: string, needle: string): number {
  return source.split('\n').findIndex((l) => l.includes(needle)) + 1;
}

const BODY = 'An introduction in plain words.\n\n## What it is\n\nSome explanation.';

describe('lintArticle', () => {
  it('a complete article passes', () => {
    expect(lint(article(BODY))).toEqual([]);
  });

  it('any number of freely worded sections is allowed', () => {
    const one = '## Only section\n\nText.';
    const nine = Array.from({ length: 9 }, (_, i) => `## Section ${i + 1}\n\nText.`).join('\n\n');
    const worded = [
      '## What a digital twin actually is',
      '',
      'Text.',
      '',
      '## Is it right for you?',
      '',
      'Text.',
      '',
      '## What "real time" means',
      '',
      'Text.',
    ].join('\n');
    for (const body of [one, nine, worded]) {
      expect(lint(article(body))).toEqual([]);
    }
  });

  describe('the two closing sections are required, in order, at the end', () => {
    function endIssues(source: string): LintIssue[] {
      return only(lint(source), 'end-sections');
    }

    it('reports a missing Tools and resources', () => {
      const issues = endIssues(article(BODY, {}, { tools: '' }));
      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('Tools and resources');
    });

    it('reports a missing Further reading', () => {
      const issues = endIssues(article(BODY, {}, { reading: '' }));
      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('Further reading');
    });

    it('reports the two swapped', () => {
      const issues = endIssues(article(`${BODY}\n\n${READING}\n${TOOLS}`, {}, { tools: '', reading: '' }));
      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('order');
    });

    it('reports a section after Further reading, by name', () => {
      const source = article(BODY) + '\n## Afterword\n\nText.\n';
      const issues = endIssues(source);
      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('Afterword');
      expect(issues[0].line).toBe(lineOf(source, '## Afterword'));
    });

    it('reports Further reading appearing twice', () => {
      const issues = endIssues(article(`${BODY}\n\n${READING}`));
      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('Further reading');
    });
  });

  it('Tools and resources needs a bullet list', () => {
    const paragraph = '## Tools and resources\n\nThere are plenty of tools.\n';
    expect(only(lint(article(BODY, {}, { tools: paragraph })), 'tools-and-resources')).toHaveLength(1);

    const introAndBullet = '## Tools and resources\n\nStart with these.\n\n- [Ditto](https://eclipse.dev/ditto/): free.\n';
    expect(lint(article(BODY, {}, { tools: introAndBullet }))).toEqual([]);
  });

  it('Further reading needs three https links', () => {
    const two = '## Further reading\n\n- [A](https://example.org/a)\n- [B](https://example.org/b)\n';
    expect(only(lint(article(BODY, {}, { reading: two })), 'further-reading')).toHaveLength(1);

    const oneHttp = '## Further reading\n\n- [A](https://example.org/a)\n- [B](http://example.org/b)\n- [C](https://example.org/c)\n';
    const source = article(BODY, {}, { reading: oneHttp });
    const issues = only(lint(source), 'further-reading');
    expect(issues).toHaveLength(1);
    expect(issues[0].line).toBe(lineOf(source, '[B](http://'));
  });

  describe('a figure with no link is reported', () => {
    function figureIssues(sentence: string): { issues: LintIssue[]; line: number } {
      const source = article(`Opening paragraph.\n\n${sentence}\n\n## Next\n\nText.`);
      return { issues: only(lint(source), 'unsourced-figure'), line: lineOf(source, sentence) };
    }

    it('a percentage', () => {
      const { issues, line } = figureIssues('Predictive maintenance cuts downtime by 30%.');
      expect(issues).toHaveLength(1);
      expect(issues[0].line).toBe(line);
    });

    it('a percentage written as per cent', () => {
      expect(figureIssues('Downtime fell by 30 per cent.').issues).toHaveLength(1);
    });

    it('a currency amount', () => {
      const { issues, line } = figureIssues('Licences start at £500 per user.');
      expect(issues).toHaveLength(1);
      expect(issues[0].line).toBe(line);
    });

    it("a number followed by 'million'", () => {
      const { issues, line } = figureIssues('Around 40 million sensors were shipped.');
      expect(issues).toHaveLength(1);
      expect(issues[0].line).toBe(line);
    });

    it("a number followed by 'bn' or 'm'", () => {
      expect(figureIssues('Shipments reached 2.5m units.').issues).toHaveLength(1);
      expect(figureIssues('The sector is worth 3bn a year.').issues).toHaveLength(1);
    });

    it('in a list item', () => {
      expect(figureIssues('- Scrap fell by 12%.').issues).toHaveLength(1);
    });
  });

  it('the same figure with a link, or labelled as an estimate, passes', () => {
    const bodies = [
      'Downtime fell by 30% ([report](https://example.org/r)).',
      'A study found downtime fell by 30%\nacross the sites ([report](https://example.org/r)).',
      'Our rough estimate is £2m a year.',
      'The estimated market is 3bn dollars.',
    ];
    for (const body of bodies) {
      expect(only(lint(article(body)), 'unsourced-figure')).toEqual([]);
    }
  });

  it('years, standards and version numbers are not figures', () => {
    const body = [
      'In 2026 most plants still run OPC UA 1.05 servers.',
      '',
      'ISO 23247 describes a framework for manufacturing twins, and Industry 4.0 is the older label.',
      '',
      'Monitoring runs 24/7 and some sites use private 5G.',
    ].join('\n');
    expect(lint(article(body))).toEqual([]);
  });

  it('leftover markers are reported, but not inside code blocks', () => {
    const body = [
      'This number is TBC.',
      '',
      'Uptime improved [citation needed].',
      '',
      'Savings of XX% are typical.',
      '',
      '```python',
      '# TODO: tidy this',
      'print("FIXME")',
      '```',
      '',
      'Use `TODO` as a tag name.',
    ].join('\n');
    const source = article(body);
    const issues = only(lint(source), 'leftover-marker');
    expect(issues.map((i) => i.line)).toEqual([
      lineOf(source, 'is TBC'),
      lineOf(source, 'citation needed'),
      lineOf(source, 'XX%'),
    ]);
  });

  it('http, localhost and preview links are reported', () => {
    const body = [
      'See [the old page](http://example.org/page).',
      '',
      'Try [the local build](http://localhost:4321/insights/).',
      '',
      'Or [the preview](https://agreeable-coast-0dc03af0f.5.azurestaticapps.net/).',
    ].join('\n');
    const source = article(body);
    const issues = only(lint(source), 'link');
    expect(issues.map((i) => i.line)).toEqual([
      lineOf(source, 'old page'),
      lineOf(source, 'local build'),
      lineOf(source, 'the preview'),
    ]);
  });

  it('American spellings in prose are reported', () => {
    const issues = only(lint(article('We optimize the color of the line.')), 'spelling');
    expect(issues).toHaveLength(2);
    expect(issues[0].message).toContain('optimise');
    expect(issues[1].message).toContain('colour');
  });

  it('inflected American spellings are reported, including at the start of a sentence', () => {
    const body = 'The plant was optimized last year. Modeling took weeks. Colors were analyzing nothing.';
    expect(only(lint(article(body)), 'spelling')).toHaveLength(4);
  });

  it('names, quotes, link text and the two closing sections are exempt', () => {
    const body = [
      'Founded by the [National Center for Manufacturing Sciences](https://www.ncms.org/), the group met.',
      '',
      'ISO is the International Organization for Standardization.',
      '',
      'The report "Optimizing Assets" is worth reading, as is the ‘Color guide’.',
      '',
      '> Plants that optimize early see the benefit first.',
    ].join('\n');
    const tools = '## Tools and resources\n\n- Color Center Toolkit: a free [tool](https://example.org/tool).\n';
    const reading = [
      '## Further reading',
      '',
      '- Smith, J. Modeling assets. [PDF](https://example.org/m)',
      '- [Report B](https://example.org/b)',
      '- [Report C](https://example.org/c)',
      '',
    ].join('\n');
    expect(lint(article(body, {}, { tools, reading }))).toEqual([]);
  });

  it('a technology article must link to the data foundations guide', () => {
    const noLink = article(BODY, { topics: ['digital-twins'] });
    expect(only(lint(noLink, ['digital-twins']), 'data-foundations-link')).toHaveLength(1);

    const withLink = article(`${BODY}\n\nStart with [data foundations](/insights/data-foundations/).`);
    expect(lint(withLink, ['digital-twins'])).toEqual([]);

    expect(lint(article(BODY), ['data-foundations'])).toEqual([]);
  });

  it('JSX tags and MDX imports are not prose', () => {
    const body = [
      "import Figure from '../../components/Figure.astro';",
      '',
      'Opening paragraph.',
      '',
      '<Figure',
      '  src="./images/twin-layers.svg"',
      '  caption="Behavior of the model at 30% load"',
      '/>',
    ].join('\n');
    expect(lint(article(body))).toEqual([]);
  });

  it('END_SECTIONS is the agreed pair', () => {
    expect(END_SECTIONS).toEqual(['Tools and resources', 'Further reading']);
  });
});

describe('lintArticleFile', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pd-lint-'));

  it('drafts are skipped', () => {
    const path = join(dir, 'draft.mdx');
    writeFileSync(path, `---\n${stringify({ ...FRONT, draft: true })}---\n\nUnfinished TODO.\n`);
    expect(lintArticleFile(path)).toEqual([]);
  });

  it("a published file is linted with its own topics", () => {
    const path = join(dir, 'twins.mdx');
    writeFileSync(path, article(BODY, { topics: ['digital-twins'] }));
    expect(lintArticleFile(path).map((i) => i.rule)).toEqual(['data-foundations-link']);
  });
});
