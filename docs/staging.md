# Staging image

The repository ships a static container image for the
<https://website.coilysiren.me> staging site. The canonical
<https://coilysiren.me> site remains on Netlify.

## Ownership

This repository owns the build contract:

* [Dockerfile](../Dockerfile) builds the locked Gatsby project with Node 24 and
  pnpm, then copies `public/` into unprivileged nginx.
* [nginx.conf](../nginx.conf) serves Gatsby routes on port 8080.
* [`.dockerignore`](../.dockerignore) keeps local output, credentials, and
  repository metadata outside the build context.

The
[coilyco-bridge/deploy](https://forgejo.coilysiren.me/coilyco-bridge/deploy)
repository owns image publication, Kubernetes resources, DNS, TLS, rollout,
and rollback. This repository contains no cluster credentials or manifests.

## Local verification

Ward exposes the container checks through the repository command boundary:

```text
ward exec image-build
ward exec image-smoke
```

The image build uses `https://api.coilysiren.me` for browser API calls unless
the deploy build supplies a different `GATSBY_API_URL` build argument. Gatsby
metadata keeps `https://coilysiren.me` as the canonical site URL on both
hosts.
