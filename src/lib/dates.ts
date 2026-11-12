// Date formatting for the page. Front-matter dates are UTC midnight, so both
// helpers work in UTC to avoid showing the day before.

/** "9 November 2026" */
export function longDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** "2026-11-09", for <time datetime> */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
