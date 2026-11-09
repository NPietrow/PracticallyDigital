import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { buildArticleSchema } from './lib/schema';

// Articles load from src/content/articles/ unless PD_CONTENT_DIR points
// elsewhere. Tests set it to tests/fixtures/articles.
const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: process.env.PD_CONTENT_DIR ?? './src/content/articles',
  }),
  // heroImage paths are relative to the article file, e.g. ./images/pump.jpg
  schema: ({ image }) => buildArticleSchema(image()),
});

export const collections = { articles };
