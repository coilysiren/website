# Source layout

Where each kind of source file lives in the tree.

* [`eleventy.config.js`](../eleventy.config.js) - Eleventy directories,
  collections, date filters, passthrough assets, syntax highlighting, and Sass
  compilation.
* [`src/_includes/`](../src/_includes/) - shared HTML head, navigation,
  footer, and Markdown content layout.
* [`src/_data/`](../src/_data/) - portfolio and About-page build data.
* [`src/pages/`](../src/pages/) - canonical Markdown for the resume, retained
  pages, and retired articles.
* [`src/sass/`](../src/sass/) - the existing responsive visual system,
  compiled once to `dist/styles/site.css`.
* [`src/sitemap.njk`](../src/sitemap.njk) - generates `sitemap.xml` from the
  indexable routes, so the crawl surface follows the pages rather than a list.

The public discovery boundary is `/`, `/about/`, `/hiring/`, `/resume/`,
`/writing/`, and any post carrying `promoted: true`. Only those receive
`follow, index`. Unpromoted posts, privacy, and unlisted pages remain directly
reachable with `noindex, nofollow`.

`robots` is computed in `src/pages/pages.11tydata.js` and beats front matter, so
a post cannot opt in by setting `robots` itself. That is why the flag is a
separate key.
