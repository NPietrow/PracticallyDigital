// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { tableScroll } from './src/lib/table-scroll.ts';

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
  integrations: [mdx(), sitemap()],
});
