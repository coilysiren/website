# opcore inline-operation source (`ParseInline`)

`opcore.ParseInline` states descriptors directly from KDL for non-CLI consumers such as ward-mcp, feeding the same core OpenAPI resolution does.

```kdl
wrap ward mcp forgejo {
    base-url "forgejo.coilysiren.me/api/v1"   // or a { value } block
    auth header-token { header "Authorization"; prefix "token "; value env "TOK" }
    restrict owner matches "coilyco-*"         // wrap-level, fail-closed
    can create issue {
        path "/repos/{owner}/{repo}/issues"    // required; params from {}
        query "state"; body "title" "body"
        fail-when "number == null"
    }}
```

- **method** - from `MethodForVerb`, or `method "PUT"` for an unknown verb. See [unrecognised verbs](specverb-resolution.md).
- **query / body** - flat names become string fields; blocks add typed, bounded, aliased, or exclusive ones. **set** becomes `FixedBody`. See [body projection and pins](opcore-body.md).
- **fail-when** - a JMESPath predicate over a success response; truthy fails the call. Inputs are `$name` variables.
- **raw-response** - bare node declaring the body non-JSON, written through undecoded. See [raw responses](specverb-fetch.md).
- **graphql / sql** - an authored document or statement plus caller-supplied holes, the two request shapes no other node builds.

Unknown nodes, missing requirements, malformed predicates, and input collisions fail closed. An unrecognised verb is the one place the grammar infers rather than refuses, so it is reported.

## Typed inputs

`field` takes `string`, `boolean`, `integer`, `number`; `array` takes one via `items`. Bounds are inclusive `minimum`/`maximum` and `min-items`/`max-items`. `mutually-exclusive` declares an at-most-one group over local names. Objects, duplicates, impossible bounds, and unresolved names fail closed. `Args.Query` stays strings; `Args.QueryValues` carries typed scalars and arrays, and one name through both fails closed. `query "search_query" upstream="query"` aliases a local whose upstream name would collide with `dry-run`, `query`, `output`, or `body-file`. Body projection and pinned values are [their own page](opcore-body.md).

## GraphQL grants

`graphql { document "query ($q: String!) { ... }" }` sends the document verbatim as `query` with caller input nested under `variables`. **The document owns the variable set**: name, type, and requiredness come from its signature, so a `variable` node only decorates one that exists with help text or bounds. Built-in scalars map to schema types; a non-scalar needs `type=`, since an enum and an input object read alike in a document. One operation per document, POST only, no combining with `body`/`map`/`set`, and undeclared input never reaches the upstream.

## SQL grants

`database pgx { value env "DATABASE_URL" }` at wrap level, then `sql { statement "SELECT ... WHERE c = $1"; param "c" type="string" }` per grant. **umbra imports no driver**: it opens the named `database/sql` driver, which the consumer binary registers, and an unregistered one is an error naming it. The statement is authored and never enters the schema; parameters bind positionally and nothing is interpolated, so an undeclared input is inert. Fails closed on stacked statements, a placeholder set that is not `$1..$N`, a count disagreeing with the params, a non-scalar param type, and a reading verb whose statement mutates (a `WITH` hiding a `DELETE` included). `max-rows` bounds a read, defaulting to 200, and the response states `truncated` rather than implying it saw everything.

## Proxy grants

`proxy <tool> { upstream <server> <tool>; allow|deny <field> matches <regex>; post-call ... }` is the inline MCP passthrough: deny-by-absence on the served surface, pinning the exact upstream tool. `allow`/`deny` guard request strings; `post-call` inspects the returned `text`, `content`, `url`, or `state`.
