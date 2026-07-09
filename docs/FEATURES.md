# Features

Baseline inventory of what `coilysiren/website` ([coilysiren.me](https://coilysiren.me)) ships today. Reference point for scope changes. When a feature is added, removed, or materially reshaped, update the relevant section so the diff shows scope drift over time.

Last full sweep: 2026-07-09.

## Stack

- **Gatsby static site** (TypeScript), served from Netlify. Config at [gatsby-config.ts](../gatsby-config.ts), build hooks at [gatsby-node.ts](../gatsby-node.ts), browser/SSR shells at [gatsby-browser.tsx](../gatsby-browser.tsx) / [gatsby-ssr.tsx](../gatsby-ssr.tsx).
- **Sentry** error reporting via `@sentry/gatsby`.
- **RSS feed** via `gatsby-plugin-feed`.
- **Sass** styles under [src/sass/](../src/sass/).

## Pages

Under [src/pages/](../src/pages/):

- **`index.tsx`** - home / landing.
- **`about.tsx`** - bio. Sync target for `Resume.md`'s intro paragraphs (per the parent `AGENTS.md` sync list).
- **`resume.md`** - canonical resume surface.
- **`now.md`** - living "what I'm into this week" page, regenerated via the `generate-now-page` skill.
- **`pulse.tsx`** - live ops pulse rendered from `scripts/pulse-data.yaml`, refreshed by a workflow.
- **`cool-people.md`** - links page.
- **`eco-modding.md`** - Eco-modding writeups.
- **`hiring.md`** - unlisted recruiting stance page (`unlisted: true`, `noindex`, robots-Disallowed). Direct link only.
- **`coilysiren-personal-gmail-privacy.md`** - privacy and contact notice for the `coilysiren-personal-gmail` OAuth client.
- **`404.tsx`** - not-found.
- **`posts/`** - long-form posts (cloud, Terraform, Golang notes, code janitor, permissions, stochastic design, etc.).
- **`apps/`** - embedded mini-apps: `bsky-follow-suggestions.tsx`, `bsky-popularity-contest.tsx`, `index.tsx`.
- **`testing/`** - test fixtures.

## Components

React/TS components under [src/components/](../src/components/): `hero`, `header`, `footer`, `nav`, `layout`, `blog-list`, `bsky`, `closer`, `content-block`, `default-head`, `error`, `links`, `page-context`, `site-metadata`.

## Data-fetch and build scripts

Under [scripts/](../scripts/):

- **[build-resume.py](../scripts/build-resume.py)** - generates the resume page from source.
- **[fetch-now-data.ts](../scripts/fetch-now-data.ts)** - pulls source data for the `/now` page.
- **[fetch-pulse-data.ts](../scripts/fetch-pulse-data.ts)** - pulls pulse data into [scripts/pulse-data.yaml](../scripts/pulse-data.yaml).
- **[render-og-images.tsx](../scripts/render-og-images.tsx)** - renders OG previews + logo `banner.png`, with derived output cached beside the script-generated assets.
- **[youtube-auth.ts](../scripts/youtube-auth.ts)** - YouTube data auth helper.

## CI workflows

Under `.forgejo/workflows/`:

- **`config.yml`** - main test workflow. Runs the repo gate in the pinned dev-base image through `ward exec`, plus the Cypress smoke job for browser coverage.
- **`trufflehog.yml`** - offline secret scan on push, PR, cron, and manual dispatch.

`pulse-refresh.yml` stays on GitHub for now as a separate design decision. It has no Forgejo equivalent yet.

## End-to-end tests

- **Cypress** smoke tests under [cypress/e2e/](../cypress/e2e/), driven by [cypress.config.js](../cypress.config.js).

## Deploy

- **Netlify** picks up `main`. Build status badge in the README. Site at <https://coilysiren.me>.
- **Site-deploy verification is out of scope** here. The workflows cover tests, pulse refresh, and trufflehog. Netlify deploys on its own cadence (see [AGENTS.md](../AGENTS.md)).

## Repo baseline

- **Managed pre-commit block** from agentic-os, plus the local offline `trufflehog` hook in [`.pre-commit-config.yaml`](../.pre-commit-config.yaml).

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [.ward/ward.yaml](../.ward/ward.yaml) - allowlisted commands.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
