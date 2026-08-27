# `mcp-beaver serve <spec.mcp.kdl> --http :addr`

One static binary renders any `.mcp.kdl` into a guarded MCP server over the
MCP Go SDK's streamable HTTP transport at `/mcp`, and exposes the identical
tool arguments at `POST /api/{tool-name}`. No per-guardfile Go, and it never
binds stdio: these run as pods reached by URL.

## Spec parse

`opcore.ParseInline` (umbra `http/opcore`) parses the inline grammar: `wrap`
header, `base-url`, `auth`, `restrict`, and each
`can <verb> <resource> { path/query/body/set }` grant. Body blocks preserve
typed scalars, scalar arrays, nested objects, required fields, and raw object
or array subtrees, and can project required nested string inputs onto fresh
top-level keys without forwarding undeclared input. Query blocks preserve
string, boolean, integer, number, and scalar-array types, numeric bounds, array
length bounds, required fields, mutually-exclusive groups, and safe local
aliases. Method is inferred from the verb, path params from `{template}`.
`sql` grants reach Postgres only: `pgx` is the one driver this binary links.

**Grant to tool projection.** Each `Descriptor` becomes one MCP tool and one HTTP endpoint named
`verb_resource`, with a draft-07 `inputSchema` derived from path, query, and
body, and a description from `describe`. mcp-beaver derives a title plus
read-only, destructive, idempotent, and open-world annotations from the HTTP
behavior, and a `{coverage, result}` output schema. `internal/mcpserver`.

**Coverage before payload.** Every grant-backed result leads with `coverage` and carries the payload under
`result`, in both text and structured content. A harness that bounds a result
keeps the front, so a caveat serialized last is destroyed first. Coverage
states `truncated`, `bytes`, `over_budget` past the smallest measured consumer
cap, and `items` naming every array and its length. The envelope is a struct
rather than a map, so field order is a contract.

**Execution.** MCP arguments route onto `opcore.Args` without flattening nested body objects,
then fire `opcore.Operation.Execute`: metachar gate, `restrict` allowlist,
base-url, and env-token auth are the engine's. A denied or failed call returns
as a tool result with `isError`. Query arguments keep their JSON types, arrays
become repeated upstream keys in caller order, and violations fail before the
upstream sees a request. The served surface is exactly the `can` grants, so an
unwritten grant is an absent tool.
