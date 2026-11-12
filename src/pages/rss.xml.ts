// The RSS feed: every published article, newest first. Drafts are left out by
// getPublishedArticles(), the same as on every other page.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedArticles } from '../lib/articles';
import { SITE_NAME, SITE_URL } from '../lib/seo';

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  return rss({
    title: SITE_NAME,
    description:
      'Plain-English guides to data, AI, digital twins, IoT and cloud for UK industrial leaders.',
    site: SITE_URL,
    customData: '<language>en-gb</language>',
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      link: `/insights/${article.id}/`,
      pubDate: article.data.published,
    })),
  });
};
