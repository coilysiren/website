# serving the granted surface

The [mcp dialect](mcpverb.md) mounts a guarded CLI over an upstream MCP server. `mcpverb.ServedTools` projects the same grants the other way: into the tool definitions a **server** advertises, for a consumer that wants to sit between an agent and that upstream.

```go
tools, rt, err := mcpverb.ServedTools(mcpverb.Config{Guardfile: gf, Tools: locked})
```

Each `ServedTool` carries the upstream tool name, its description, a draft-07 input schema rebuilt from the committed lock, `_meta` forwarded verbatim, and the `opcore.Descriptor` that executes a call.

## umbra builds this and does not serve it

Owning a transport, a session registry, and a process lifetime is a different job from gating a request, and it is the job the consumer already has. This is the same boundary that kept an aggregating proxy out of umbra in [umbra#336](https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/issues/336), so a served surface here would reopen a decision rather than extend one.

What umbra owes a serving consumer is the policy, the schema, and the guarded execution path. Not the socket.

## Two properties that carry over rather than being re-derived

**A served call runs through `opcore.Operation.Execute`**, the same entry a CLI leaf uses. So `restrict`, `fail-when`, the request guards, and the audit row are one implementation rather than two that can drift apart. A tool served and the same tool called from the shell refuse for identical reasons.

**The denied and the merely unnamed are both absent.** A served surface listing a tool it will refuse spends an agent's context teaching it a call it cannot make, which is the same argument the CLI projection makes in [descriptors](specverb-descriptors.md).

## The served name is the upstream name

A CLI leaf is kebab-cased for a shell (`list_issue` becomes `list-issue`). A served tool keeps `list_issue`, because the caller is speaking the protocol rather than typing.

## Schema fidelity

The lock's schema becomes typed flags and then a schema again. Everything umbra models survives that round trip: type, description, `enum`, numeric bounds, array element type, nested objects, and requiredness.

`enum` is the one worth naming. The CLI folds it into the flag's help text, which is right for a human reading `--help` and useless to an agent calling a served tool. A served schema that carried it only as prose would leave the tool callable but not correctly callable, so it is emitted structurally.

## See also

- [mcpverb.md](mcpverb.md) - the dialect, its guards, and the lock.
- [specverb-descriptors.md](specverb-descriptors.md) - the deny-by-absence rule both projections inherit.
