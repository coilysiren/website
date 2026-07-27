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

The main-only
[`publish-image.yml`](../.forgejo/workflows/publish-image.yml) workflow builds
the checked-out source commit and publishes this private single-architecture
image:

```text
forgejo.coilysiren.me/coilysiren/website:<full-source-sha>
```

The trusted deploy runner supplies a package-write token. The script keeps its
Docker configuration temporary, pushes no moving tag, and proves the remote
manifest exists before the job passes. The package stays private by intent.
Its single-architecture and small nginx runtime shape avoid the concurrent
manifest race and large-upload path tracked by infrastructure#552, #624, and
#646.

The
[coilyco-bridge/deploy](https://forgejo.coilysiren.me/coilyco-bridge/deploy)
repository owns the separate package-read pull Secret, Kubernetes resources,
DNS, TLS, rollout, and rollback. This repository contains no cluster
credentials or manifests.

## Local verification

Ward exposes the container checks through the repository command boundary:

```text
ward exec image-build
ward exec image-smoke
ward exec image-publish-check
```

The image build uses `https://api.coilysiren.me` for browser API calls unless
the deploy build supplies a different `GATSBY_API_URL` build argument. Gatsby
metadata keeps `https://coilysiren.me` as the canonical site URL on both
hosts.
