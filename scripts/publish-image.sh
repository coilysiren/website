#!/usr/bin/env bash
set -euo pipefail

registry="forgejo.coilysiren.me"
image_name="coilysiren/website"

if [ -z "${REGISTRY_TOKEN:-}" ]; then
  echo "REGISTRY_TOKEN is required for the trusted image-publish lane." >&2
  exit 1
fi
if [ -z "${FORGEJO_EGRESS_PROXY:-}" ]; then
  echo "FORGEJO_EGRESS_PROXY is required for the Website dependency build." >&2
  exit 1
fi

sha="${GITHUB_SHA:-$(git rev-parse HEAD)}"
case "${sha}" in
  *[!0-9a-f]*|"")
    echo "website source sha is not a lowercase hexadecimal commit id." >&2
    exit 1
    ;;
esac
if [ "${#sha}" -ne 40 ]; then
  echo "website source sha must be a full 40-character commit id." >&2
  exit 1
fi

image="${registry}/${image_name}:${sha}"
docker_config="$(mktemp -d)"
trap 'rm -rf "${docker_config}"' EXIT
chmod 700 "${docker_config}"
export DOCKER_CONFIG="${docker_config}"

printf '%s' "${REGISTRY_TOKEN}" \
  | docker login "${registry}" --username coilyco-ops --password-stdin

echo "==> building ${image}"
docker build \
  --pull \
  --build-arg HTTP_PROXY="${FORGEJO_EGRESS_PROXY}" \
  --build-arg HTTPS_PROXY="${FORGEJO_EGRESS_PROXY}" \
  -t "${image}" \
  .

echo "==> publishing ${image}"
docker push "${image}"

docker manifest inspect "${image}" >/dev/null
echo "verified immutable manifest ${image}"
