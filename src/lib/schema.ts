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

// At most three of each, so an article only lands on the listing pages where it
// really belongs. List the main topic first: it labels the article.
const MAX_TERMS = 3;

function termList<T extends z.ZodType<string>>(term: T, kind: 'topic' | 'problem') {
  const label = kind === 'topic' ? 'Topic' : 'Problem';
  return z
    .array(term)
    .max(MAX_TERMS, `List at most ${MAX_TERMS} ${kind}s; pick the ones the article is mainly about.`)
    .superRefine((list, ctx) => {
      const repeated = list.filter((value, i) => list.indexOf(value) !== i);
      for (const value of new Set(repeated)) {
        ctx.addIssue({ code: 'custom', message: `${label} "${value}" is listed more than once.` });
      }
    });
}

// heroImage's validator is passed in. The content collection passes Astro's
// image() helper, which resolves the path next to the article, fails the build
// if the file is missing and lets Astro optimise it. Unit tests use a string.
//
// strictObject: an unknown key fails the build and is named in the error. Zod's
// plain object would silently drop it, so "drafts: true" would publish a draft.
export function buildArticleSchema<H extends z.ZodType>(heroImage: H) {
  return z
    .strictObject({
      title: z.string().min(10).max(90),
      description: z.string().min(50).max(160),
      gist: z.string().min(1).max(400),
      author: z.string().default('Nikita Pietrow'),
      published: z.coerce.date(),
      reviewed: z.coerce.date().optional(),
      topics: termList(topic, 'topic').min(1, 'List at least one topic.'),
      problems: termList(problem, 'problem').default([]),
      draft: z.boolean().default(false),
      heroImage: heroImage.optional(),
      heroAlt: z.string().optional(),
    })
    .refine((data) => !data.heroImage || (data.heroAlt && data.heroAlt.trim().length > 0), {
      message: 'heroAlt is required when heroImage is set (describe the image for screen readers).',
      path: ['heroAlt'],
    });
}

export const articleSchema = buildArticleSchema(z.string());

export type ArticleData = z.infer<typeof articleSchema>;
