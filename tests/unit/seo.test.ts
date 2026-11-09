import { describe, it, expect } from 'vitest';
import { buildMeta } from '../../src/lib/seo';

const description = 'x'.repeat(60);

describe('buildMeta', () => {
  it('suffixes a page title with the site name', () => {
    const meta = buildMeta({ title: 'Digital twins', description, path: '/insights/digital-twins/' });
    expect(meta.title).toBe('Digital twins · Practically Digital');
  });

  it('uses the site name alone when there is no title', () => {
    expect(buildMeta({ description, path: '/' }).title).toBe('Practically Digital');
  });

  it('makes the canonical URL absolute on the production domain', () => {
    const meta = buildMeta({ title: 'Digital twins', description, path: '/insights/digital-twins/' });
    expect(meta.canonical).toBe('https://practicallydigital.co.uk/insights/digital-twins/');
  });

  it('adds a trailing slash to a path without one', () => {
    expect(buildMeta({ description, path: '/about' }).canonical).toBe(
      'https://practicallydigital.co.uk/about/',
    );
  });

  it('adds a leading slash to a path without one', () => {
    expect(buildMeta({ description, path: 'about/' }).canonical).toBe(
      'https://practicallydigital.co.uk/about/',
    );
  });

  it('treats the root path as the home page', () => {
    expect(buildMeta({ description, path: '/' }).canonical).toBe('https://practicallydigital.co.uk/');
  });

  it('passes the description through unchanged', () => {
    expect(buildMeta({ description, path: '/' }).description).toBe(description);
  });

  it('defaults the social image to the absolute /og-default.png', () => {
    expect(buildMeta({ description, path: '/' }).ogImage).toBe(
      'https://practicallydigital.co.uk/og-default.png',
    );
  });

  it('makes a relative social image absolute', () => {
    expect(buildMeta({ description, path: '/', image: '/og/alpha.png' }).ogImage).toBe(
      'https://practicallydigital.co.uk/og/alpha.png',
    );
  });

  it('keeps an already absolute social image', () => {
    const image = 'https://practicallydigital.co.uk/_astro/hero.abc123.png';
    expect(buildMeta({ description, path: '/', image }).ogImage).toBe(image);
  });

  it('defaults the type to website and keeps article', () => {
    expect(buildMeta({ description, path: '/' }).type).toBe('website');
    expect(buildMeta({ description, path: '/', type: 'article' }).type).toBe('article');
  });
});
