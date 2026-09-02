# CI workflows

Durable rationale for the Forgejo workflows under `.forgejo/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## Test and mirror

`mirror-to-github.yml` is the main gate: [the mirror workflow](ci-mirror.md).

## `publish-image.yml` - Publish staging image

Every push to canonical `main` runs on the trusted `deploy:host` runner. The
job publishes the checked-out source commit as
`forgejo.coilysiren.me/coilyco-flight-deck/website:<full-source-sha>` and passes only
after remote manifest inspection succeeds. The package stays private and the
runner supplies only the package-write credential. It shares the serialized
runner concurrency group and clears disposable Docker state around the build.

## `trufflehog.yml` - secret scan

Push, weekly cron (Mondays 12:00 UTC), and manual dispatch. The trusted host
runner streams the full checkout into the dev-base image and runs TruffleHog
over git history in offline mode, excluding lockfiles and the `URI` detector.
This is the canonical Forgejo secret-scan surface.
