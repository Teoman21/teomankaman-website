import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { byDateDesc, getPublished } from '../lib/content';
import { url } from '../lib/url';

export const GET: APIRoute = async (context) => {
  const posts = (await getPublished('blog')).sort(byDateDesc);

  return rss({
    title: `${SITE.name} · Blog`,
    description: SITE.description,
    // Channel link = the site's home page (including the base path).
    site: new URL(url(), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: url(`blog/${post.id}/`),
    })),
    customData: `<language>${SITE.ogLocale.replace('_', '-').toLowerCase()}</language>`,
  });
};
