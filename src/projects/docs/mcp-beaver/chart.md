# The mcp-beaver Helm chart

The auth-neutral distribution vehicle. One chart, one runtime image, many
releases. It mounts a `.mcp.kdl` guardfile or wraps an existing
streamable-HTTP MCP with an exact tool allowlist, so adding an MCP runtime
becomes a values file plus `helm upgrade`.

```sh
helm upgrade --install skillsmp mcp-beaver \
  -f skillsmp.values.yaml \
  --set-file spec=skillsmp.mcp.kdl \
  --set image.tag=<built-runtime-sha>
```

The chart stays generic and spec-opaque: it takes the `.mcp.kdl` as an opaque
blob and never parses it, so the interior-only scope of the spec is preserved.
The spec never reaches down into a chart, and the chart never reaches up into
the spec. `deploy` composes this runtime contract with its fleet-specific
exposure charts and owns rollout.

## What it templates

- `configmap-spec.yaml` renders only in spec mode, mounting the `.mcp.kdl` at
  `/spec/<name>.mcp.kdl`.
- `deployment.yaml` renders the runtime in spec or upstream mode, injects
  application tokens when requested, and appends optional co-located
  containers.
- `service.yaml` renders a ClusterIP, or a NodePort when `service.nodePort` is
  set.
- `externalsecret.yaml` pulls each SSM-path `secret` entry into the environment
  variable named by the guardfile.

It renders no Ingress, authentication proxy, identity-provider integration,
certificate, DNS record, or RFC 9728 metadata endpoint. The consuming
deployment owns those.

See also: [chart-values.md](chart-values.md), [transports.md](transports.md).
