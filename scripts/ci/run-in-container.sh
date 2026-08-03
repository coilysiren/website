#!/usr/bin/env bash
set -euo pipefail

registry="forgejo.coilysiren.me"
node_image="${registry}/coilyco-flight-deck/agentic-os:lang-node-release"
scan_image="${registry}/coilyco-flight-deck/agentic-os:release"
cypress_image="cypress/included:15.19.0"
no_proxy_hosts="127.0.0.1,localhost,forgejo.coilysiren.me,forgejo.forgejo.svc.cluster.local,.svc,.cluster.local"

if [ -z "${FORGEJO_EGRESS_PROXY:-}" ]; then
  echo "FORGEJO_EGRESS_PROXY is required for trusted CI dependency access." >&2
  exit 1
fi
if [ "${DOCKER_HOST:-}" != "tcp://localhost:2375" ]; then
  echo "The trusted CI adapter requires the repository runner Docker sidecar." >&2
  exit 1
fi

docker_config=""
cleanup() {
  docker system prune --all --force --volumes >/dev/null 2>&1 || true
  if [ -n "${docker_config}" ]; then
    rm -rf "${docker_config}"
  fi
}
trap cleanup EXIT

prepare_docker() {
  docker system prune --all --force --volumes >/dev/null
}

pull_private_image() {
  local image="$1"

  if [ -z "${REGISTRY_TOKEN:-}" ]; then
    echo "REGISTRY_TOKEN is required to pull the private CI image." >&2
    exit 1
  fi

  docker_config="$(mktemp -d)"
  chmod 700 "${docker_config}"
  export DOCKER_CONFIG="${docker_config}"
  printf '%s' "${REGISTRY_TOKEN}" \
    | docker login "${registry}" --username coilyco-ops --password-stdin
  docker pull --quiet "${image}"
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
      --env CYPRESS_INSTALL_BINARY=0 \
      --env FORGEJO_ACTIONS=true \
      --env GITHUB_ACTIONS=true \
      --env GITHUB_REF="${GITHUB_REF:-}" \
      --env GITHUB_REPOSITORY="${GITHUB_REPOSITORY:-}" \
      --env GITHUB_SHA="${GITHUB_SHA:-}" \
      --env GITHUB_WORKSPACE=/workspace \
      --env HTTP_PROXY="${FORGEJO_EGRESS_PROXY}" \
      --env HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}" \
      --env NO_PROXY="${no_proxy_hosts}" \
      --env http_proxy="${FORGEJO_EGRESS_PROXY}" \
      --env https_proxy="${FORGEJO_EGRESS_PROXY}" \
      --env no_proxy="${no_proxy_hosts}" \
      --workdir /workspace \
      --entrypoint bash \
      "${image}" -ceu "${command}"
}

case "${1:-}" in
  test)
    prepare_docker
    pull_private_image "${node_image}"
    stream_checkout "${node_image}" '
      tar -xf -
      corepack enable
      pnpm install --frozen-lockfile
      git fetch origin
      ward exec build
      ward exec test-quick
    '
    ;;
  e2e)
    prepare_docker
    docker pull --quiet "${cypress_image}"
    stream_checkout "${cypress_image}" '
      tar -xf -
      corepack enable
      pnpm install --frozen-lockfile
      pnpm build
      pnpm test:e2e:ci
    '
    ;;
  scan)
    prepare_docker
    pull_private_image "${scan_image}"
    stream_checkout "${scan_image}" '
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
