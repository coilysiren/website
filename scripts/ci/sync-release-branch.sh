#!/usr/bin/env bash
# Fast-forward GitHub `release` to Forgejo `main`. Netlify builds production
# from `release`, so this run is the day's publish (coilysiren/website#149).
set -euo pipefail

if [ -z "${PAT:-}" ]; then
  echo "::error::sync-release-branch: GITHUB_MIRROR_PAT secret not set; production cannot publish." >&2
  exit 1
fi

git fetch origin main

if [ -n "${FORGEJO_EGRESS_PROXY:-}" ]; then
  export HTTP_PROXY="${FORGEJO_EGRESS_PROXY}"
  export HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}"
  export http_proxy="${FORGEJO_EGRESS_PROXY}"
  export https_proxy="${FORGEJO_EGRESS_PROXY}"
fi

git remote add github "https://x-access-token:${PAT}@github.com/coilysiren/website.git"

echo "before: $(git ls-remote github refs/heads/release || true)"
echo "target: $(git rev-parse refs/remotes/origin/main) refs/remotes/origin/main"

if ! git push github refs/remotes/origin/main:refs/heads/release; then
  echo "::error::sync-release-branch: fast-forward push to GitHub release rejected." >&2
  echo "GitHub release has diverged from Forgejo main or the PAT lost push access." >&2
  echo "Never force-push here: reconcile release by hand." >&2
  exit 1
fi

echo "after: $(git ls-remote github refs/heads/release)"
