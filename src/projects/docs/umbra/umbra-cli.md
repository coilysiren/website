# the no-code driver (umbra / cmd/umbra)

A generated CLI is **no-code**: the consumer authors policy plus committed locks, never Go or build glue. `umbra` is the driver that turns one into the other.

Homebrew and Scoop track the coilyco tap and bucket, and each tag publishes raw binaries for six platforms. See the [README](../README.md).

## Discovery

A `--guardfile` selects a **binary**, not the whole build: members compose only when their `wrap <binary>` name (`Group[0]`) agrees, and a different name is a separate binary never merged in. With no flags a `.umbra/` directory in the cwd is the recursive project boundary. Every `.kdl` below it is inspected, a member recognized by a top-level `wrap` rather than its filename. With no selector exactly one binary group must be present.

Member paths are normalized relative to the root and sorted lexically before rendering, hashing, locking, or building, so re-rooting an unchanged project preserves generated order and cache identity. Per-member locks retain those directories, so identically named members cannot overwrite one another. KDL without a top-level `wrap` is ignored, but a malformed file declaring one is not.

## Mixed transports

A merged binary can hold all three dialects: spec members (HTTP APIs), exec members (wrapped binaries), and mcp members (upstream MCP servers, see [mcpverb.md](mcpverb.md)), which ships `ops forgejo`, `ops aws`, and `ops fixture` as one binary. The driver sniffs each transport off a child of the `wrap` block (`exec`, `mcp`, otherwise spec) and all three derive their name from `Group[0]`. Generated `main.go` dispatches through `specverb.Mount`, `execverb.Mount`, or `mcpverb.Mount`, with each dialect's imports gated behind a member that needs them, so the binary compiles with any one alone or all three.

The `mcp` in a command path like `wrap ward mcp forgejo` is a positional argument rather than a child, so it never sniffs as an mcp transport.

An exec member skips every lock-bearing seam: no lock, no fetch or skew, no token. Exec grants may add [embedded fixed files](umbra-materialization.md). An mcp member has a lock like a spec member, holding its pruned tool surface rather than a pruned Swagger document.

## The five verbs

- **`gen`** - render merged `main.go` into the cache, or `--out` to inspect it.
- **`lock`** - the deliberate online step. Per spec member it reads a vendored source or fetches upstream Swagger; per mcp member it connects and runs `tools/list`. Either way it **prunes to the granted surface**, writes a deterministic gzip lock, then freezes the module graph in `specverb.lock`.
- **`skew`** - prune live upstream to the granted surface and diff against each lock. Exit 3 on drift, never write. For an mcp member that is tool-schema drift, including a moved `_meta`, which nothing else in the ecosystem detects.
- **`build`** - materialize out-of-band and copy to `--out` (default `bin`) rather than exec it, following `go build -o`. `--set-version` stamps `--version` via `-ldflags`. Refuses without committed locks.
- **`run`** - materialize out-of-band and exec with passed-through args. Every spec may carry a top-level [`description`](value-providers.md) node.

## Vendored sources

A spec member normally derives a live Swagger URL from `base-url`. A consumer may instead commit the contract beside its member and name it with `spec`, which `lock` reads without reaching the endpoint. JSON, YAML, and `.gz` are supported. Invalid gzip fails the lock: a present but unreadable source is never permission to fetch the network copy, though a *missing* one may still fall back to the derived URL.
