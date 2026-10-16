/**
 * URL helpers. Every internal link and public asset should go through `url()`
 * so the site works both under the GitHub Pages sub-path
 * (`/teomankaman-website/`) and at the root of a custom domain.
 */

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site-relative path with the configured base: `url('blog/')` → `/teomankaman-website/blog/`. */
export function url(path = ''): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

const EXTERNAL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

/**
 * Resolve a link from content frontmatter: absolute URLs (`https://…`, `mailto:…`)
 * pass through unchanged; site paths (`/cv.pdf`) get the base prefix.
 */
export function resolveHref(href: string): string {
  return EXTERNAL.test(href) ? href : url(href);
}

export function isExternal(href: string): boolean {
  return EXTERNAL.test(href);
}

/** Normalize a pathname for comparisons (always one trailing slash). */
export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') + '/';
}
