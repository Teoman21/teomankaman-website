// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ---------------------------------------------------------------------------
// Deployment target
//
// The site is currently served from GitHub Pages as a *project* site:
//   https://teoman21.github.io/teomankaman-website/
//
// To switch to the custom domain (teomankaman.com):
//   1. Change `site` below to 'https://teomankaman.com'.
//   2. Delete the `base` line entirely.
//   3. Create `public/CNAME` containing exactly one line: teomankaman.com
//   4. In GitHub → Settings → Pages, enter teomankaman.com as the custom domain
//      and configure DNS at your registrar (see README → Custom domain).
// No other code changes are needed: every internal link and asset goes through
// `import.meta.env.BASE_URL` (see src/lib/url.ts), so it adapts automatically.
// ---------------------------------------------------------------------------
export default defineConfig({
  site: 'https://teoman21.github.io',
  base: '/teomankaman-website',

  output: 'static',
  // GitHub Pages serves every page as a directory (`/blog/`), so make URLs
  // consistent everywhere (links, canonical tags, sitemap).
  trailingSlash: 'always',

  // Astro 7 defaults to JSX-style whitespace handling, which silently glues
  // words together across line breaks in prose (e.g. `</a>\n and`). `true`
  // restores the classic, lossless HTML minification.
  compressHTML: true,

  integrations: [sitemap()],

  markdown: {
    // The default Sätteri processor does not run remark/rehype plugins, so use
    // the unified pipeline for math (remark-math + rehype-katex).
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      // Dual themes: colors are emitted as CSS variables and switched in
      // src/styles/global.css based on the active light/dark theme.
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
