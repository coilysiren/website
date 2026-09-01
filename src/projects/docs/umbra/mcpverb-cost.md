# what an mcp call costs

Each invocation of a generated binary opens a session to the upstream and closes it. There is no keep-alive daemon, and a stdio child never outlives the call that wanted it.

[umbra#336](https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/issues/336) deferred that daemon on the condition the cost be measured first. It was, in [umbra#338](https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/issues/338), and the daemon is not warranted.

## Measured

p50 of ten runs each, M-series mac:

- **45 ms** - `--help`, the binary's own floor, contacting nothing.
- **100 ms** - an http upstream on the LAN. No spawn.
- **271 ms** - a stdio upstream started as `node server.js`, package already installed.
- **1559 ms** - the same server as `npx -y <package>`, which re-resolves it every run.

So a stdio call costs roughly **170 ms over the floor**, most of it the language runtime starting.

## The npx figure is npx's

`npx -y` re-resolves the package from the registry on every invocation. Name an installed binary in the guardfile instead and that 1.3 s goes away. This is a guardfile-authoring point, not something to engineer around.

## The close wait, which was the whole problem

`Close` bounds its wait for the child to exit at **100 ms** before SIGTERM, rather than the SDK's 5 s default.

That default is an upper bound only for a server that exits when its stdin closes. One that does not makes the caller pay all 5 s, every call, after it already holds its answer. The MCP reference server does not exit, and stdio calls cost 5.2 s until this was set.

100 ms is the trade: short enough not to dominate a call, long enough for a well-behaved server to exit cleanly rather than be signalled.

## Why no daemon

170 ms over a floor the binary pays anyway does not buy a supervised background process inside a policy engine. A daemon would add a lifetime, a socket, a stale-session failure mode, and a second thing to reason about when a call is refused.

If a future upstream makes this false, the number to beat is on this page rather than in someone's memory.

## See also

- [mcpverb.md](mcpverb.md) - the dialect and its guards.
