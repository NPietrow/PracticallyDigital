import { describe, it, expect } from 'vitest';
import {
  TOPICS,
  PROBLEMS,
  TOPIC_SLUGS,
  PROBLEM_SLUGS,
  getTopic,
  getProblem,
} from '../../src/data/taxonomy';

const SPEC_TOPICS = [
  'data-foundations',
  'ai-and-analytics',
  'digital-twins',
  'iot-and-connectivity',
  'cloud-and-infrastructure',
  'digital-strategy',
];
const SPEC_PROBLEMS = [
  'untrusted-data',
  'unplanned-downtime',
  'no-visibility',
  'quality-and-scrap',
  'energy-and-cost',
  'skills-and-adoption',
];

describe('taxonomy', () => {
  it('has exactly the six spec topics, in order', () => {
    expect(TOPICS.map((t) => t.slug)).toEqual(SPEC_TOPICS);
    expect([...TOPIC_SLUGS]).toEqual(SPEC_TOPICS);
  });

  it('has exactly the six spec problems, in order', () => {
    expect(PROBLEMS.map((p) => p.slug)).toEqual(SPEC_PROBLEMS);
    expect([...PROBLEM_SLUGS]).toEqual(SPEC_PROBLEMS);
  });

  it('gives every term a name and a one-sentence description', () => {
    for (const term of [...TOPICS, ...PROBLEMS]) {
      expect(term.name.length).toBeGreaterThan(0);
      expect(term.description).toMatch(/^[A-Z].*\.$/);
    }
  });

  it('looks up a topic by slug', () => {
    expect(getTopic('digital-twins')?.name).toBe('Digital twins');
  });

  it('looks up a problem by slug', () => {
    expect(getProblem('unplanned-downtime')?.name).toBe('Unplanned downtime');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getTopic('digital-twin')).toBeUndefined();
    expect(getProblem('downtime')).toBeUndefined();
  });

  it('has no slug shared between topics and problems', () => {
    const all = [...TOPIC_SLUGS, ...PROBLEM_SLUGS];
    expect(new Set(all).size).toBe(all.length);
  });
});
