// The fixed topic and problem lists (approved in the design spec).
// New entries can be added later; existing slugs must not be renamed,
// because they are part of page URLs and article front-matter.

export type Term = { slug: string; name: string; description: string };

export const TOPIC_SLUGS = [
  'data-foundations',
  'ai-and-analytics',
  'digital-twins',
  'iot-and-connectivity',
  'cloud-and-infrastructure',
  'digital-strategy',
] as const;

export const PROBLEM_SLUGS = [
  'untrusted-data',
  'unplanned-downtime',
  'no-visibility',
  'quality-and-scrap',
  'energy-and-cost',
  'skills-and-adoption',
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];
export type ProblemSlug = (typeof PROBLEM_SLUGS)[number];

export const TOPICS: readonly (Term & { slug: TopicSlug })[] = [
  {
    slug: 'data-foundations',
    name: 'Data foundations',
    description: 'Getting data you can trust: collecting it, cleaning it, joining it up and looking after it.',
  },
  {
    slug: 'ai-and-analytics',
    name: 'AI and analytics',
    description: 'Using statistics and machine learning to find patterns, make predictions and support decisions.',
  },
  {
    slug: 'digital-twins',
    name: 'Digital twins',
    description: 'Live digital models of real assets and processes, kept up to date with data from the shop floor.',
  },
  {
    slug: 'iot-and-connectivity',
    name: 'IoT and connectivity',
    description: 'Sensors, machine connections and networks that get data from equipment to where it is needed.',
  },
  {
    slug: 'cloud-and-infrastructure',
    name: 'Cloud and infrastructure',
    description: 'Where data and software run, from on-site servers to cloud platforms, and what each costs.',
  },
  {
    slug: 'digital-strategy',
    name: 'Digital strategy (Industry 4.0)',
    description: 'Deciding what to digitise, in what order, and how to show it is paying off.',
  },
];

export const PROBLEMS: readonly (Term & { slug: ProblemSlug })[] = [
  {
    slug: 'untrusted-data',
    name: 'Untrusted or siloed data',
    description: 'Data that is wrong, incomplete or stuck in separate systems, so nobody relies on it.',
  },
  {
    slug: 'unplanned-downtime',
    name: 'Unplanned downtime',
    description: 'Equipment stopping without warning and taking output with it.',
  },
  {
    slug: 'no-visibility',
    name: 'No visibility of operations',
    description: 'Not knowing what is happening on the floor until someone walks out and looks.',
  },
  {
    slug: 'quality-and-scrap',
    name: 'Quality and scrap',
    description: 'Defects, rework and scrap that are found too late or never traced to a cause.',
  },
  {
    slug: 'energy-and-cost',
    name: 'Energy and cost',
    description: 'Energy and running costs that are hard to measure, so they are hard to reduce.',
  },
  {
    slug: 'skills-and-adoption',
    name: 'Skills and adoption',
    description: 'New tools that people lack the time, skills or reason to use.',
  },
];

export function getTopic(slug: string): Term | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getProblem(slug: string): Term | undefined {
  return PROBLEMS.find((p) => p.slug === slug);
}
