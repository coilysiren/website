# CI workflows

Durable rationale for the Forgejo workflows under `.forgejo/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## `config.yml` - Run Tests

Runs on every PR and on push to `main`.

- `test` runs in the moving :release dev-base image, enables Corepack, installs the
  pnpm 11 lockfile, and then uses `ward exec build` and
  `ward exec test-quick`.
- `test-e2e` runs the TypeScript Cypress smoke path in the pinned
  `cypress/included` image because the dev-base image does not carry a browser
  stack.

The Forgejo workflow keeps package-manager behavior aligned with
`packageManager` by letting `ward` own the build and test verbs where the image
supports it. GitHub mirror checks and Netlify builds use Node.js 24 from the
repository runtime pin.

## `publish-image.yml` - Publish staging image

Every push to canonical `main` runs on the trusted `deploy:host` runner. The
job publishes the checked-out source commit as
`forgejo.coilysiren.me/coilysiren/website:<full-source-sha>` and passes only
after remote manifest inspection succeeds. The package stays private and the
runner supplies only the package-write credential.

## `pulse-refresh.yml` - Refresh pulse data

This stays a separate design choice for now. The GitHub workflow still handles the daily `pulse-data.yaml` refresh, but there is no Forgejo equivalent in this pass.

- **Decision** - no Forgejo port yet. The workflow mutates repo state and needs a separate call on whether canonical Forgejo should own that refresh, mirror it from GitHub, or replace it with a different ingestion path.

## `trufflehog.yml` - secret scan

Push, PR, weekly cron (Mondays 12:00 UTC), and manual dispatch. Runs TruffleHog over the git history in offline mode, excluding lockfiles and the `URI` detector. This is the canonical Forgejo secret-scan surface now.
