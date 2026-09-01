# The test and mirror workflow

What runs on every push, and how the GitHub mirror stays in step.

Runs on pushes to canonical `main` and `v*` tags. The workflow uses the
repository-scoped `deploy:host` runner because user-owned repositories do not
have an approved general `docker` runner. Pull requests are intentionally
excluded because the host runner carries the package-write credential used by
the trusted publisher lane.

- `test` streams the checkout into the moving `:lang-node-release` specialist
  from the dev-base image family, enables Corepack, installs the pnpm 11
  lockfile, and then uses `just build` and `just test-quick`.
  Eleventy emits the production `dist/` tree before the fast checks run.
- `test-e2e` runs the TypeScript Cypress smoke path in the pinned
  `cypress/included` image through the same streamed-checkout boundary
  because the dev-base image does not carry a browser stack. The production
  suite builds and serves Eleventy output, then verifies canonical content,
  local core CSS and font resources, retired routes, the designed 404, and
  text-only social-image metadata.
- `mirror` starts only after both test jobs pass. It fast-forwards Forgejo
  `main` and appends tags to the read-only `coilysiren/website` GitHub mirror.
  It never force-pushes and fails red when the histories diverge. It does
  not touch the GitHub `release` branch, which the
  [daily release sync](ci-workflows.md#daily-release-syncyml---daily-release-sync)
  owns.

The host runner talks to its Docker sidecar, so bind mounts cannot carry the
runner workspace into a test container. `scripts/ci/run-in-container.sh`
therefore sends the checkout as a tar stream over standard input. The test
environment stays isolated in the matching release image family without
broadening runner scope. Every workflow sharing the runner uses the same
concurrency group, and every Docker-producing script prunes the disposable
daemon before and after work. This keeps the runner's 24 GiB scratch volume
below its hard eviction limit.
