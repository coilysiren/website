# CI workflows

Durable rationale for the Forgejo workflows under `.forgejo/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## `config.yml` - Run Tests

Runs on every PR and on push to `main`.

- `test` runs in the pinned dev-base image and uses `ward exec install`, `ward exec build`, and `ward exec test-quick`.
- `test` runs in the pinned dev-base image, enables corepack, installs with `pnpm install --frozen-lockfile`, and then uses `ward exec build` and `ward exec test-quick`.
- `test-e2e` runs the Cypress smoke path in the `cypress/included` image because the dev-base image does not carry a browser stack.

The Forgejo workflow keeps package-manager behavior aligned with `packageManager` by letting `ward` own the install/build/test verbs where the image supports it.

## `pulse-refresh.yml` - Refresh pulse data

This stays a separate design choice for now. The GitHub workflow still handles the daily `pulse-data.yaml` refresh, but there is no Forgejo equivalent in this pass.

- **Decision** - no Forgejo port yet. The workflow mutates repo state and needs a separate call on whether canonical Forgejo should own that refresh, mirror it from GitHub, or replace it with a different ingestion path.

## `trufflehog.yml` - secret scan

Push, PR, weekly cron (Mondays 12:00 UTC), and manual dispatch. Runs TruffleHog over the git history in offline mode, excluding lockfiles and the `URI` detector. This is the canonical Forgejo secret-scan surface now.
