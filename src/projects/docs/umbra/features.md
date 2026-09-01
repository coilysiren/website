# umbra features

Inventory of umbra today, grouped by **guarded surface** over a shared `pkg/`. See [architecture.md](architecture.md); each primitive ships a runnable `examples/<name>/`. Dev verbs run through the `Makefile`; release is automated and Forgejo-canonical, with commit-scoped draft tags on `main` ([release-pipeline.md](release-pipeline.md)).

## CLI exec surface (`cli/`)

- **execverb** - Exec-dialect KDL verbs, complex actions, and inspect lists. See [execverb.md](execverb.md).
- **verb** - Middleware wrapping every `*cli.Command.Action` in the validate -> execute -> audit pipeline, with audited argv and env injection.

## HTTP request surface (`http/`)

- **specverb / guardfile** - Spec-driven verbs: [resolution](specverb-resolution.md), [policy](specverb-policy.md), [requests](specverb-request.md), [actions](specverb-actions.md), [describe](specverb-describe.md), [fetch](specverb-fetch.md), [descriptors](specverb-descriptors.md) for a consumer that mounts operations onto something other than a cli tree.
- **mcpverb** - MCP-shaped verbs: one `can call` grant per guarded leaf against an upstream MCP server, flags typed from the committed tool lock, deny by absence. `ServedTools` projects the same grants back into tool definitions for a consumer that serves them, and a grant's `widget` block declares what that tool's MCP Apps view may call back. See [mcpverb.md](mcpverb.md).
- **umbra / codegen** - The no-code driver: discovery, locks, generation, over three transports (spec, exec, mcp). See [umbra-cli.md](umbra-cli.md) and [materialization](umbra-materialization.md).
- **opcore** - The frozen inline grammar: typed query, body projection, GraphQL and SQL grants, JMESPath postconditions, MCP proxy grants, and a named client. See [opcore-inline.md](opcore-inline.md) and [opcore-body.md](opcore-body.md).
- **respfmt** - JSON renderer with optional JMESPath projection and five output formats, mirroring the aws CLI `--query` / `--output` surface.

## Shared core (`pkg/`)

- **audit** - Append-only JSONL invocation log with rotation and optional typed CI attribution, which it preserves but does not establish trust in.
- **policy** - Argv validation rejecting shell metacharacters before `execve`.
- **scope** / **exitcode** - Resolve cwd to its git toplevel for each audit row's RepoRoot, and a public exit-code taxonomy for orchestrators. A generated binary exits with the code its error declares (2 for a policy refusal, 5 for a user error), and the audit row records the same code plus a `reject` decision.
- **valuesource** / **tokenmint** - Shared `value <provider>` resolution with
  fallback chains, plus OAuth `client_credentials` tokens minted rather than
  read. See [value providers](value-providers.md).
- **config** / **stepflow** / **flock** / **skillgen** - Layered-config primitives with a generic `OverlayFile[T]`, a transport-agnostic ordered sequence engine, an advisory build lock, and the skill projection the driver emits.
- **mcpclient** - The Model Context Protocol client the mcp dialect speaks: one declared upstream over stdio or Streamable HTTP, the calls the dialect needs, and an optional progress sink. Policy-free, so it sits in the core.
- **mcpapps** - The MCP Apps host bridge: the frames a rendered widget sends back, answered under the guardfile's `widget` block rather than forwarded. Tool calls, resource reads, link opens, and downloads each take their own grant, and progress rides back under the view's own token. Transport-free and policy-free, so a consumer supplies the presenter and `http/mcpverb` supplies the policy. See [mcpapps.md](mcpapps.md).

## Two front doors

Every package above is reached through **umbra** (the driver and the binaries it generates) or through **beaver** (`mcp-beaver`, which imports `guardfile`, `opcore`, `specverb`, `tokenmint`, and `valuesource`). A package no front door reaches does not belong here.

ward was a third door and is deprecated. What only ward needed - `cli/{gittree,passthrough,repocfg,shell}`, `http/egress`, and `pkg/{attribution,broker,credseed,issueref,ownertrust,provenance,scan,version}` - was removed rather than kept for a consumer that is going away.

## See also

- [README.md](../README.md) - human-facing intro.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.

Cross-reference convention from the shared repo-pointer rule in the agentic-os docs.
