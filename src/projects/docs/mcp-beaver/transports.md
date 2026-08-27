# Transports

The runtime exposes the SDK-backed streamable HTTP transport, an automatic HTTP
tool API, and a liveness probe.

- **Streamable HTTP** (`/mcp`, SDK-backed) - `initialize`, `tools/list`, and
  `tools/call` ride the MCP Go SDK's session lifecycle and session IDs.
- **Automatic HTTP tool API** (`POST /api/{tool-name}`) - every projected MCP
  tool receives one matching endpoint without a flag or chart value. The JSON
  request body is the tool argument object, and a successful response is the
  MCP `CallToolResult` JSON shape. Both surfaces call the same handler, so
  opcore guards, upstream schema-drift checks, and exact-parameter SDK policy
  cannot diverge. Requests require `application/json` and are bounded to 1 MiB.
  Unknown tools, invalid inputs, oversized bodies, tool errors, and handler
  errors return non-2xx JSON.
- **Health** - `GET /healthz` for a pod liveness probe.

## The authentication boundary

mcp-beaver does not authenticate inbound MCP or HTTP callers. The consuming
deployment owns identity, authentication, TLS, ingress, and network exposure.

Guardfile authentication is **outbound** authentication from mcp-beaver to the
configured upstream. Caller-supplied identity-shaped tool arguments are data,
not trusted identity.

See also: [chart.md](chart.md), [conformance.md](conformance.md).
