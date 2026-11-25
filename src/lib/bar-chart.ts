// Rows for the BarChart article component: each bar's width as a share of the
// largest value, so the biggest bar fills the track and the rest scale with it.
// The value is always printed beside the bar, so the chart never relies on
// bar length or colour alone.

export type BarInput = { label: string; value: number; highlight?: boolean };
export type BarRow = { label: string; value: number; text: string; width: number; highlight: boolean };

export function barRows(bars: BarInput[], opts: { unit?: string } = {}): BarRow[] {
  if (bars.length === 0) throw new Error('A bar chart needs at least one bar.');
  for (const bar of bars) {
    if (!bar.label.trim()) throw new Error('Every bar needs a label.');
    if (!Number.isFinite(bar.value) || bar.value < 0) {
      throw new Error(`Bar "${bar.label}" has value ${bar.value}; values must be zero or more.`);
    }
  }
  const max = Math.max(...bars.map((b) => b.value));
  return bars.map((bar) => ({
    label: bar.label,
    value: bar.value,
    text: `${bar.value}${opts.unit ?? ''}`,
    width: max === 0 ? 0 : Math.round((bar.value / max) * 1000) / 10,
    highlight: bar.highlight === true,
  }));
}
