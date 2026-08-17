# Staging ownership

Who owns the staging surface and what each side may change.

This repository owns the build contract:

* [Dockerfile](../Dockerfile) builds the locked Eleventy project with Node 24
  and pnpm, then copies `dist/` into unprivileged nginx.
* [nginx.conf](../nginx.conf) serves static routes on port 8080, preserves the
  permanent redirect set, and returns the designed `404.html` with HTTP 404.
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
