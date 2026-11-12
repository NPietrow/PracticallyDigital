// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { tableScroll } from './src/lib/table-scroll.ts';
import { buildSearchIndex } from './src/lib/search-index.ts';

// After every build, index the article pages for search (see ADR-0003).
/** @type {import('astro').AstroIntegration} */
const searchIndex = {
  name: 'practically-digital:search-index',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const { pageCount } = await buildSearchIndex(fileURLToPath(dir));
      logger.info(`Search index built: ${pageCount} article(s)`);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://practicallydigital.co.uk',
  trailingSlash: 'always',
  output: 'static',
  // Test builds write to their own folder (PD_OUT_DIR) so they don't overwrite each other.
  outDir: process.env.PD_OUT_DIR ?? './dist',
  // Satteri is Astro 7's default Markdown processor; this adds our table wrapper to it.
  // MDX inherits the same processor and plugins.
  markdown: {
    processor: satteri({ hastPlugins: [tableScroll] }),
  },
  integrations: [
    mdx(),
    // The 404 and search pages have nothing for a search engine to list.
    sitemap({ filter: (page) => !/\/(404|search)\/$/.test(new URL(page).pathname) }),
    searchIndex,
  ],
});
