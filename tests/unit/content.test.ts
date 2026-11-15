import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { lintArticleFile } from '../../src/lib/article-lint';

const DIR = 'src/content/articles';

describe('published content', () => {
  // One test that loops, rather than it.each, so it still runs (and passes)
  // before the first article exists, and a failure lists every issue at once.
  it('every article in src/content/articles passes the linter', () => {
    const files = existsSync(DIR)
      ? readdirSync(DIR, { recursive: true, encoding: 'utf8' }).filter((f) => /\.mdx?$/.test(f))
      : [];
    const problems = files.flatMap((file) =>
      lintArticleFile(join(DIR, file)).map((i) => `${file}:${i.line} ${i.rule} ${i.message}`),
    );
    expect(problems).toEqual([]);
  });
});
