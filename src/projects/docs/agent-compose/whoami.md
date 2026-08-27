# whoami and short ids

What an agent reports about itself, and the short-id scheme behind it.

## What this session calls itself

`acompose whoami` prints the composed name for the calling session:

```text
Angie [she] uz86
```

Nothing else on stdout, so a shell hook can use it without parsing. Silence
means no composition applies.

### How the session is resolved

A native launch exports `AGENT_COMPOSE_SESSION_BUNDLE` and
`AGENT_COMPOSE_SESSION_LAYOUT` into the harness process, naming the bundle it
composed and the seat selector it projected. `whoami` and the status line read
that pair first, and both fall back to walking up from the working directory for
the nearest projection.

The binding exists because a path walk is a filesystem proxy for session
identity, and the proxy breaks two ordinary ways:

* A native session shadow is a per-session temporary tree with no projection
  above it, so the walk finds nothing and the answer is empty.
* The host projection is global rather than per session, so two concurrent roles
  on one host both resolve to whichever converged last.

An explicit `--target` is an inspection request, so it keeps the walk and reports
what sits at that path. Both variables travel together: a half-set pair is not a
binding and the walk still runs.

### Why it exists

A SessionStart hook has to tell an agent what it is called. Before this, the
caller computed a name of its own - harness, OS, host, a tag sliced out of the
raw session UUID - which produced a second naming scheme that agreed with
nothing. It could not know the composed seat, so an agent introduced itself as
one thing and its status line said another.

`whoami` makes the composition the single answer. It is the same seat label the
[status line](statusline.md) renders, from the same bundle manifest, so the two
surfaces cannot disagree.

### Silence rather than a guess

Outside a projection there is no composed name, and `whoami` prints nothing.

That is deliberate. A session with no composition genuinely has no composed
identity, and synthesising one is exactly what the retired local computation did
wrong - it always produced a name, so a caller could never tell a real identity
from a fabricated one. A hook that wants a fallback can supply its own, knowing
it is a fallback.

### What it carries

* The seat name and subject pronoun from the selected bundle.
* The session [short id](whoami.md) when one is in scope.

It does **not** carry the role. The status-line row already names the role as
`role@harness`, and the bundle manifest stores the role slug rather than a
display name, so a paren here would either restate the slug or need a bundle
format change for cosmetics.

## The dictatable short id

Terminal surfaces append the running session's short id to the rendered name:

```text
Angie [she] (Engineer) uz86
```

Four characters, two letters then two digits, over an alphabet that drops the
visually and phonetically confusable ones (`i l n o`, `0 1 2 3`).

### Where the contract lives

The shape and alphabet come from the archived o2r channel protocol. agentic-os
holds the canonical definition in `agentic_os/agent_id.py`, with a
cross-language vector file pinning it, and `aos` mints session ids from the same
contract in `aos-cli/native_shadow.go`.

Agent Compose duplicates two constants rather than taking a dependency in the
wrong direction, because it only ever needs to **recognise** an id. If the
alphabet changes upstream, `internal/agentid` is the second place to edit.

### Read, never minted

Agent Compose reads `AOS_NATIVE_SESSION` and never generates an id.

The status line re-renders on every tick, so a freshly minted id would differ
each time and label nothing, which is worse than showing none. A seeded id would
need a stable seed this process does not have. The session id is already unique
per agent, already dictatable, and already names the shadow directory the agent
works in, so reading it keeps every surface agreeing with `aos`.

Outside a native session there is no id, and every surface renders exactly what
it rendered before. A value that is set but malformed is dropped rather than
shown: displaying a non-dictatable id breaks the alphabet's only promise.

### Ephemeral surfaces only

The id reaches the status-line session row and the launch `--name` flag. Both
are computed per tick or per launch.

It is deliberately kept out of overlay documents and nativeui settings. Those
are written once and read by later sessions, and the bundle cache key hashes the
rendered instructions, so an id baked into either would name the wrong agent on
reuse and fork the cache per session. `TestShortIDNeverReachesPersistedBundleArtifacts`
walks the whole bundle directory to hold that line.

### Why the subagent rows omit it

The id names the session. Every row in one agent panel would repeat the same
four characters and disambiguate nothing. Where it earns its place is telling
two concurrently running sessions apart, and that is the session row.
