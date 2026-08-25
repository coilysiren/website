# Features

Baseline inventory of what `coilysiren/website`
([www.coilysiren.me](https://www.coilysiren.me)) ships today. Update a section when a
feature is added, removed, or reshaped, so the diff shows scope drift.

## What ships

- **Stack** - Eleventy, Nunjucks, Markdown, and Sass, output as locally served
  core HTML, CSS, and fonts without a framework runtime or hydration. See [the
  stack](stack.md).
- **Homepage talk** - a responsive, lazy YouTube player for the Temporal Vibe
  Check sits between the hero and shipped products. It loads after the core
  page, so its resources do not sit on the critical rendering path.
- **Pages** - route-by-route inventory in [site pages](pages.md).
- **Discovery metadata** - one canonical host across tags, sitemap, `robots.txt`
  and `llms.txt`, a `sitemap.xml` generated from the indexable routes, and
  `Person` structured data on the homepage and About page. See [static
  generation](static-generation.md).
- **Post promotion** - `promoted: true` on a post drives its `/writing/`
  listing, its `robots`, its sitemap entry, the Atom feed, and the syndication
  allowlist from one key. Posts are dark by default. Promoted posts carry
  `BlogPosting` structured data and a machine-readable date. See [site
  pages](pages.md).
- **Atom feed** - `/feed.xml` carries the promoted posts and is advertised
  site-wide for autodiscovery. No feed plugin and no new dependency. See
  [static generation](static-generation.md).
- **Social card** - a committed 1200x630 default `og:image` with a per-page
  override, so link previews render as a card rather than bare text. No
  generator and no build step. See [social card](social-card.md).
- **Templates and data** - layouts, includes, and data files in
  [templates and data](templates.md).
- **Build scripts** - `build-resume.py` renders the printable resume and
  `clean-output.mjs` clears stale output, both under [scripts/](../scripts/).
- **CI workflows** - every workflow and its trigger in
  [CI workflows](ci-workflows.md).

## Tests, deploy, baseline

- **Tests** - build-output contracts run browser-free under vitest, and
  Cypress covers the invariants that need a real browser: layout, and an
  `axe-core` pass over every emitted route. What is asserted, and what is
  deliberately not, in [verification](verification.md). Accessibility has its
  own page: [accessibility](accessibility.md).
- **Deploy** - how a merge reaches production: [deploy](deploy.md).
- **Managed pre-commit block** from agentic-os plus a local offline
  `trufflehog` hook.

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [staging.md](staging.md) - staging image boundary and local verification.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [justfile](../justfile) - dev verbs.
- [.ward/ward.yaml](../.ward/ward.yaml) - catalog metadata only.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
