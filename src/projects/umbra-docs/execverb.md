# exec-dialect verbs (execverb)

The exec-transport sibling of [specverb](specverb.md): policy as KDL sentences, pointed at wrapped binaries rather than HTTP APIs.

```kdl
wrap ward git {
    exec git
    can run commit { deny-flag "--no-verify" }
    never run "reflog expire"
}
```

- **`exec <bin>`** - the binary, fixed at parse. `argv-prefix` pins an unoverridable leading argv, the remote-exec transport. `env <NAME> { value <provider> "<addr>" }` resolves at exec time, so a secret comes from SSM rather than the guardfile.
- **`can run <sub>`** - deny-by-default; only named subcommands mount. A quoted multi-word sentence is a nested path. `can run "*"` is an open funnel and must be the only grant.
- **`argv <tokens...>`** - fixed fragments replacing the subcommand. **`embed`** compiles a file in and inserts its runtime path. **`sealed`** forbids trailing caller args. **`bin`** overrides the wrap binary for one leaf and does **not** inherit `argv-prefix`.
- **Flag policy** - `deny-flag` (default-allow minus denials) or `allow-flag` (strict allowlist).
- **`when` / `deny-when <sel> matches <glob...>`** - argv guards. The selector is a flag name (`secret-id` reads `--secret-id`), `any-arg`, or `argN`.
- **`gate <name>`** - a registered preflight gate. The registry ships empty, so every name fails closed until a consumer registers one.
- **`passthrough <bin>`** - funnel sugar. See [passthrough.md](passthrough.md).

Unknown nodes fail closed. `execverb.Mount` mirrors `specverb.Mount`: one leaf per grant under `verb.Wrap`, `SkipFlagParsing` so caller args pass through after the check. The invocation is `bin + argv-prefix + (subcommand or argv) + caller args`.

## `allow <bin...>` inspect lists

Opens N read-only funnels from one wrap. `allow grep cat` desugars mechanically to two `exec` + `can run "*"` wraps, so it is exactly as safe as what it stands in for. Bare names only: a path separator or metacharacter fails closed. Mutually exclusive with `exec`/`can run`. A wrap-level guard composes onto every leaf, and a wrap guard with no list fails closed.

## Complex actions

A wrap may declare `action` nodes: ordered `call run <grant>` sequences over granted leaves, run by `pkg/stepflow`. Step `args` are positional tokens appended after the pinned `argv`; named `args` blocks are refused. Each step decodes to `{exit_code, ok, stdout, stderr, last_line, kv{...}}`, and later steps read `$as.field`. A non-zero exit stops the sequence. Guards hold throughout, each step audits its own row, and `--dry-run` renders the plan without firing.

## Value flags

`valueFlags` in `cli/execverb/argv.go` names the long flags whose value arrives as a separate token. Without it `--region us-east-1` leaves `us-east-1` looking positional, slipping past an `argN` guard. The table is one vendor's shape and belongs in the guardfile. Dropping an entry weakens any `argN` guard on a binary taking that flag, and does it silently. umbra#282.
