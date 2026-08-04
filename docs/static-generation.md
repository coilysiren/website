# Static generation

The site uses Eleventy 3 to turn Nunjucks templates and Markdown content into
ordinary files under `dist/`. Production pages ship no browser JavaScript,
hydration markers, analytics, client router, service worker, or remote asset
dependency.

## Source layout

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

## Assets

Eleventy copies `static/` to the output root and `src/images/` to
`dist/images/`. The build copies only the six Roboto files used by the site
from `@fontsource/roboto`. Prism highlighting and Sass both run at build time.
All browser requests stay on the site origin.

Text Open Graph, Twitter, canonical, and article metadata live in the shared
base layout. Social preview images, RSS, and their generators are intentionally
absent.

## Hosting

Netlify publishes `dist/` and owns production redirects. The staging
Dockerfile copies the same directory into unprivileged nginx. Nginx owns the
matching permanent redirects and serves the designed `404.html` with an HTTP
404 response.

The permanent redirect set includes:

* `/now`, `/life`, and `/my-life` to `/about/`.
* Both spellings of `/posts/agent-launch-pillars` to `/`.
* The three dated Golang field-note paths to their retained post URLs.

## Verification

Run the repository-owned command surface:

```text
ward exec build
ward exec test
ward exec test-e2e-ci
ward exec pre-commit-all
```

The production Cypress suite verifies canonical content, metadata, direct
legacy pages, retired-route 404s, the designed 404 page, local-only assets, and
the absence of browser scripts or social-image metadata.
