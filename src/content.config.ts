/**
 * Content collections. Adding content = dropping a Markdown file into the
 * matching folder under src/content/. Frontmatter is validated against the
 * schemas below at build time, so typos fail loudly instead of silently.
 *
 * Every collection supports `draft: true`: drafts show up in `npm run dev`
 * but are excluded from production builds (see src/lib/content.ts).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const draft = z.boolean().default(false);

/** An absolute URL (https://…, mailto:…) or a site path such as /papers/foo.pdf. */
const href = z
  .string()
  .regex(
    /^(?:https?:\/\/|mailto:|\/)/,
    'Use an absolute URL (https://…) or a path starting with /',
  );

const tags = z.array(z.string()).default([]);

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    status: z.enum(['published', 'under review', 'preprint', 'workshop']),
    // Strict: an unknown key (e.g. `github:`) is an error rather than silently ignored.
    links: z
      .strictObject({
        pdf: href.optional(),
        arxiv: href.optional(),
        code: href.optional(),
        poster: href.optional(),
        slides: href.optional(),
      })
      .default({}),
    abstract: z.string().optional(),
    featured: z.boolean().default(false),
    draft,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags,
      links: z
        .strictObject({
          repo: href.optional(),
          demo: href.optional(),
          paper: href.optional(),
        })
        .default({}),
      image: z
        .object({
          src: image(),
          alt: z.string().min(1, 'Describe the image for screen readers'),
        })
        .optional(),
      featured: z.boolean().default(false),
      draft,
    }),
});

const coursework = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coursework' }),
  schema: z.object({
    name: z.string(),
    code: z.string(),
    institution: z.string(),
    term: z
      .string()
      .regex(/^(?:Spring|Summer|Fall|Winter) \d{4}$/, 'Use the form "Fall 2025" or "Spring 2026"'),
    description: z.string(),
    repo: href.optional(),
    tags,
    draft,
  }),
});

const photography = defineCollection({
  // One folder per album: src/content/photography/<album>/index.md + its images.
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/photography',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      location: z.string().optional(),
      description: z.string().optional(),
      cover: z.object({
        src: image(),
        alt: z.string().min(1, 'Describe the cover image for screen readers'),
      }),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1, 'Every photo needs alt text'),
            caption: z.string().optional(),
          }),
        )
        .min(1),
      draft,
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags,
    draft,
  }),
});

export const collections = { publications, projects, coursework, photography, blog };
