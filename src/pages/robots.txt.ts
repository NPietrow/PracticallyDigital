import type { APIRoute } from 'astro';
import { robotsTxt } from '../lib/robots';
import { allowIndexing } from '../lib/env';

export const GET: APIRoute = () =>
  new Response(robotsTxt({ allowIndexing: allowIndexing() }), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
