/**
 * Site-wide settings: your name, bio, and profile links.
 * Edit this file to update the header, footer, home page intro and SEO defaults.
 */

export const SITE = {
  /** Used in the header, page titles, footer and RSS feed. */
  name: 'Teoman Kaman',
  /** Default meta description (used when a page doesn't provide its own). */
  description:
    'Teoman Kaman is an MSc student in Artificial Intelligence at Northeastern University working on the foundations of deep learning.',
  /** One-line bio shown under your name on the home page. */
  tagline: 'MSc in Artificial Intelligence at Northeastern University',
  /** Used to <strong>-highlight your name in publication author lists. */
  authorName: 'Teoman Kaman',
  /** <html lang> and Open Graph locale. */
  lang: 'en',
  ogLocale: 'en_US',
} as const;

/**
 * Profile links shown on the home page (and in the footer).
 * Set a value to an empty string to hide that link.
 *
 * TODO: replace the placeholder Scholar, LinkedIn and email values.
 */
export const LINKS = {
  github: 'https://github.com/Teoman21',
  scholar: 'https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID',
  linkedin: 'https://www.linkedin.com/in/YOUR_LINKEDIN_HANDLE/',
  email: 'you@example.com',
} as const;

/** Header navigation. Paths are relative to the site root (base is added automatically). */
export const NAV = [
  { label: 'Home', path: '' },
  { label: 'Publications', path: 'publications/' },
  { label: 'Projects', path: 'projects/' },
  { label: 'Coursework', path: 'coursework/' },
  { label: 'Photography', path: 'photography/' },
  { label: 'Blog', path: 'blog/' },
  { label: 'CV', path: 'cv/' },
] as const;
