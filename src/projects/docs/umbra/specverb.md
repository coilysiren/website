# spec-driven verbs (guardfile + specverb)

The spec-driven verb subsystem replaces hand-rolled per-verb CLI wrappers with one generic engine that builds the guarded command tree at runtime from an embedded API spec plus a policy. Three layers:

- **L0 - upstream spec.** The vendor's API truth, embedded: Swagger 2.0 or OpenAPI 3.0 / 3.1.
- **L1 - policy IR.** The compiled operation set, resolved by convention with `op` as the override. No API-specific table in the engine.
- **L2 - KDL Guardfile.** The authoring layer: pure data, parsed never evaluated.

The engine carries no upstream knowledge, so one drives every spec.

## guardfile (L2)

`guardfile.Parse` turns a KDL Guardfile into a typed model of group, auth, grants, restrictions, and actions. The grant's verb+resource **are** the CLI leaf and group:

```kdl
wrap ward ops forgejo {
    spec forgejo.swagger.v1.json
    base-url "forgejo.coilysiren.me/api/v1"
    auth header-token { header Authorization; prefix "token "; value ssm "/forgejo/api-token" }

    can get repo                          // convention: GET /repos/{owner}/{repo}
    can list repo { op "repoSearch" }     // irregular: pin it
}
```

Grant-body nodes are `op` (the override seam, rules in [resolution](specverb-resolution.md)), `body k=v` toggles, `message`, and `describe`. The parser fails closed on unknown nodes and unsupported auth schemes. `fetch` is the overlay sibling for non-Swagger endpoints, and auth, deny semantics, and the restrict gate live in [policy](specverb-policy.md).

## specverb (engine)

`specverb.Build(Config)` assembles the guarded `*cli.Command` tree:
1. Parse the embedded spec into one `kin-openapi` IR (Swagger 2.0 upgraded via `openapi2conv`), resolving `$ref`s, reading `requestBody.content`, promoting `in:query`/`in:path` params, and collapsing 3.1 type-lists.
2. Resolve each `can` grant to a `{method, path, params, body}` descriptor, resource as group and verb as leaf. **Deny-by-default: an unresolvable or ambiguous grant, or an op the spec lacks, fails closed.**
3. Mount each op as a guarded leaf under `verb.Wrap`, and each `fetch` overlay under the `fetch` group. A reserved-flag collision fails closed, and the restrict gate runs at invocation.

One generic action backs every verb: positional path params, typed query and body flags, `--body-file`, fixed-body toggles, injected-resolver auth, `--dry-run`, and the render rail. See [requests](specverb-request.md).
`specverb.Descriptors` is the same resolution with no tree built, for a consumer projecting operations onto MCP tools or a route table. See [descriptors](specverb-descriptors.md).

`specverb.Mount` grafts the built group onto a root. `codegen.Render` generates a consumer's whole `main.go`, and the no-code [umbra](umbra-cli.md) driver wraps that in a `gen` / `lock` / `skew` / `run` surface.

## Spec durability

Proven across Forgejo (Swagger 2.0 JSON), Trello (OpenAPI 3.0 JSON, `in:query` mutation fields), and Tailscale (OpenAPI 3.1 YAML, `$ref` path params). `Prune` has a path per version, reducing a document to the granted ops plus the transitive closure of the components they reach.
