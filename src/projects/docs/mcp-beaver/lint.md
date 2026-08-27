# `mcp-beaver lint <spec.mcp.kdl>`

The offline validation surface: `serve` minus the listener and telemetry. Read
the spec, build the same server, print the minted tool names, exit. No network,
so it runs in a sealed clone and in CI.

Lint builds through the same constructor `serve` uses rather than calling
`opcore.ParseInline` directly, so it validates the grant-to-tool projection as
well as the parse. A well-formed file whose grants collide on one tool name
fails here.

A clean spec exits 0 and writes the projected tool names to stdout, sorted, one
per line. That is how a consumer repo reads its served surface off the owning
loader instead of writing a second parser. A rejected spec exits non-zero with
the failure on stderr and writes nothing to stdout.

## Warnings

Two facts invisible from every other surface, so a spec carrying one lints
identically to a working spec. An unknown verb resolving to POST by
fallthrough, and a `resource` stating no `audience`. Both are legitimate, so
both warn rather than fail, and both stay off stdout so a warning never edits
the diffable surface. The fallthrough warning reads opcore's `MethodInferred`,
so a grant stating `method` is owed no warning.

## Stated HTTP method

`method "POST"` inside a `can` body picks the method outright and leaves the
verb free to name the tool well. The verb otherwise does both jobs and they
collide on a read served over POST, which forced tool names like
`create_web_search` for a call that creates nothing. A stated `DELETE` marks
the grant destructive whatever the verb is called, since the confirmation gate
keys off effect rather than spelling, and anything outside GET, POST, PUT,
PATCH, DELETE, HEAD fails closed.

Scope is the `wrap` inline grammar. `serve-ssm` policies use a separate grammar
and are not lintable through this path. `lint-upstream` is in
[upstream.md](upstream.md).
