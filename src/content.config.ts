import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema } from './lib/schema';

// Articles load from src/content/articles/ unless PD_CONTENT_DIR points
// elsewhere. Tests set it to tests/fixtures/articles.
const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: process.env.PD_CONTENT_DIR ?? './src/content/articles',
  }),
  schema: articleSchema,
});

export const collections = { articles };
