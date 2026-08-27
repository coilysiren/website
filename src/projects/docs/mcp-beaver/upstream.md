# The guarded passthrough proxy

`mcp-beaver serve-upstream --upstream <mcp-url> --tool <name>...` connects to a
streamable-HTTP MCP upstream, snapshots the allowlisted upstream tool contracts,
and exposes only that subset on the outward MCP and HTTP surfaces.

- **Projection** - each allowlisted upstream tool becomes one outward MCP tool
  and one matching HTTP endpoint, preserving the upstream schema, title,
  annotations, and results rather than reclassifying them.
- **Fail closed** - unknown upstream tools and schema drift return MCP tool
  errors instead of silently widening or mutating the surface.
- **One session** - allowed calls forward to a single long-lived upstream MCP
  session, drift check included, because real Node upstreams reject a second.
- **The upstream session is its own** - its standalone stream stays open, since
  an upstream may answer a `tools/call` there (#80), and a caller's values never
  cross: the SDK prefers their context protocol version over the session's, so a
  caller newer than the upstream made every request carry one it rejects (#85).
- **Session survival** - the upstream bound is time-to-first-byte, never a
  whole-exchange `Client.Timeout`: a streamable-HTTP response stays open and a
  whole-exchange bound took the session with it. A forgotten session is replaced
  next call, the failing one never replayed, the baseline never re-snapshotted.
- **Bounded startup retry** - `--connect-timeout` retries the initial connection
  while a co-located upstream starts. Zero retains fail-fast.
- **Upstream credentials** - `--upstream-header 'Authorization=Bearer
  {env:TOKEN}'` presents a header per request, which a hosted third-party MCP
  needs and a loopback sidecar never did. A `{provider:address}` span resolves
  through umbra's registry, the rest is literal, and one span is required since
  a span-free template puts the value in argv. It resolves per request like
  spec-mode `auth`, once more at startup to fail fast, and never into an error.

**mcp-beaver lint-upstream --tool <name>....** The validation surface for an allowlist, calling the serving path's own
`ValidateAllowlist` so the check cannot drift. Empty entries, duplicates, and an
empty list fail. Offline by default, so it runs in CI and a sealed clone, and a
clean run exits 0 and prints the names sorted. `--read-only heuristic` screens names for
mutation verbs offline, a heuristic living in the owning loader rather than
restated per consumer. `--read-only strict` needs `--upstream`, connects, and
fails any tool the upstream leaves un-annotated by `readOnlyHint`, so it belongs
in a rollout or smoke path. `--upstream` builds the same proxy `serve-upstream`
builds, so an absent tool fails here too and `--upstream-header` reaches an
authenticated one.
