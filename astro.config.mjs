// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://practicallydigital.co.uk',
  trailingSlash: 'always',
  output: 'static',
  // Test builds write to their own folder (PD_OUT_DIR) so they don't overwrite each other.
  outDir: process.env.PD_OUT_DIR ?? './dist',
  integrations: [mdx(), sitemap()],
});
