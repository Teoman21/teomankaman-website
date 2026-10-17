# teomankaman-website

Personal academic website of Teoman Kaman, built with [Astro](https://astro.build) and deployed to GitHub Pages.

- Live (until the custom domain is connected): <https://teoman21.github.io/teomankaman-website/>
- Static output only: no server, no backend. Client-side JavaScript is limited to the theme toggle, the project tag filter and the photo lightbox.

## Contents

- [Run it locally](#run-it-locally)
- [Project layout](#project-layout)
- [Editing your details](#editing-your-details)
- [Adding content](#adding-content)
  - [Publications](#publications)
  - [Projects](#projects)
  - [Coursework](#coursework)
  - [Blog posts](#blog-posts)
  - [Photography albums](#photography-albums)
- [Drafts](#drafts)
- [Deployment](#deployment)
- [Switching to the custom domain](#switching-to-the-custom-domain)
- [Placeholder checklist](#placeholder-checklist)

## Run it locally

Requires **Node.js 22.12 or newer** (see `.nvmrc`).

```sh
npm install        # once
npm run dev        # dev server with hot reload → http://localhost:4321/teomankaman-website/
npm run build      # production build into dist/
npm run preview    # serve dist/ locally to check the production build
```

Other scripts:

```sh
npm run check         # type-check .astro/.ts files and content frontmatter
npm run format        # format everything with Prettier
npm run format:check  # verify formatting (no changes)
```

> The dev server serves the site under the `/teomankaman-website/` base path, the same as GitHub Pages. Once you switch to the custom domain it moves to `http://localhost:4321/`.

## Project layout

```text
├── astro.config.mjs        # site URL, base path, Markdown/math/syntax highlighting
├── public/                 # copied as-is: cv.pdf, favicons
├── src/
│   ├── config.ts           # ← your name, bio, profile links, navigation
│   ├── content.config.ts   # content collection schemas (frontmatter validation)
│   ├── content/            # ← all your content lives here (Markdown)
│   │   ├── publications/
│   │   ├── projects/
│   │   ├── coursework/
│   │   ├── blog/
│   │   └── photography/<album>/index.md + photos
│   ├── assets/             # profile photo, default social-sharing image
│   ├── components/  layouts/  pages/  styles/  lib/
└── .github/workflows/deploy.yml
```

## Editing your details

| What                                        | Where                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| Name, tagline, meta description             | `src/config.ts` → `SITE`                                                             |
| GitHub / Scholar / LinkedIn / email         | `src/config.ts` → `LINKS` (empty string hides a link)                                |
| Home page bio paragraphs                    | `src/pages/index.astro`                                                              |
| Profile photo                               | replace `src/assets/profile.jpg` (square, ~800px), update its `alt` in `index.astro` |
| Social sharing image (Open Graph / Twitter) | replace `src/assets/og-default.jpg` (1200×630)                                       |
| CV                                          | replace `public/cv.pdf`                                                              |
| Favicon                                     | `public/favicon.svg`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`      |
| Colors and fonts                            | `src/styles/global.css` (tokens at the top)                                          |

## Adding content

Each content type is a folder under `src/content/`. Adding an item means dropping a Markdown (`.md`) file into that folder; the file name becomes its ID or URL slug. Frontmatter is validated at build time, so a missing or misspelled field fails with a clear error. Run `npm run check` (or just `npm run dev`) to see it.

Links in frontmatter can be full URLs (`https://…`) or paths to files in `public/` starting with `/` (e.g. `/papers/my-paper.pdf` for `public/papers/my-paper.pdf`). The base path is added automatically.

### Publications

`src/content/publications/<short-name>.md`. Shown on `/publications/` grouped by year (newest first). `featured: true` also lists it on the home page.

```md
---
title: 'Paper Title'
authors:
  - Teoman Kaman
  - Coauthor Name
venue: Conference or Journal Name
year: 2026
status: published # published | under review | preprint | workshop
links: # all optional
  pdf: /papers/paper-title.pdf
  arxiv: https://arxiv.org/abs/XXXX.XXXXX
  code: https://github.com/Teoman21/repo
  poster: https://example.com/poster.pdf
  slides: https://example.com/slides.pdf
abstract: >-
  Optional abstract, shown in a collapsible section.
featured: false
draft: false
---
```

Your name is highlighted in the author list when it matches `SITE.authorName` in `src/config.ts` exactly.

### Projects

`src/content/projects/<short-name>.md`. Shown as cards on `/projects/` (newest first), filterable by tag.

```md
---
title: 'Project Title'
summary: One or two sentences describing the project.
date: 2026-03-01
tags: [interpretability, pytorch]
links: # all optional
  repo: https://github.com/Teoman21/repo
  demo: https://example.com
  paper: https://arxiv.org/abs/XXXX.XXXXX
image: # optional; alt text is required when an image is set
  src: ./images/project-title.jpg
  alt: Short description of the image
featured: false
draft: false
---
```

Put project images in `src/content/projects/images/` (16:9 works best). They are resized and converted to AVIF/WebP automatically.

### Coursework

`src/content/coursework/<short-name>.md`. Shown on `/coursework/` grouped by institution, then by term (newest first).

```md
---
name: Reinforcement Learning and Sequential Decision Making
code: CS 5180 # optional
institution: Northeastern University
term: Fall 2025 # "Spring|Summer|Fall|Winter YYYY"
description: One or two sentences about the course.
repo: https://github.com/Teoman21/repo # optional
tags: [reinforcement learning]
inProgress: false # true for courses you're currently taking
draft: false
---
```

Use the exact same `institution` string for courses that belong together.

### Blog posts

`src/content/blog/<post-slug>.md` → `/blog/<post-slug>/`. Posts also appear in the RSS feed (`/rss.xml`) and the three latest are shown on the home page.

````md
---
title: 'Post Title'
date: 2026-10-16
description: One sentence used in the post list, RSS feed and search/social previews.
tags: [optimization, notes]
draft: false
---

Write Markdown here. Inline math: $f(x) = x^\top A x$. Display math:

$$
x_{t+1} = x_t - \eta \nabla f(x_t)
$$

Fenced code blocks get syntax highlighting:

```python
print("hello")
```
````

Math is rendered at build time with KaTeX (no client-side JavaScript). Code highlighting uses Shiki with light and dark themes that follow the site theme. GitHub-flavored Markdown (tables, footnotes, task lists) works as well.

### Photography albums

Each album is a folder containing an `index.md` and its photos:

```text
src/content/photography/
└── boston-2025/            → /photography/boston-2025/
    ├── index.md
    ├── 01.jpg
    ├── 02.jpg
    └── 03.jpg
```

`index.md` (paths are relative to the folder):

```md
---
title: Boston in the Fall
date: 2025-10-25
location: Boston, MA # optional
description: Optional one-line description. # optional
cover:
  src: ./01.jpg
  alt: Describe the cover photo
images:
  - src: ./01.jpg
    alt: Describe the photo for screen readers
    caption: Optional caption shown under the photo and in the lightbox
  - src: ./02.jpg
    alt: Describe the photo
draft: false
---

Optional notes about the album (Markdown), shown above the gallery.
```

`alt` text is **required** for every photo. The build fails without it.

**Before committing photos:**

1. **Resize to about 2000px on the long edge** and export as JPEG (quality ~80–85). The site generates smaller thumbnails (480/960px, AVIF + WebP) and lightbox versions (1200/2000px WebP) automatically, so larger originals only bloat the repository. On macOS:

   ```sh
   # resizes in place so the long edge is 2000px; work on copies of your exports
   sips -Z 2000 --setProperty formatOptions 85 *.jpg
   # or, with ImageMagick ('>' only ever shrinks, never enlarges):
   magick mogrify -resize '2000x2000>' -quality 85 *.jpg
   ```

2. **Strip location data.** The repository is public, and the original files are also published alongside the resized versions. Export with location removed (Lightroom/Photos option), or run `exiftool -gps:all= -overwrite_original *.jpg`.

3. **Don't commit RAW files.** `.CR2`, `.CR3`, `.NEF`, `.ARW` and `.DNG` are ignored by `.gitignore`.

## Drafts

Every content type accepts `draft: true` in its frontmatter:

- `npm run dev`: drafts are visible, marked with a yellow **Draft** label.
- `npm run build` (and therefore the deployed site, RSS feed and sitemap): drafts are excluded entirely.

See `src/content/blog/draft-example.md` for an example. Remove the `draft` line or set it to `false` to publish.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site with the official [`withastro/action`](https://github.com/withastro/action) and publishes it with `actions/deploy-pages`. Progress and logs are under the repository's **Actions** tab. You can also re-run it manually there (**Deploy to GitHub Pages → Run workflow**).

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Switching to the custom domain

When `teomankaman.com` is ready:

1. **`astro.config.mjs`**: set `site: 'https://teomankaman.com'` and delete the `base: '/teomankaman-website'` line. No other code changes are needed; every internal link goes through `import.meta.env.BASE_URL`.
2. **`public/CNAME`**: create it containing exactly one line:

   ```text
   teomankaman.com
   ```

3. **DNS** (at your domain registrar):
   - Apex `teomankaman.com`: `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (optionally `AAAA` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
   - `www`: `CNAME` → `teoman21.github.io`
4. **GitHub**: Settings → Pages → Custom domain → `teomankaman.com` → Save. Once the certificate is issued, tick **Enforce HTTPS**. It's also worth verifying the domain under your account's Settings → Pages → Verified domains to prevent takeovers.
5. Commit and push. GitHub then redirects the old `teoman21.github.io/teomankaman-website` address to the custom domain.

## Placeholder checklist

Everything below is placeholder content to replace or delete:

- [ ] `src/config.ts`: Scholar URL, LinkedIn URL, email
- [ ] `src/pages/index.astro`: bio text (written from your notes), profile photo `alt`
- [ ] `src/assets/profile.jpg`: your photo
- [ ] `public/cv.pdf`: your CV
- [ ] `src/content/**`: every file whose title starts with "Placeholder" (search for `PLACEHOLDER`)
- [ ] `src/content/photography/*-placeholder/`: generated placeholder images
- [ ] `public/favicon.svg` and PNG favicons, `src/assets/og-default.jpg` (optional)

## Upgrading Astro

The project pins Astro 7.3.x. Astro 7.4+ requires Node.js 22.22 or newer. After upgrading Node (`brew upgrade node@22`, or `nvm install 22`), update with:

```sh
npm install astro@latest @astrojs/markdown-remark@latest @astrojs/sitemap@latest @astrojs/rss@latest
npm run build
```
