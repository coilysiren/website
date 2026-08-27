# Chart sidecars and upgrades

## Wrapping a co-located process

`extraContainers` works in both modes. The chart appends it to the pod's
container list with no mode condition, and only the runtime args, the `/spec`
volumeMount, and the volumes are mode-conditional. Only upstream mode was ever
documented, which made a supported shape look unavailable.

The two modes co-locate for different reasons:

- **Upstream mode** wraps a sidecar that already speaks MCP. `serve-upstream`
  snapshots its tool list at startup and proxies an allowlist.
- **Spec mode** wraps a sidecar that speaks plain HTTP JSON. There is no
  upstream MCP to snapshot, so `base-url` points at `127.0.0.1`, because
  containers in a pod share a network namespace. This is the shape for serving
  a bundled dataset, and it removes a whole class of external dependency: no
  third-party rate limit, no third-party uptime, no per-request caching.

## Upgrading a release installed as `ward-mcp`

The Deployment's `spec.selector` is immutable, so a release whose chart
`nameOverride` changes cannot be upgraded in place. Uninstall and reinstall, or
keep the old `nameOverride` on the existing release.

## Exposure belongs to the consumer

The chart renders no Ingress, identity provider, certificate, or DNS record.
A consuming deployment brings its own exposure layer, and `deploy`'s shared
`charts/ingress-public-authed` owns the CoilyCo fleet gate.

## Verify

`helm lint chart/` and `helm template` render both modes offline. A live
install is proved by `GET /healthz` and one `tools/list`.

See also: [chart.md](chart.md), [chart-values.md](chart-values.md).
