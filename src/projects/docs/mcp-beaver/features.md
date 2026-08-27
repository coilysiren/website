# Features

What mcp-beaver ships today. It turns a umbra Guardfile into a guarded MCP
server with a matching HTTP tool API, distributed as one runtime image plus a
generic Helm chart.

## Commands

- [serve.md](serve.md) - the generic runtime, grant-to-tool projection.
- [lint.md](lint.md) - offline validation, and `lint-upstream`.
- [upstream.md](upstream.md) - the guarded passthrough proxy, and the
  credential it presents to an authenticated upstream.
- [ssm.md](ssm.md) - the exact-parameter AWS reader.
- [s3.md](s3.md) - the asset publisher, and the one write-capable mode.

## Guardfile surface

- [guardfile-siblings.md](guardfile-siblings.md) - instructions, resources,
  prompts, server-info.
- [guardfile-controls.md](guardfile-controls.md) - pins, rate limit, cache,
  withheld verbs, confirmations.
- [extraction.md](extraction.md) - reading a PDF or feed an upstream returns.
- [upstream-pins.md](upstream-pins.md) - server-side argument pinning.

## Runtime

- [transports.md](transports.md) - streamable HTTP, the HTTP tool API, health.
- [conformance.md](conformance.md) - MCP 2026-07-28.
- [request-bounds.md](request-bounds.md) - deadlines and connection guards.
- [refusals.md](refusals.md) - an undeclared argument is refused, and a
  credential in a base-url path is never emitted.
- [conformance.md](conformance.md) - `/admin` describe and reload.
- [logs.md](logs.md) - structured logs and redaction.
- [telemetry.md](telemetry.md) - opt-in OpenTelemetry.

**Distribution.** - [image.md](image.md), [ci.md](ci.md), [chart.md](chart.md),
  [chart-values.md](chart-values.md).
- [DESIGN.md](DESIGN.md) - why it is shaped this way.

## See also

- [README.md](../README.md), [AGENTS.md](../AGENTS.md),
  [.ward/ward.yaml](../.ward/ward.yaml).
