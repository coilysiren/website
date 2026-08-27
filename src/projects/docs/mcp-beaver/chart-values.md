# Chart values

The values reference for [chart.md](chart.md).

## Spec and upstream

- **`runtime.mode`** - `spec` by default, or `upstream`.
- **`runtime.injectSecrets`** - inject generated secrets into the mcp-beaver
  container. Disable when only a co-located upstream needs them.
- **`spec`** - the guardfile body, supplied with `--set-file`. Written to a
  ConfigMap at `/spec/<specName>.mcp.kdl`. Empty by default so a spec-mode
  render fails loud. **`specName`** defaults to the release name.
- **`upstream.url`** - required in upstream mode. **`upstream.tools`** is the
  exact allowlist and needs at least one entry. **`upstream.name`** defaults to
  the release fullname, **`upstream.connectTimeout`** is `2m`, and
  **`upstream.headers`** carries credentials to an authenticated upstream as
  `<name>=<template>` resolved in the container. See [upstream.md](upstream.md).
- **`extraContainers`** - optional co-located containers, appended in **both**
  modes. A loopback-only upstream keeps its unfiltered surface off the network.

## Image, secrets, service, pod

- **`image.repository`** defaults to the canonical Forgejo OCI path,
  **`image.tag`** to `.Chart.appVersion` with a rollout setting the built runtime
  sha, and **`image.pullPolicy`** to `Always`. A private-package consumer names
  its read-only credential in **`imagePullSecrets`**.
- **`secret`** maps `ENV_VAR` to a source, one per `value env <VAR>` the
  guardfile names. A string is an SSM parameter path and the chart mints an
  ExternalSecret; a map `{secretName, key}` references an existing Secret.
  **`externalSecret.refreshInterval`** and **`.secretStoreRef`** pick the store,
  `aws-parameter-store` by default.
- **`service.type`** is `ClusterIP`. Setting **`service.nodePort`** binds a
  direct node port, and the consuming deployment protects it.
- **`replicaCount`, `resources`, `nodeSelector`, `tolerations`, `affinity`,
  `podSecurityContext`, `securityContext`, the three probes, `extraEnv`** are the
  usual knobs. The startup probe keeps upstream warmup off the liveness path.

**Telemetry.** The chart carries no collector endpoint or fleet service identity. Opt in
through `extraEnv` with the standard `OTEL_*` variables. Leaving all selectors
and endpoints unset keeps startup a no-network no-op. See [telemetry.md](telemetry.md).
