/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig gives unit tests the same Vite setup as the site build.
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    passWithNoTests: true,
  },
});
