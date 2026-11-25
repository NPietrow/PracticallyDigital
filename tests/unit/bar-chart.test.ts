import { describe, it, expect } from 'vitest';
import { barRows } from '../../src/lib/bar-chart';

describe('barRows', () => {
  it('sizes each bar against the largest value, which fills the track', () => {
    const rows = barRows([
      { label: 'Cost', value: 43 },
      { label: 'Data', value: 30 },
    ]);
    expect(rows.map((r) => r.width)).toEqual([100, 69.8]);
  });

  it('keeps the order given and marks the highlighted row', () => {
    const rows = barRows([
      { label: 'Cost', value: 43 },
      { label: 'Data', value: 30, highlight: true },
    ]);
    expect(rows.map((r) => r.label)).toEqual(['Cost', 'Data']);
    expect(rows.map((r) => r.highlight)).toEqual([false, true]);
  });

  it('formats the value with its unit for the visible label', () => {
    expect(barRows([{ label: 'Cost', value: 43 }], { unit: '%' })[0].text).toBe('43%');
    expect(barRows([{ label: 'Cost', value: 43 }])[0].text).toBe('43');
  });

  it('gives a zero value no bar but still a label', () => {
    const rows = barRows([
      { label: 'Cost', value: 43 },
      { label: 'None', value: 0 },
    ]);
    expect(rows[1].width).toBe(0);
    expect(rows[1].text).toBe('0');
  });

  it('rejects an empty chart, negative values and blank labels, naming the problem', () => {
    expect(() => barRows([])).toThrow('at least one bar');
    expect(() => barRows([{ label: 'Cost', value: -1 }])).toThrow('"Cost"');
    expect(() => barRows([{ label: ' ', value: 1 }])).toThrow('label');
  });
});
