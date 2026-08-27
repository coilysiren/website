# Guardfile siblings: context

Top-level nodes stated beside `wrap`, outside the frozen inline grammar
`opcore.ParseInline` owns. Each fails closed on an unknown property or child.
All are opt-in except `server-info`, which is on by default and opts out.
Controls are in [guardfile-controls.md](guardfile-controls.md).

## Instructions

`instructions { text ... }` states what this server is for, published under the
shared policy sentence in `InitializeResult.Instructions`. Bounded at 500
characters, because a consumer rendering this into the model's prompt pays for
it every turn, once per rostered server. A guardfile declaring nothing
publishes exactly what it published before.

## Resources

`resource "<name>" uri=... { text ... }` serves static content on
`resources/read`. Inline only by design: a resource proxying an upstream read
would be a second, unguarded egress path beside the grants. Claude Code
surfaces these as `@` mentions. `audience "assistant"` and `priority=0.9` emit
the MCP annotations a harness gates on when pulling a resource into context
unprompted, so stating no audience means no harness includes it, and `lint`
warns.

**Prompts.** `prompt "<name>" { argument ...; text ... }` serves a message template on
`prompts/get` with `{arg}` substitution. A missing required argument is an
error, since a half-filled prompt reads as a complete one. Claude Code surfaces
these as slash commands.

## Server info

One read-only tool reporting the server's identity, mode, and tool inventory.
It reaches no upstream and restores the liveness probe 2026-07-28 removed with
`ping`. On by default: every field is already reachable through `initialize`
and the list methods, and a probe present on only some servers lets an agent
read no meaning from its absence on the rest. `server-info name="status"`
renames it, `server-info disabled` removes it. It counts itself, so `lint` and
`tools/list` report the same surface.
