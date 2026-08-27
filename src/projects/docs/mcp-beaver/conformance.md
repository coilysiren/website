# MCP 2026-07-28 conformance

- **Stateless transport** - the streamable HTTP handler is stateless, which the
  current revision requires. A session-backed handler rejects a 2026-07-28
  client outright. Pre-2026 clients still negotiate their own version.
- **Cacheable lists** - list results carry `ttlMs` and `cacheScope`. A
  spec-driven surface changes only when the pod restarts and gets the longer
  hint. A proxied surface mirrors a drifting upstream and gets the shorter one.
- **Deprecations** - the runtime no longer advertises the deprecated `logging`
  capability. Observability is OpenTelemetry, which it already emits.

## Supported methods

`initialize`, `notifications/initialized`, `notifications/cancelled`, `ping`,
`tools/list`, `tools/call`, `prompts/list`, `prompts/get`, `resources/list`,
`resources/read`, `resources/templates/list`, and the 2026-07-28
`server/discover` and `subscriptions/listen`. Resource and prompt support rides
that generic surface and adds no runtime specific admin, lifecycle, reload, or
control verb. That constraint is the one to preserve as the surface grows:
operator control stays on the `/admin` endpoints, off the protocol.

## Operator HTTP

Non-MCP endpoints for runtime inspection and control. These are HTTP surfaces
for operators, not MCP tools.

- **Describe** - `GET /admin/describe` returns the loaded guardfile name and
  path, projected tool count, transport mode, upstream presence, and safe
  non-secret config facts.
- **Reload** - `POST /admin/reload` is explicit but currently restart-only. The
  runtime cannot safely hot-reload its guarded state in place, so the endpoint
  reports restart required instead.

Operator control stays here, off the protocol. Resource and prompt support
rides the generic MCP surface and adds no runtime-specific admin, lifecycle,
reload, or control verb, and that constraint is the one to preserve as the
surface grows.

See also: [transports.md](transports.md).
