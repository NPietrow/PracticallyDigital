// The robots.txt body. Crawlers are blocked unless indexing is switched on
// (PUBLIC_ALLOW_INDEXING), matching the noindex tag every page carries until then.
import { SITE_URL } from './seo';

export function robotsTxt(opts: { allowIndexing: boolean }): string {
  if (!opts.allowIndexing) return 'User-agent: *\nDisallow: /\n';
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`;
}
