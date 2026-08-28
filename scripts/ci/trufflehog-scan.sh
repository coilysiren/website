#!/usr/bin/env bash
# Offline git secret scan, lifted out of .github/workflows/trufflehog.yml so the
# workflow step stays one line. The exclude list is a throwaway input to one
# docker run rather than repo content, so it is written at run time into a temp
# file that is cleaned up, instead of the fixed /tmp path the inline version used.
set -euo pipefail

exclude="$(mktemp)"
trap 'rm -f "$exclude"' EXIT

cat >"$exclude" <<'EOF'
(^|/)package-lock\.json$
(^|/)yarn\.lock$
(^|/)pnpm-lock\.yaml$
EOF

docker run --rm \
  -v "${GITHUB_WORKSPACE:-$PWD}:/pwd:ro" \
  -v "$exclude:/exclude:ro" \
  trufflesecurity/trufflehog:latest \
  git file:///pwd \
  --no-verification --no-update --fail \
  --exclude-paths=/exclude \
  --exclude-detectors=URI
