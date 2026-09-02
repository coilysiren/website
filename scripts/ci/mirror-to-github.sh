#!/usr/bin/env bash
set -euo pipefail

if [ -z "${PAT:-}" ]; then
  echo "mirror-to-github: GITHUB_MIRROR_PAT secret not set; skipping." >&2
  exit 0
fi

git fetch origin main --tags

if [ -n "${FORGEJO_EGRESS_PROXY:-}" ]; then
  export HTTP_PROXY="${FORGEJO_EGRESS_PROXY}"
  export HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}"
  export http_proxy="${FORGEJO_EGRESS_PROXY}"
  export https_proxy="${FORGEJO_EGRESS_PROXY}"
fi

git remote add github "https://x-access-token:${PAT}@github.com/coilyco-flight-deck/website.git"
if ! git push github refs/remotes/origin/main:refs/heads/main; then
  echo "::error::mirror-to-github: fast-forward push to GitHub main rejected." >&2
  echo "GitHub main has diverged from Forgejo main or the PAT lost push access." >&2
  echo "GitHub main is protected, so a human must reconcile it." >&2
  exit 1
fi
git push --tags github
