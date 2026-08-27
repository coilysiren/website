# Design

Tracking: coilysiren/inbox#164 (concept), coilyco-bridge/deploy#40 (first
consumer).

**A umbra Guardfile, no handwritten code, becomes a Docker image that serves a
working MCP and matching HTTP tool API.** The `.mcp.kdl` is the whole contract:
every `can` grant becomes one MCP tool and one `POST /api/{tool-name}`
endpoint, with method, path template, and typed params authored inline. No
per-server Go, no per-server Dockerfile, no per-server handler, and no per-tool
input schema, because the engine derives it from the inline op definition.

## Scope: the spec configures the image interior

The spec configures only which upstream API, how it authenticates, and which
grants become which tools. mcp-beaver's job ends at a runnable image.
Everything about **exposing** that image is out of scope: the Deployment,
Service and port mapping, the ingress or tailnet route, and injecting a token
as a mounted Secret. Those are templated by the generic chart mcp-beaver ships,
which `deploy` consumes per-MCP and rolls out. The image stays unaware of how
it is deployed: the spec never reaches down into a chart, and the chart treats
the `.mcp.kdl` as opaque values it mounts and never parses.

## Network HTTP, never stdio

These servers run always-on and are reached by URL. A remote pod cannot be
driven over stdio, which co-locates server with client, so the interior always
binds one HTTP listener. There is no transport fork to decide.

## Built on umbra

mcp-beaver shares no code with ward, whose name it used to carry. The `ward` in
`wrap ward mcp <name>` is umbra's inline grammar, not a dependency, and it
moves when umbra moves. cli-mcp is read as a code reference only; transport and
session plumbing is the official MCP Go SDK. umbra turns a Guardfile into a
guarded surface in three layers: the upstream spec (here, the `.mcp.kdl`
itself), the compiled policy IR, and the human KDL authoring layer, parsed and
never evaluated. The engine carries zero upstream knowledge, so one engine
drives every spec. umbra's own driver renders it into a CLI, and mcp-beaver
renders the same operation set into MCP tools.
