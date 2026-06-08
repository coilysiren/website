# CI workflows

Durable rationale for the GitHub Actions workflows under `.github/workflows/`. YAML comment discipline (the agentic-os `code-comments` hook) keeps the workflow files themselves comment-free, so the why-not-what lives here.

## `config.yml` - Run Tests

Runs on every PR and on push to `main`. Two jobs: `test` (build + `pnpm test:quick`) on `node:22`, and `test-e2e` (build + `pnpm test:e2e:ci`) on the `cypress/included` image. Pinned `ubuntu-22.04` runners and container tags keep the matrix reproducible.

## `pulse-refresh.yml` - Refresh pulse data

Daily at 10:00 UTC (~3am PT) plus manual dispatch. Fetches `/pulse` data and direct-pushes `scripts/pulse-data.yaml` to `main` if it changed.

- **`PULSE_REFRESH_PAT`** - a user PAT kept for parity with the prior `/search/commits` era. The current code uses REST `/repos/X/commits`, which works fine with the install `GITHUB_TOKEN` too. Switch only if PAT rotation gets painful.
- **`createCommitOnBranch` (GraphQL)** - the commit step pushes through the GitHub API rather than `git push`. API commits are signed by `github-web-flow`, which satisfies the `required_signatures` branch-protection rule that blocks `git push` from `github-actions[bot]`.
- **Failure notify** - on failure the workflow files a `type/fix` issue and then `exit 1` to keep the run red.

## `automerge.yml` - auto-merge

Enables squash auto-merge on Dependabot PRs. Pattern from the [GitHub docs](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/automating-dependabot-with-github-actions#enable-auto-merge-on-a-pull-request).

## `trufflehog.yml` - secret scan

Push, PR, weekly cron (Mondays 12:00 UTC), and manual dispatch. Runs TruffleHog over the git history in offline mode, excluding lockfiles and the `URI` detector.
