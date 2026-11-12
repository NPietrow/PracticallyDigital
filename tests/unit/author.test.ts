import { describe, it, expect } from 'vitest';
import { AUTHOR, placeholderFields, checkAuthorForLaunch } from '../../src/data/author';

const filled = {
  name: 'Nikita Pietrow',
  role: 'Consultant',
  bio: 'A real bio.',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/example/',
};

describe('AUTHOR', () => {
  it('names Nikita Pietrow as the author', () => {
    expect(AUTHOR.name).toBe('Nikita Pietrow');
  });
});

describe('placeholderFields', () => {
  it('lists every field still marked PLACEHOLDER:', () => {
    expect(placeholderFields({ ...filled, bio: 'PLACEHOLDER: bio', email: 'PLACEHOLDER:a@b.c' })).toEqual([
      'bio',
      'email',
    ]);
  });

  it('is empty once everything is filled in', () => {
    expect(placeholderFields(filled)).toEqual([]);
  });
});

describe('checkAuthorForLaunch', () => {
  const withPlaceholder = { ...filled, linkedin: 'PLACEHOLDER:https://www.linkedin.com/in/x/' };

  it('allows placeholders while indexing is off (preview builds)', () => {
    expect(() => checkAuthorForLaunch(withPlaceholder, false)).not.toThrow();
  });

  it('fails an indexable build that still has placeholders, naming the field', () => {
    expect(() => checkAuthorForLaunch(withPlaceholder, true)).toThrow(/linkedin/);
  });

  it('allows an indexable build once everything is filled in', () => {
    expect(() => checkAuthorForLaunch(filled, true)).not.toThrow();
  });
});
