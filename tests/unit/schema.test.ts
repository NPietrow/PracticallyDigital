import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';
import { articleSchema, buildArticleSchema } from '../../src/lib/schema';

const valid = {
  title: 'What a digital twin is',
  description: 'A plain explanation of digital twins for people who run factories and plants.',
  gist: 'A digital twin is a live model of a real asset.',
  published: '2026-11-01',
  topics: ['digital-twins'],
};

describe('articleSchema', () => {
  it('parses a valid article and defaults the author', () => {
    const result = articleSchema.parse(valid);
    expect(result.author).toBe('Nikita Pietrow');
    expect(result.published).toBeInstanceOf(Date);
  });

  it('defaults draft to false and problems to an empty list', () => {
    const result = articleSchema.parse(valid);
    expect(result.draft).toBe(false);
    expect(result.problems).toEqual([]);
  });

  it('rejects an unknown topic and names the bad value', () => {
    const result = articleSchema.safeParse({ ...valid, topics: ['digital-twin'] });
    expect(result.success).toBe(false);
    const messages = result.error!.issues.map((i) => i.message).join('\n');
    expect(messages).toContain('Unknown topic "digital-twin"');
  });

  it('rejects an unknown problem and names the bad value', () => {
    const result = articleSchema.safeParse({ ...valid, problems: ['downtime'] });
    expect(result.success).toBe(false);
    const messages = result.error!.issues.map((i) => i.message).join('\n');
    expect(messages).toContain('Unknown problem "downtime"');
  });

  it('rejects an empty topics list', () => {
    expect(articleSchema.safeParse({ ...valid, topics: [] }).success).toBe(false);
  });

  const messagesFor = (input: object) => {
    const result = articleSchema.safeParse({ ...valid, ...input });
    expect(result.success).toBe(false);
    return result.error!.issues.map((i) => i.message).join('\n');
  };

  it('accepts up to three topics and three problems', () => {
    const result = articleSchema.safeParse({
      ...valid,
      topics: ['data-foundations', 'digital-twins', 'ai-and-analytics'],
      problems: ['untrusted-data', 'unplanned-downtime', 'no-visibility'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a fourth topic with a clear message', () => {
    const topics = ['data-foundations', 'digital-twins', 'ai-and-analytics', 'digital-strategy'];
    expect(messagesFor({ topics })).toContain('at most 3 topics');
  });

  it('rejects a fourth problem with a clear message', () => {
    const problems = ['untrusted-data', 'unplanned-downtime', 'no-visibility', 'energy-and-cost'];
    expect(messagesFor({ problems })).toContain('at most 3 problems');
  });

  it('rejects a repeated topic and names it', () => {
    expect(messagesFor({ topics: ['digital-twins', 'digital-twins'] })).toContain(
      'Topic "digital-twins" is listed more than once',
    );
  });

  it('rejects a repeated problem and names it', () => {
    expect(messagesFor({ problems: ['untrusted-data', 'untrusted-data'] })).toContain(
      'Problem "untrusted-data" is listed more than once',
    );
  });

  it('rejects heroImage without heroAlt', () => {
    expect(articleSchema.safeParse({ ...valid, heroImage: '/images/x.png' }).success).toBe(false);
  });

  it('accepts heroImage with heroAlt', () => {
    const ok = articleSchema.safeParse({ ...valid, heroImage: '/images/x.png', heroAlt: 'A pump' });
    expect(ok.success).toBe(true);
  });

  it('enforces title and description lengths', () => {
    expect(articleSchema.safeParse({ ...valid, title: 'Too short' }).success).toBe(false);
    expect(articleSchema.safeParse({ ...valid, title: 'x'.repeat(91) }).success).toBe(false);
    expect(articleSchema.safeParse({ ...valid, description: 'x'.repeat(49) }).success).toBe(false);
    expect(articleSchema.safeParse({ ...valid, description: 'x'.repeat(161) }).success).toBe(false);
  });
});

describe('buildArticleSchema', () => {
  // The content collection passes Astro's image() here; this checks the
  // validator it is given is the one used for heroImage.
  it('validates heroImage with the validator it is given', () => {
    const schema = buildArticleSchema(z.literal('./images/ok.png'));
    expect(schema.safeParse({ ...valid, heroImage: './images/ok.png', heroAlt: 'A pump' }).success).toBe(true);
    expect(schema.safeParse({ ...valid, heroImage: './images/other.png', heroAlt: 'A pump' }).success).toBe(false);
  });

  it('still requires heroAlt when heroImage is set', () => {
    const schema = buildArticleSchema(z.literal('./images/ok.png'));
    expect(schema.safeParse({ ...valid, heroImage: './images/ok.png' }).success).toBe(false);
  });
});
