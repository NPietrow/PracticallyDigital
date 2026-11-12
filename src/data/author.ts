// Who writes the site, shown on the About page.
// Values starting with PLACEHOLDER: are filled in before launch (plan 3).
// A build with indexing on fails while any remain, so they can't go public.

export type Author = {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
};

export const AUTHOR: Author = {
  name: 'Nikita Pietrow',
  role: 'Data, AI and digital consultant, specialising in digital twins',
  bio: "PLACEHOLDER: a short bio in Nikita's words, supplied before launch.",
  email: 'PLACEHOLDER:hello@example.com',
  linkedin: 'PLACEHOLDER:https://www.linkedin.com/in/your-profile/',
};

const MARK = 'PLACEHOLDER:';

/** Names of the fields still holding a placeholder. */
export function placeholderFields(author: Author): (keyof Author)[] {
  return (Object.keys(author) as (keyof Author)[]).filter((k) => author[k].startsWith(MARK));
}

/** Throws if an indexable (public) build would show placeholder author details. */
export function checkAuthorForLaunch(author: Author, indexing: boolean): void {
  if (!indexing) return;
  const missing = placeholderFields(author);
  if (missing.length > 0) {
    throw new Error(
      `Indexing is on but src/data/author.ts still has placeholders in: ${missing.join(', ')}. ` +
        'Fill them in before a public build.',
    );
  }
}
