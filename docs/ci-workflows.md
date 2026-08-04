# CI workflows

Durable rationale for the Forgejo workflows under `.forgejo/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## `mirror-to-github.yml` - Test and mirror

Runs on pushes to canonical `main` and `v*` tags. The workflow uses the
repository-scoped `deploy:host` runner because user-owned repositories do not
have an approved general `docker` runner. Pull requests are intentionally
excluded because the host runner carries the package-write credential used by
the trusted publisher lane.

- `test` streams the checkout into the moving `:lang-node-release` specialist
  from the dev-base image family, enables Corepack, installs the pnpm 11
  lockfile, and then uses `ward exec build` and `ward exec test-quick`.
  Eleventy emits the production `dist/` tree before the fast checks run.
- `test-e2e` runs the TypeScript Cypress smoke path in the pinned
  `cypress/included` image through the same streamed-checkout boundary
  because the dev-base image does not carry a browser stack. The production
  suite builds and serves Eleventy output, then verifies canonical content,
  local-only assets, retired routes, the designed 404, and the absence of
  browser scripts and social-image metadata.
- `mirror` starts only after both test jobs pass. It fast-forwards Forgejo
  `main` and appends tags to the read-only `coilysiren/website` GitHub mirror.
  It never force-pushes and fails red when the histories diverge.

The host runner talks to its Docker sidecar, so bind mounts cannot carry the
runner workspace into a test container. `scripts/ci/run-in-container.sh`
therefore sends the checkout as a tar stream over standard input. The test
environment stays isolated in the matching release image family without
broadening runner scope. Every workflow sharing the runner uses the same
concurrency group, and every Docker-producing script prunes the disposable
daemon before and after work. This keeps the runner's 24 GiB scratch volume
below its hard eviction limit.

## `publish-image.yml` - Publish staging image

Every push to canonical `main` runs on the trusted `deploy:host` runner. The
job publishes the checked-out source commit as
`forgejo.coilysiren.me/coilysiren/website:<full-source-sha>` and passes only
after remote manifest inspection succeeds. The package stays private and the
runner supplies only the package-write credential. It shares the serialized
runner concurrency group and clears disposable Docker state around the build.

## `trufflehog.yml` - secret scan

Push, weekly cron (Mondays 12:00 UTC), and manual dispatch. The trusted host
runner streams the full checkout into the dev-base image and runs TruffleHog
over git history in offline mode, excluding lockfiles and the `URI` detector.
This is the canonical Forgejo secret-scan surface.
