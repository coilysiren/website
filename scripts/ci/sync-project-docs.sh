#!/usr/bin/env bash
# Refresh the vendored project docs, pushing only on change.
# Invoked as a single-line run step from sync-project-docs.yml.
set -euo pipefail

if [ -n "${FORGEJO_EGRESS_PROXY:-}" ]; then
  export HTTP_PROXY="${FORGEJO_EGRESS_PROXY}"
  export HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}"
  export http_proxy="${FORGEJO_EGRESS_PROXY}"
  export https_proxy="${FORGEJO_EGRESS_PROXY}"
  # The source repos are on the same Forgejo this runs against.
  export NO_PROXY="${NO_PROXY:-forgejo.coilysiren.me,localhost,127.0.0.1}"
  export no_proxy="${NO_PROXY}"
fi

python3 scripts/sync-project-docs.py

if test -z "$(git status --porcelain -- src/projects src/data/docs-mount-source.json)"; then
  echo "project docs unchanged"
  exit 0
fi

git config user.name "coilyco-ops"
git config user.email "coilyco-ops@coilysiren.me"
git add -A -- src/projects src/data/docs-mount-source.json
git commit -m "project-docs: sync the mount from its source repositories"
git push origin HEAD:main
