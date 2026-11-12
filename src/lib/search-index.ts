// Builds the Pagefind search index after `astro build`.
//
// Only article pages (insights/<slug>/index.html) are indexed. Pagefind on its
// own falls back to indexing every page when no page has data-pagefind-body,
// which is exactly the zero-article state, so we restrict the files by glob.
// Any Pagefind error fails the build instead of shipping a broken search.
import { createIndex, close } from 'pagefind';
import { join } from 'node:path';

export const ARTICLE_GLOB = 'insights/*/index.html';

export async function buildSearchIndex(outDir: string): Promise<{ pageCount: number }> {
  try {
    const { index, errors } = await createIndex({ forceLanguage: 'en' });
    if (!index) throw new Error(`Pagefind could not start: ${errors.join('; ')}`);

    const added = await index.addDirectory({ path: outDir, glob: ARTICLE_GLOB });
    if (added.errors.length) throw new Error(`Pagefind indexing failed: ${added.errors.join('; ')}`);

    const written = await index.writeFiles({ outputPath: join(outDir, 'pagefind') });
    if (written.errors.length) throw new Error(`Pagefind write failed: ${written.errors.join('; ')}`);

    return { pageCount: added.page_count };
  } finally {
    // Stop Pagefind's background process so the build (or test run) can exit.
    await close();
  }
}
