# The stack

What the site is built from and what it emits.

- **Eleventy static site** built with Nunjucks and Markdown, served from Netlify
  in production and an unprivileged nginx image in staging. Config and
  build-time Sass compilation live in
  [eleventy.config.js](../eleventy.config.js). The output is ordinary HTML,
  CSS, images, fonts, and documents under `dist/`, with no browser JavaScript
  or hydration runtime. See [static-generation.md](static-generation.md).
- **Canonical discovery files** at `/sitemap.xml` and `/llms.txt`, limited to
  the homepage, About, Hiring, and Resume surfaces.
- **Sass** styles under [src/sass/](../src/sass/).
