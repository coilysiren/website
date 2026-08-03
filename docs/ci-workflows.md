# CI workflows

Durable rationale for the Forgejo workflows under `.forgejo/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## `mirror-to-github.yml` - Test and mirror

Runs on pushes to canonical `main` and `v*` tags. The workflow uses the
repository-scoped `deploy:host` runner because user-owned repositories do not
have an approved general `docker` runner. Pull requests are intentionally
excluded because the host runner carries the package-write credential used by
the trusted publisher lane.

- `test` streams the checkout into the moving `:release` dev-base image,
  enables Corepack, installs the pnpm 11 lockfile, and then uses
  `ward exec build` and `ward exec test-quick`.
- `test-e2e` runs the TypeScript Cypress smoke path in the pinned
  `cypress/included` image through the same streamed-checkout boundary because
  the dev-base image does not carry a browser stack.
- `mirror` starts only after both test jobs pass. It fast-forwards Forgejo
  `main` and appends tags to the read-only `coilysiren/website` GitHub mirror.
  It never force-pushes and fails red when the histories diverge.

The host runner talks to its Docker sidecar, so bind mounts cannot carry the
runner workspace into a test container. `scripts/ci/run-in-container.sh`
therefore sends the checkout as a tar stream over standard input. The test
environment stays isolated in the same images used by the former container
jobs without broadening runner scope.

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

Push, weekly cron (Mondays 12:00 UTC), and manual dispatch. The trusted host
runner streams the full checkout into the dev-base image and runs TruffleHog
over git history in offline mode, excluding lockfiles and the `URI` detector.
This is the canonical Forgejo secret-scan surface.
