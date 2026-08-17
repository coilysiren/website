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

The public discovery boundary is `/`, `/about/`, `/hiring/`, and
`/resume/`. Only those routes receive `follow, index`. Retired writing,
posts, privacy, and unlisted pages remain directly reachable with
`noindex, nofollow`.
