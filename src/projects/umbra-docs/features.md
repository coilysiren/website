# umbra features

Inventory of umbra today, grouped by **guarded surface** over a shared `pkg/`. See [architecture.md](architecture.md); each primitive ships a runnable `examples/<name>/`. Dev verbs run through the `Makefile`; release is automated and Forgejo-canonical, with commit-scoped draft tags on `main` ([release-pipeline.md](release-pipeline.md)).

## CLI passthrough surface (`cli/`)

- **passthrough** - Thin wrapper embedding an existing binary (aws, gh, kubectl) as an audited urfave subcommand. See [passthrough.md](passthrough.md).
- **execverb** - Exec-dialect KDL verbs, complex actions, and inspect lists. See [execverb.md](execverb.md).
- **verb** / **shell** - Middleware wrapping every `*cli.Command.Action` in the validate -> execute -> audit pipeline, over subprocess exec with audited argv and env injection.
- **gittree** / **repocfg** - Clean+synced gate refusing repo-shaped verbs on a dirty tree, and per-repo config under a consumer-chosen filename.

## HTTP request surface (`http/`)

- **egress** - Per-invocation CONNECT proxy with a consumer-supplied allowlist, in enforce or observe mode.
- **specverb / guardfile** - Spec-driven verbs: [resolution](specverb-resolution.md), [policy](specverb-policy.md), [requests](specverb-request.md), [actions](specverb-actions.md), [describe](specverb-describe.md), [fetch](specverb-fetch.md).
- **specgen / codegen** - The no-code driver: discovery, locks, generation. See [specgen.md](specgen.md) and [materialization](specgen-materialization.md).
- **opcore** - The frozen inline grammar: typed query, body projection, GraphQL and SQL grants, JMESPath postconditions, MCP proxy grants, and a named client. See [opcore-inline.md](opcore-inline.md) and [opcore-body.md](opcore-body.md).
- **respfmt** - JSON renderer with optional JMESPath projection and five output formats, mirroring the aws CLI `--query` / `--output` surface.

## Shared core (`pkg/`)

- **audit** - Append-only JSONL invocation log with rotation and optional typed CI attribution, which it preserves but does not establish trust in.
- **policy** - Argv validation rejecting shell metacharacters before `execve`.
- **scope** / **exitcode** - Resolve cwd to its git toplevel for each audit row's RepoRoot, and a public exit-code taxonomy for orchestrators.
- **valuesource** / **tokenmint** - Shared `value <provider>` resolution with
  fallback chains, plus OAuth `client_credentials` tokens minted rather than
  read. See [value providers](value-providers.md).
- **config** / **stepflow** - Layered-config primitives with a generic `OverlayFile[T]`, and a transport-agnostic ordered sequence engine.
- **broker** / **credseed** / **provenance** - Credential broker, env seeder, and origin envelope. See [broker.md](broker.md).
- **scan** / **attribution** / **flock** / **version** / **issueref** / **ownertrust** - Ward-lifted helpers. See [ward-helpers.md](ward-helpers.md).

## See also

- [README.md](../README.md) - human-facing intro.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.

Cross-reference convention from the shared repo-pointer rule in the agentic-os docs.
