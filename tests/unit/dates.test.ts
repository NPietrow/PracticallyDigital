import { describe, it, expect } from 'vitest';
import { longDate, isoDate } from '../../src/lib/dates';

describe('longDate', () => {
  it('writes dates the British way, with no leading zero', () => {
    expect(longDate(new Date('2026-11-09'))).toBe('9 November 2026');
  });

  it('uses the UTC date, so front-matter dates never shift by a day', () => {
    // Front-matter dates parse as UTC midnight. A formatter using local time
    // west of Greenwich would show 31 October here.
    expect(longDate(new Date('2026-11-01T00:00:00Z'))).toBe('1 November 2026');
  });
});

describe('isoDate', () => {
  it('gives the YYYY-MM-DD form used in <time datetime>', () => {
    expect(isoDate(new Date('2026-03-01'))).toBe('2026-03-01');
  });
});
