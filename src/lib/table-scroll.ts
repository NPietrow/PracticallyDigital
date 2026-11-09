// Markdown plugin: wraps every table in a box that scrolls sideways on its own,
// so a wide table never makes the whole page scroll on a phone. The box is
// focusable and labelled so keyboard users can scroll it too (WCAG 2.1.1).
import { defineHastPlugin } from 'satteri';

const WRAPPER =
  '<div class="table-scroll" role="region" aria-label="Table (scrolls sideways)" tabindex="0"></div>';

export const tableScroll = defineHastPlugin({
  name: 'table-scroll',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, { raw: WRAPPER });
    },
  },
});
