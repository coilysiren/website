# Features

Baseline inventory of what `coilysiren/website` ([coilysiren.me](https://coilysiren.me)) ships today. Reference point for scope changes. When a feature is added, removed, or materially reshaped, update the relevant section so the diff shows scope drift over time.

Last full sweep: 2026-07-09.

## Stack

- **Gatsby static site** (TypeScript), served from Netlify in production and an unprivileged nginx image in staging. Config at [gatsby-config.ts](../gatsby-config.ts), build hooks at [gatsby-node.ts](../gatsby-node.ts), browser/SSR shells at [gatsby-browser.tsx](../gatsby-browser.tsx) / [gatsby-ssr.tsx](../gatsby-ssr.tsx).
- **RSS feed** via `gatsby-plugin-feed`.
- **Sass** styles under [src/sass/](../src/sass/).

## Pages

Under [src/pages/](../src/pages/):

- **`index.tsx`** - home / landing.
- **`about.tsx`** - canonical About page combining a concise bio opening with the visual autobiography and its themed collections.
- **`resume.md`** - canonical resume surface.
- **`pulse.tsx`** - live ops pulse rendered from `scripts/pulse-data.yaml`, refreshed by a workflow.
- **`cool-people.md`** - links page.
- **`eco-modding.md`** - Eco-modding writeups.
- **`hiring.md`** - unlisted recruiting stance page (`unlisted: true`, `noindex`, robots-Disallowed). Direct link only.
- **`coilysiren-personal-gmail-privacy.md`** - privacy and contact notice for the `coilysiren-personal-gmail` OAuth client.
- **`404.tsx`** - not-found.
- **`posts/`** - long-form posts (cloud, Terraform, Golang notes, code janitor, permissions, stochastic design, etc.).
- **`apps/`** - portfolio and embedded mini-apps. `index.tsx` presents four
  public apps, the observability stack as a first-class engineering capability,
  and an icon-forward inventory of bounded MCP integrations. It preserves the
  browser-side reachability lights for public apps and links to the two embedded
  Bluesky experiments (`bsky-follow-suggestions.tsx` and
  `bsky-popularity-contest.tsx`). Brand marks used by integration cards are
  vendored under `static/apps-icons/`, with provenance recorded in
  [app-icons.md](app-icons.md).
- **`orgs/`** - organization hub and native profile pages for
  `coilyco-flight-deck`, `coilyco-bridge`, and `coilyco-gaming`. The static
  catalog mirrors the three GitHub organization profile READMEs, including
  repository and topic cross-indexes, and uses the existing organization SVG
  marks with distinct shared-room accents. Every route has dedicated metadata,
  Open Graph art, keyboard-visible actions, and cross-navigation.
- **`testing/`** - test fixtures.

## Components

React/TS components under [src/components/](../src/components/): `hero`, `header`, `footer`, `nav`, `layout`, `blog-list`, `bsky`, `closer`, `content-block`, `default-head`, `error`, `links`, `page-context`, `site-metadata`.

## Data-fetch and build scripts

Under [scripts/](../scripts/):

- **[build-resume.py](../scripts/build-resume.py)** - generates the resume page from source.
- **[fetch-pulse-data.ts](../scripts/fetch-pulse-data.ts)** - pulls pulse data into [scripts/pulse-data.yaml](../scripts/pulse-data.yaml).
- **[render-og-images.tsx](../scripts/render-og-images.tsx)** - renders OG previews + logo `banner.png`, with derived output cached beside the script-generated assets.
- **[youtube-auth.ts](../scripts/youtube-auth.ts)** - YouTube data auth helper.

## CI workflows

Under `.forgejo/workflows/`:

- **`config.yml`** - main test workflow. Runs the repo gate in the moving :release dev-base image through `ward exec`, plus the Cypress smoke job for browser coverage.
- **`publish-image.yml`** - trusted main-only publisher for the private,
  single-architecture staging image at
  `forgejo.coilysiren.me/coilysiren/website:<full-source-sha>`. The job uses a
  package-write credential and verifies the remote immutable manifest.
- **`trufflehog.yml`** - offline secret scan on push, PR, cron, and manual dispatch.

`pulse-refresh.yml` stays on GitHub for now as a separate design decision. It has no Forgejo equivalent yet.

## End-to-end tests

- **Cypress** smoke tests under [cypress/e2e/](../cypress/e2e/), driven by [cypress.config.ts](../cypress.config.ts).

## Deploy

- **Netlify** picks up `main`. Build status badge in the README. Site at <https://coilysiren.me>.
- **Staging image contract** builds the locked Gatsby site, serves it from unprivileged nginx on port 8080, and publishes the exact source commit to Forgejo OCI. The deploy repository pulls and rolls that image to <https://website.coilysiren.me>. See [staging.md](staging.md).
- **Site-deploy verification is out of scope** here. The workflows cover tests, pulse refresh, and trufflehog. Netlify and the deploy repository roll their respective hosts on their own cadence (see [AGENTS.md](../AGENTS.md)).

## Repo baseline

- **Managed pre-commit block** from agentic-os, plus the local offline `trufflehog` hook in [`.pre-commit-config.yaml`](../.pre-commit-config.yaml).

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [staging.md](staging.md) - staging image boundary and local verification.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [.ward/ward.yaml](../.ward/ward.yaml) - allowlisted commands.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
