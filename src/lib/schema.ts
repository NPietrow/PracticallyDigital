// The article front-matter schema. Shared by the content collection and the
// unit tests, so the rules are tested without running an Astro build.
import { z } from 'astro/zod';
import { TOPIC_SLUGS, PROBLEM_SLUGS } from '../data/taxonomy';

// A typo in a topic or problem must fail the build and name the bad value.
// Zod's default message lists the allowed options only, which isn't enough.
const topic = z.enum(TOPIC_SLUGS, {
  error: (issue) => `Unknown topic "${String(issue.input)}". Use one of: ${TOPIC_SLUGS.join(', ')}.`,
});
const problem = z.enum(PROBLEM_SLUGS, {
  error: (issue) => `Unknown problem "${String(issue.input)}". Use one of: ${PROBLEM_SLUGS.join(', ')}.`,
});

export const articleSchema = z
  .object({
    title: z.string().min(10).max(90),
    description: z.string().min(50).max(160),
    gist: z.string().min(1).max(400),
    author: z.string().default('Nikita Pietrow'),
    published: z.coerce.date(),
    reviewed: z.coerce.date().optional(),
    topics: z.array(topic).min(1, 'List at least one topic.'),
    problems: z.array(problem).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
  })
  .refine((data) => !data.heroImage || (data.heroAlt && data.heroAlt.trim().length > 0), {
    message: 'heroAlt is required when heroImage is set (describe the image for screen readers).',
    path: ['heroAlt'],
  });

export type ArticleData = z.infer<typeof articleSchema>;
