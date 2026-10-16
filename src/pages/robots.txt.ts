import type { APIRoute } from 'astro';
import { url } from '../lib/url';

// Note: crawlers only read robots.txt at the domain root, so this file starts
// to matter once the site moves to the custom domain.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('sitemap-index.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
