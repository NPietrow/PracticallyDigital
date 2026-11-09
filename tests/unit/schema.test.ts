import { describe, it, expect } from 'vitest';
import { articleSchema } from '../../src/lib/schema';

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
