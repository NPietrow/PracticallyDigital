// Keeps the article workflow kit in step with the code it describes: the
// template, the issue form and the skill must match the linter, the schema
// and the taxonomy.
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { END_SECTIONS } from '../../src/lib/article-lint';
import { articleSchema } from '../../src/lib/schema';
import { PROBLEMS, TOPICS } from '../../src/data/taxonomy';

const read = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

describe('article template', () => {
  const template = read('docs/content/article-template.md');
  const [, frontMatter, body] = template.split(/^---$/m);

  it('ends with the two fixed closing sections', () => {
    const h2s = body
      .replace(/^```[\s\S]*?^```/gm, '')
      .split('\n')
      .filter((l) => l.startsWith('## '))
      .map((l) => l.slice(3).trim());
    expect(h2s.slice(-2)).toEqual([...END_SECTIONS]);
  });

  it('lists every front-matter field in the schema', () => {
    // Optional fields may be commented out ("# heroImage: ...").
    const keys = [...frontMatter.matchAll(/^(?:# )?(\w+):/gm)].map((m) => m[1]);
    expect(keys.sort()).toEqual(Object.keys(articleSchema.shape).sort());
  });
});

describe('article request issue form', () => {
  const form = parse(read('.github/ISSUE_TEMPLATE/article-request.yml'));
  const field = (id: string) => form.body.find((f: { id?: string }) => f.id === id);

  it('offers the topics and problems from the taxonomy, in order', () => {
    expect(field('topic').attributes.options).toEqual(TOPICS.map((t) => t.name));
    expect(field('problems').attributes.options).toEqual(PROBLEMS.map((p) => p.name));
    expect(field('problems').attributes.multiple).toBe(true);
  });

  it('prefixes the issue title', () => {
    expect(form.title).toBe('Article: ');
  });

  it('sets no labels (labels are a repository setting)', () => {
    expect(form).not.toHaveProperty('labels');
  });
});

describe('workflow tooling', () => {
  it('has a check:links script', () => {
    const pkg = JSON.parse(read('package.json'));
    expect(pkg.scripts['check:links']).toBe('node scripts/check-links.ts');
  });

  it('has a British English spell check over the articles', () => {
    const pkg = JSON.parse(read('package.json'));
    expect(pkg.scripts['check:spelling']).toContain('src/content/articles');
    const config = JSON.parse(read('cspell.json'));
    expect(config.language).toBe('en-GB');
    expect(existsSync('docs/content/spelling-words.txt')).toBe(true);
  });

  it('has the write-article skill, wired to research, humanizer and the audit trail', () => {
    const path = '.claude/skills/write-article/SKILL.md';
    expect(existsSync(path)).toBe(true);
    const skill = read(path);
    for (const needle of ['deep-research', 'humanizer:humanizer', 'fact-check.md', 'brief.md']) {
      expect(skill).toContain(needle);
    }
  });
});
