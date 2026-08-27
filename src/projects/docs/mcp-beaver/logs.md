# Structured logs

Every generated server writes JSON to stderr, one object per line, through
`log/slog`. The node collector reads `/var/log/pods/*` and the ingest pipeline
promotes JSON bodies and maps `level` onto OTel severity, so this needs no new
parser downstream.

Generated servers previously emitted one line each, the startup banner, and
nothing per call. Twelve hours across twenty-two pods produced one log line
fleet-wide while four of those servers were failing every call.

- **Startup** - mode, server name, spec path, bound address, tool count, and
  request timeout, as fields rather than a sentence.
- **Every tool call** - `tool`, `outcome`, `duration_ms`, plus `trace_id` and
  `span_id` when a span is active, so a log line joins to its trace. Applied at
  registration, so grants, the info tool, withheld stubs, the SSM readers, and
  the upstream proxy are covered by construction.
- **Refusals** - `outcome=tool_error` at WARN with the reason. A handler
  failure is `outcome=handler_error` at ERROR.
- **Level** - `MCP_BEAVER_LOG_LEVEL` (`debug`, `info`, `warn`, `error`),
  defaulting to info.

## Redaction

A reason keeps each URL's scheme, host, and path and drops its query, marked
`?<redacted>` rather than silently removed. `pin` writes query parameters and
only query parameters and `auth` writes a header, so dropping the query removes
those two surfaces while a 404 stays attributable.

Reasons are bounded at 512 characters, so an upstream refusing with an HTML
error page cannot put the page in the log line.

Telegram's base is `https://api.telegram.org/bot<token>`, so a base-url path is
a third surface a credential reaches (`infrastructure#708`). The runtime resolves
that URL once at startup, best effort, and masks its path in the log line **and**
in the error handed to the caller, which was its unredacted twin. The whole
prefix goes: a token-shaped pattern would hold only until an upstream formatted
its credential differently, then fail silently.

See also: [telemetry.md](telemetry.md).
