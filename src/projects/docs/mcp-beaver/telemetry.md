# Opt-in OpenTelemetry

Application-level traces and metrics for every spec-backed, SSM, and
upstream-proxy server. Standard `OTEL_*` variables own configuration. With no
explicit exporter selector or OTLP endpoint, provider initialization stays a
no-network no-op. `OTEL_SDK_DISABLED=true` and the per-signal `none` selectors
disable export explicitly. Invalid explicit configuration fails startup, while
asynchronous export failures never alter a tool result.

- **MCP server** - one SERVER span and one `mcp.server.operation.duration`
  measurement per request or notification. `tools/call` carries
  `gen_ai.operation.name=execute_tool` and the bounded tool name. Tool-error
  results set `error.type=tool_error` and ERROR status.
- **Upstream MCP client** - `serve-upstream` emits CLIENT spans and
  `mcp.client.operation.duration` across startup discovery, schema refresh, and
  tool calls. W3C trace context and baggage inject into upstream
  `params._meta`, preserving the server-to-client chain.
- **Context boundary** - inbound `params._meta` supplies the remote MCP parent.
  The active streamable-HTTP transport span is linked when it is distinct.
- **Direct HTTP tools** - `POST /api/{tool-name}` receives standard HTTP server
  telemetry and exactly one logical `execute_tool <tool-name>` child span. MCP
  `tools/call` does not duplicate it. `/healthz` is excluded.
- **Resource and lifecycle** - the resolved MCP server name is the default
  `service.name`, overridable through `OTEL_SERVICE_NAME` and
  `OTEL_RESOURCE_ATTRIBUTES`. Graceful shutdown flushes providers within five
  seconds.

## What never crosses

Signal attributes stay bounded to methods, projected tools, transport, runtime
mode, and closed-set error classes. Arguments, results, bodies, authorization
headers, tokens, Guardfile contents, spec paths, and upstream URLs are never
captured.

Structured logs are the one narrow exception, and only for a refusal reason:
they keep the upstream host and path so a failure is attributable, and drop the
query, which is where `pin` and caller input live. Startup logs name the spec
path, which the operator supplied.
