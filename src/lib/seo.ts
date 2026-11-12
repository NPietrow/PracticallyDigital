// Page metadata for the <head>: title, canonical URL and social preview tags.

export const SITE_NAME = 'Practically Digital';
export const SITE_URL = 'https://practicallydigital.co.uk';
const DEFAULT_OG_IMAGE = '/og-default.png';

export interface MetaInput {
  title?: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
}

export interface Meta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  type: string;
}

// Site URLs always have a leading and trailing slash (astro.config trailingSlash: 'always').
function normalisePath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

function absolute(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).href;
}

export function buildMeta(input: MetaInput): Meta {
  return {
    title: input.title ? `${input.title} · ${SITE_NAME}` : SITE_NAME,
    description: input.description,
    canonical: absolute(normalisePath(input.path)),
    ogImage: absolute(input.image ?? DEFAULT_OG_IMAGE),
    type: input.type ?? 'website',
  };
}
