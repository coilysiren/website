# Request bounds

Nothing on this axis was bound before: `http.Server` was built with no
timeouts, the proxy client was nil (so `http.DefaultClient`, which has none),
and the SDK does not propagate HTTP cancellation to handlers by default. A
wedged upstream therefore held a request for as long as the caller would wait.

- **Per-call deadline** - `--request-timeout` (default 60s, 0 disables) bounds
  one tool call end to end, applied at the handler so it holds for the MCP
  transport and `POST /api/{tool-name}` alike, and for every protocol version.
  It rides the request context, so it aborts the outbound upstream call rather
  than only cutting the response.
- **Transport deadline** - the inbound request carries the per-call bound plus
  five seconds of headroom, so the tool always expires first and the runtime
  still has room to report the failure. Both expiring together produced an
  empty body, which reads as a crashed pod rather than a slow upstream.
- **Cancellation propagation** - a caller that goes away cancels the work.
  Applies to 2026-07-28 and later clients, which is why the per-call bound is
  not redundant with it.
- **Upstream client** - proxy mode bounds its own client at 45s when the caller
  supplied none, under the inbound deadline. A caller-set timeout is preserved.
  Spec mode was already bounded by opcore's 30s default client.
- **Connection guards** - 10s request-header timeout and a 120s idle timeout.
  No write timeout: it is absolute from the start of a request and would cut a
  legitimately slow upstream mid-response.
- **Attribution** - the MCP method, and the tool where there is one, are
  stamped on the transport span before dispatch, so a request that never
  returns still names what was in flight.

`/healthz` is exempt from every deadline: a liveness probe a wedged upstream
can fail turns one slow dependency into a restart loop.
