# Static generation

The site uses Eleventy 3 to turn Nunjucks templates and Markdown content into
ordinary files under `dist/`. Production pages ship no browser JavaScript,
hydration markers, analytics, client router, service worker, or remote asset
dependency.

## Source layout

Where each kind of source lives: [source layout](source-layout.md).

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

What to run before trusting a build: [verification](verification.md).

