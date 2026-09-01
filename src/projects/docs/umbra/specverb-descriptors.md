# descriptors: the spec-driven source without a cli tree

`specverb.Descriptors` resolves a spec-driven Guardfile into the pair
`opcore.ParseInline` returns for the inline grammar: the per-operation
descriptors and the request `RuntimeConfig`. It builds no `cli.Command`.

```go
descs, rt, err := specverb.Descriptors(specverb.DescriptorConfig{
    Guardfile: gf,   // guardfile.ParseFile, so `inherit` is already flattened
    Spec:      raw,  // decompressed Swagger 2.0 or OpenAPI 3.x bytes
})
```

The two spec sources now meet at one type. `opcore.Descriptor` was always the
shared payload, but the only exported spec-driven entrypoints were `Build` and
`Mount`, both returning a `*cli.Command`. A consumer projecting operations onto
MCP tools or an HTTP route table wanted the descriptors and not the tree, so it
had no way in and restated every path and query field by hand in the inline
grammar instead. That hand restatement is what drifts.

## What it resolves

`Build`'s pipeline, minus the projection: wildcards expand, each `can` grant
resolves verb+resource against the spec ([resolution](specverb-resolution.md)),
and a `never` or `cannot` drops the matching allow ([policy](specverb-policy.md)).
The returned `RuntimeConfig` carries base-url, auth, the merged value providers,
and the `restrict` gate, so `opcore.Operation.Execute` guards a descriptor-driven
call exactly as it guards a cli one. A consumer that took descriptors and left
the config behind would fire unauthenticated and ungated, which is why both come
back from one call.

`DescriptorConfig.BaseURL` is the one field a consumer supplies that the
guardfile does not, for pointing a deployed runtime at a different edge.

## Deny reaches the consumer as absence

This is the one deliberate divergence from the cli projection, and it is a
difference in kind rather than in rendering.

The cli mounts a denied leaf as a **teaching command**: it exists, it appears in
help, and running it refuses with the guardfile's `message`. That is right for an
operator who needs to learn why a verb is closed.

`Descriptors` returns **nothing** for a denied leaf. A surface whose whole
guarantee is "an undeclared operation has no handler" cannot honour it by
mounting a handler that refuses. A denied tool that exists is still a tool in the
list, still costs context, and still invites the call. Absence is the guard.

So a consumer must not synthesize a refusing operation from a deny. If it wants
to tell a reader what is closed, that belongs in prose beside the surface, never
in the surface.

## Fails closed on the cli-only nodes

`action` and `fetch` have no descriptor form, and `Descriptors` errors rather
than dropping them.

Dropping an `action` silently is the dangerous one. An `action <verb> <resource>`
**shadows** a generated leaf, and `Build` calls `suppressShadowed` to remove the
descriptor it replaces. A descriptor consumer that ignored the action would mount
the generated leaf its author deliberately overrode, and the two surfaces would
answer the same call differently with nothing pointing at the divergence.

Neither node crosses an `inherit` boundary. `absorb` pulls only grants,
singletons, and `restrict`, so a tier composed from a base guardfile inherits
that base's policy without inheriting its cli composites, and never inherits one
of these errors from a parent it did not write.

## Composing a tier

`guardfile.ParseFile` flattens `inherit` before parsing, which is how a narrower
surface is stated as a difference from a wider one rather than as a second
authored file:

```kdl
wrap ward mcp forgejo {
    inherit "../base/forgejo.kdl"
    auth header-token { header Authorization; prefix "token "; value env "TOKEN" }
    never delete repo
}
```

Grants merge, `spec` / `base-url` / `auth` are child-wins singletons, and
`restrict` dedupes by param. The child's `never` shadows the inherited `can`, so
the child can only narrow. Widening needs `override can <verb> <resource>` by
name, and a bare `can` that crosses an inherited deny is a parse error rather
than a silent escalation. That is what makes "this tier is weaker than its base"
a structural property instead of a claim to re-check.

Flatten at author time. `inherit` reads the filesystem by relative path, so a
runtime holding one mounted file cannot resolve one.

## See also

- [specverb.md](specverb.md) - the engine and the cli projection.
- [opcore-inline.md](opcore-inline.md) - the inline grammar this parallels.
- [specverb-policy.md](specverb-policy.md) - deny semantics, `override`, restrict.
