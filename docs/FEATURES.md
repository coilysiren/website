# Features

Baseline inventory of what `coilysiren/website` ([coilysiren.me](https://coilysiren.me)) ships today. Use this as the reference point for scope changes. When a feature is added, removed, or materially reshaped, update the relevant section so the diff against this file shows scope drift over time.

Last full sweep: 2026-05-11.

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
- **`pulse.tsx`** - live ops pulse rendered from `scripts/pulse-data.yaml` and refreshed by a GitHub Actions workflow.
- **`cool-people.md`** - links page.
- **`eco-modding.md`** - Eco-modding writeups.
- **`404.tsx`** - not-found.
- **`posts/`** - long-form posts (cloud, Terraform, Golang PR notes, code janitor, permissions models, stochastic design, etc.).
- **`apps/`** - embedded mini-apps: `bsky-follow-suggestions.tsx`, `bsky-popularity-contest.tsx`, plus the `apps/index.tsx` directory.
- **`testing/`** - test fixtures.

## Components

Reusable React/TS components under [src/components/](../src/components/): `hero`, `header`, `footer`, `nav`, `layout`, `blog-list`, `bsky`, `closer`, `content-block`, `default-head`, `error`, `links`, `page-context`, `site-metadata`.

## Data-fetch and build scripts

Under [scripts/](../scripts/):

- **[build-resume.py](../scripts/build-resume.py)** - generates the resume page from canonical source.
- **[fetch-now-data.ts](../scripts/fetch-now-data.ts)** - pulls source data for the `/now` page.
- **[fetch-pulse-data.ts](../scripts/fetch-pulse-data.ts)** - pulls live pulse data into [scripts/pulse-data.yaml](../scripts/pulse-data.yaml).
- **[render-og-images.tsx](../scripts/render-og-images.tsx)** - renders OG preview images. Cached metadata at [scripts/apps-og-cache.json](../scripts/apps-og-cache.json).
- **[youtube-auth.ts](../scripts/youtube-auth.ts)** - YouTube data auth helper.

## CI workflows

Under `.github/workflows/`:

- **`config.yml`** - main test workflow (tsc, eslint, Cypress smoke, build).
- **`automerge.yml`** - auto-merge Dependabot/automation PRs once checks pass.
- **`pulse-refresh.yml`** - scheduled refresh of `pulse-data.yaml` so `/pulse` renders fresh state.
- **`trufflehog.yml`** - offline secret scan.

## End-to-end tests

- **Cypress** smoke tests under [cypress/e2e/](../cypress/e2e/), driven by [cypress.config.js](../cypress.config.js).

## Deploy

- **Netlify** picks up `main`. Build status badge in the README. Site at <https://coilysiren.me>.
- **Site-deploy verification is out of scope** for this repo. The GitHub Actions workflows here cover tests, automerge, pulse refresh, trufflehog. Netlify handles the deploy on its own cadence (see [AGENTS.md](../AGENTS.md)).

## Repo baseline

- **Commit-msg hook** at [scripts/check-commit-closes-issue.py](../scripts/check-commit-closes-issue.py), canonical version rolled out from `coilysiren/agentic-os-kai`.

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [.coily/coily.yaml](../.coily/coily.yaml) - allowlisted commands.

Cross-reference convention from [coilysiren/agentic-os-kai#313](https://github.com/coilysiren/agentic-os-kai/issues/313).
