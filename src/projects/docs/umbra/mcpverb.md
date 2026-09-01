# the mcp dialect (mcpverb)

The third transport a merged binary speaks, beside the spec dialect ([specverb](specverb.md)) and the exec dialect ([execverb](execverb.md)). One `can call` grant becomes one guarded leaf that fires `tools/call` against a declared upstream MCP server.

```kdl
wrap aosguard ops forgejo {
    mcp stdio {
        command "npx"
        argv "-y" "@example/forgejo-mcp"
        env "FORGEJO_TOKEN" { value ssm "/forgejo/api-token" }
    }
    restrict owner matches "coilyco-*"
    can call list_issue
    can call create_issue {
        deny title matches "(?i)^test"
        fail-when "number == null"
    }
    never call delete_repository
}
```

The remote transport takes a `url` and the ordinary `auth` block instead:

```kdl
    mcp http {
        url "https://host/mcp"
        auth header-token { header Authorization; prefix "Bearer "; value env "TOK" }
    }
```

## Why this is not a wrapper around an MCP client

Every guard umbra has sits **above** transport. `opcore.Operation.Execute` grows a third branch next to the `sql` grant: an mcp leaf leaves before the HTTP floor and rejoins at the response postcondition. So `restrict`, `fail-when`, the destructive marking, the audit row, and the exit-code taxonomy all apply to a tool call unchanged, because none of them ever touched HTTP.

A general MCP client calls tools. It has no policy, no audit row, no postcondition, and nothing that makes an undeclared tool unreachable.

## The surface is the lock, not the live server

`umbra lock` connects, runs `tools/list`, prunes to the granted tools, and writes `<binary>.tools.lock.json.gz`. Mounting reads that lock and never reaches the network, so a build is offline and a tool added upstream since the lock is **not** mounted.

`umbra skew` prunes live upstream the same way and diffs, exiting 3 on drift. It reports a tool that went away, one that appeared inside the granted surface, and one whose input schema, output schema, `_meta`, annotations, description, or title moved. **Nothing else locks MCP tool schemas**, so nothing else can tell you one changed rather than print what it is today.

`_meta` is preserved verbatim through the lock rather than parsed. MCP Apps addresses its widget at `_meta.ui`, and a lock that dropped unknown keys would lose that silently. It is part of the compared value, so a widget that repoints is drift. What it may call back: [mcpapps.md](mcpapps.md).

## Grants

- **`can call <tool>`** - mount one leaf. The upstream tool name is exact.
- **`can call *`** - mount every tool the lock holds. It expands over the **lock**, never live upstream. An explicit grant for the same tool wins whichever sentence was authored first, so a narrower policy cannot be lost to authoring order.
- **`never` / `cannot call <tool>`** - the tool is **absent**, not mounted as a leaf that refuses. A denied tool that exists still costs an agent's context and still invites the call. Same rule as [descriptors](specverb-descriptors.md).
- **grant body** - `name` overrides the leaf name, `describe` overrides the upstream description, `destructive` marks an irreversible leaf (MCP has no verb to infer it from), `fail-when` is a JMESPath postcondition over the result, and `allow` / `deny` / `post-call` are regex guards.

A tool both granted and denied is a parse error rather than a silently resolved contradiction, and a deny carrying guards is refused because it mounts nothing for them to bind to.

## Guards

`allow` and `deny` match one named argument before the call, `post-call` matches one field of the result after it. Every guard reads the same direction: **matching means the call does not pass**. `deny` refuses on a match, `allow` is an allowlist so a guarded argument matching nothing is refused, and `post-call` refuses a response that matches.

Selectors are checked against the **locked tool's own arguments** at build time. This is the one place the dialect deliberately diverges from the [inline grammar](opcore-inline.md), whose selectors come from a fixed vocabulary because nothing there knows the tool. A misspelled selector fails the build here rather than compiling into a rule that matches nothing and reads like a guard that passed.

A regex that does not compile is a parse error, for the same reason.

## Leaves and flags

An MCP tool name is a flat identifier, so it lowers to one kebab-case leaf directly under the wrap group: `list_issue` becomes `aosguard ops forgejo list-issue`. There is no resource/verb pair to resolve, and no positional argument to place.

Every tool input is a flag, typed from the locked input schema, sorted by name so generated help and the lock stay stable. An `enum` reaches the flag's help text, since it is the constraint a caller cannot infer from the type. A nested object arrives as JSON in a single flag. `restrict` gates the bound arguments, which is this dialect's equivalent of the path segments it gates elsewhere.

## Serving the granted surface

`mcpverb.ServedTools` projects the same grants into the tool definitions a server advertises, for a consumer that serves them. umbra builds that surface and does not serve it. See [mcpverb-serving.md](mcpverb-serving.md).

## Credentials and the stdio spawn

A stdio upstream takes its secrets through `env`, never `argv`, because argv is readable by any local process. An http upstream uses the ordinary `auth` block, `header-token` or `bearer`. Both stay symbolic in the parse and resolve per call, so a rotated credential needs no rebuild.

**umbra reads a token, it does not go and get one.** MCP's own auth story is OAuth 2.1 `authorization_code` with a browser round-trip and refresh-token storage, and umbra has neither an interactive flow nor anywhere to keep a rotating secret. Any upstream whose credential is already a value somewhere works today; one that only offers the browser flow needs a token minted outside and named through a value chain. [umbra#340](https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/issues/340) holds that decision.

So a refusal says which of the two it is, rather than the SDK's bare `Unauthorized`:

```
mcpclient: connect api (https://host/mcp): the upstream refused the credential
(HTTP 401); this `mcp http` block declares no `auth`. It advertises OAuth, which
umbra does not acquire: supply an already-minted token through
`auth bearer { value ... }`
```

It distinguishes a credential that was never configured from one that resolved and was rejected, and it says when the server asked for OAuth. A 500 gets none of that, because sending an operator after a token that was never the problem is worse than saying nothing.

**A stdio transport starts a subprocess**, so its command and argv go through `pkg/policy`'s shell-metacharacter check, the same gate every other umbra exec passes. A spawn does not get a weaker gate for arriving through the request surface. The client itself lives in `pkg/mcpclient` rather than a surface, because it expresses no permission.

## Cost per invocation

Each invocation opens a session and closes it, so there is no keep-alive daemon and a stdio child never outlives the call that wanted it. Measured numbers and what they settled: [mcpverb-cost.md](mcpverb-cost.md).

## What this is not

There is no OAuth browser flow, no editor config import, and no aggregating proxy: those are [umbra#336](https://forgejo.coilysiren.me/coilyco-flight-deck/umbra/issues/336)'s deliberate non-goals.

## See also

- [umbra-cli.md](umbra-cli.md) - the driver, its five verbs, and mixed transports.
- [mcpverb-cost.md](mcpverb-cost.md) - what a call costs, and why there is no daemon.
- [specverb-descriptors.md](specverb-descriptors.md) - the deny-by-absence rule this inherits.
- [mcpverb-serving.md](mcpverb-serving.md) - projecting the same grants into a served surface.
- [mcpapps.md](mcpapps.md) - the MCP Apps host and its `widget` block.
- [opcore-inline.md](opcore-inline.md) - the inline grammar's own proxy grants.
