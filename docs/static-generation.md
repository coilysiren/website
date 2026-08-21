# Static generation

The site uses Eleventy 3 to turn Nunjucks templates and Markdown content into
ordinary files under `dist/`. Core rendering uses static HTML plus locally
served CSS and fonts, without a framework runtime, hydration markers,
analytics, client router, or service worker. Optional embeds may load their
own resources after the core page is usable.

## Source layout

Where each kind of source lives: [source layout](source-layout.md).

## Assets

Eleventy copies `static/` to the output root and `src/images/` to
`dist/images/`. The build copies only the six Roboto files used by the site
from `@fontsource/roboto`. Prism highlighting and Sass both run at build time.
The critical CSS and font requests stay on the site origin. The homepage's lazy
YouTube iframe may load its own player resources after the core page renders.

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

What to run before trusting a build: [verification](verification.md).
