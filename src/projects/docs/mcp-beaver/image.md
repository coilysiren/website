# Image and packaging

A single [`Dockerfile`](../Dockerfile) builds the one generic runtime image,
distroless and nonroot. The spec is mounted or COPYed in and named on the
command line, so the same binary drives every `.mcp.kdl`.

Building is a CI consequence of a landed commit. The `publish` job builds on
every push to `main` and publishes the private single-architecture image as
`forgejo.coilysiren.me/coilyco-flight-deck/mcp-beaver:<full-source-sha>`. One
image serves every guardfile and publishes only when runtime source changes.
The trusted deploy runner owns the package-write credential, verifies the
remote manifest, and hands the exact reference to deploy. Fleet consumers use a
separate read-only credential. See [ci.md](ci.md).

## Examples

- [`forgejo-issues.mcp.kdl`](../examples/forgejo-issues.mcp.kdl) - the worked
  hello world: five guarded issue tools scoped to `coilyco-*` and `kai`.
- [`skillsmp.mcp.kdl`](../examples/skillsmp.mcp.kdl) - two read tools over the
  SDK-backed transport.
- [`*.values.yaml`](../examples/) - auth-neutral chart values: a ClusterIP read
  surface and an optional NodePort write surface.
- [`upstream.values.yaml`](../examples/upstream.values.yaml) - an allowlisted
  upstream proxy with a co-located MCP container.

## Not yet built

- **`action` composition** - one tool chaining several ops, deferred until
  opcore exposes a composed chain.
- **Tool-name disambiguation** - `verb_resource` is lossy when a resource
  carries its own separator, and unprefixed across multiply-mounted servers. A
  naming follow-up, not a guard concern.

See also: [chart.md](chart.md).
