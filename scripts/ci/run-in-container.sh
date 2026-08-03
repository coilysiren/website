#!/usr/bin/env bash
set -euo pipefail

registry="forgejo.coilysiren.me"
dev_base_image="${registry}/coilyco-flight-deck/agentic-os:release"
cypress_image="cypress/included:15.19.0"

if [ -z "${FORGEJO_EGRESS_PROXY:-}" ]; then
  echo "FORGEJO_EGRESS_PROXY is required for trusted CI dependency access." >&2
  exit 1
fi

docker_config=""
cleanup() {
  if [ -n "${docker_config}" ]; then
    rm -rf "${docker_config}"
  fi
}
trap cleanup EXIT

pull_dev_base() {
  if [ -z "${REGISTRY_TOKEN:-}" ]; then
    echo "REGISTRY_TOKEN is required to pull the private dev-base image." >&2
    exit 1
  fi

  docker_config="$(mktemp -d)"
  chmod 700 "${docker_config}"
  export DOCKER_CONFIG="${docker_config}"
  printf '%s' "${REGISTRY_TOKEN}" \
    | docker login "${registry}" --username coilyco-ops --password-stdin
  docker pull "${dev_base_image}"
}

stream_checkout() {
  local image="$1"
  local command="$2"

  tar \
    --exclude='./.cache' \
    --exclude='./node_modules' \
    --exclude='./public' \
    -cf - . \
    | docker run --rm -i \
      --env CI=true \
      --env HTTP_PROXY="${FORGEJO_EGRESS_PROXY}" \
      --env HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}" \
      --env http_proxy="${FORGEJO_EGRESS_PROXY}" \
      --env https_proxy="${FORGEJO_EGRESS_PROXY}" \
      --workdir /workspace \
      --entrypoint bash \
      "${image}" -ceu "${command}"
}

case "${1:-}" in
  test)
    pull_dev_base
    stream_checkout "${dev_base_image}" '
      tar -xf -
      corepack enable
      pnpm install --frozen-lockfile
      ward exec build
      ward exec test-quick
    '
    ;;
  e2e)
    docker pull "${cypress_image}"
    stream_checkout "${cypress_image}" '
      tar -xf -
      corepack enable
      pnpm install --frozen-lockfile
      pnpm build
      pnpm test:e2e:ci
    '
    ;;
  scan)
    pull_dev_base
    stream_checkout "${dev_base_image}" '
      tar -xf -
      printf "%s\n" \
        "(^|/)package-lock\\.json$" \
        "(^|/)yarn\\.lock$" \
        "(^|/)pnpm-lock\\.yaml$" \
        > /tmp/trufflehog-exclude
      trufflehog git file:///workspace \
        --no-verification --no-update --fail \
        --exclude-paths=/tmp/trufflehog-exclude \
        --exclude-detectors=URI
    '
    ;;
  *)
    echo "usage: $0 test|e2e|scan" >&2
    exit 2
    ;;
esac
