# value providers, chains, and the `description` node

A `value <provider> <address>` names *where* a value is read at request time. umbra ships three store-agnostic resolvers: **`env`** and **`file`**, both trimmed, and **`literal`**, which is not. A stored credential arrives with the trailing newline an editor left in the file it was uploaded from, and every layer between faithfully preserves it, so Go refuses to write the resulting auth header and the request never leaves the process. `literal` keeps its bytes because a guardfile author wrote them and a reviewer can see them. A value may also be **minted** rather than read: `pkg/tokenmint` resolves `value oauth2 "<client>"` to a live OAuth `client_credentials` access token, cached to the token's own `expires_in` and re-minted when the client secret rotates. The consumer constructs it over its base registry and merges the result in, so no grammar changes and spec mode and upstream mode share one implementation.

Anything store-backed is the consumer's, declared as a subprocess contract:

```kdl
provider ssm {
    exec aws ssm get-parameter --with-decryption --output text --query "Parameter.Value" --name
}
```

The address is appended as the final argument. Only stdout is read, trimmed; the resolved value never reaches argv, the audit row, or an error message, and a non-zero exit surfaces the exit status alone.

## Why exec rather than an SDK

umbra is a policy-free engine, and [architecture.md](architecture.md) keeps consumer-specific knowledge out of it. Linking a vendor SDK would put one cloud's credential rules inside the framework and hand every generated binary that dependency whether or not it resolves anything.

The trade is worth naming: resolution becomes whatever the declared binary does, so a provider relying on SDK profile precedence or SSO fallbacks inherits the CLI's behaviour, and that CLI must exist wherever the binary runs.

## Fallback chains

KDL has no arrays, so an ordered fallback list sits in a children block, one source per line. Resolution takes the first source yielding a non-empty value with no error, so a fast local `env` can precede a durable store:

```kdl
value {
    env FORGEJO_API_TOKEN                    // fast local, checked first
    ssm "/forgejo/coilyco-ops/api-token"     // durable backup
}
```

Every field taking a `value` takes a chain. The inline form is a one-element chain, so existing Guardfiles are unchanged, and the two forms are mutually exclusive on one node. Refusals happen at parse time: an empty block, a source missing its address, a mixed form, or a source carrying children.

`valuesource.ResolveFirst` skips a source when its provider errors **or** resolves empty, since success needs both. When every source fails it returns a combined error naming each provider and address tried but never a resolved value, so a provider handing back a value alongside an error leaks nothing. A `--dry-run` stays offline.

A `value` naming a provider that is neither built-in nor declared is an error at resolve time, never an empty string. Declaring a provider with no `exec`, or with an unknown child, is a parse error. Both dialects share the grammar, and a declaration in one member of a merged binary serves the others.

## The `description` node

Every `.kdl` spec may carry a top-level `description "..."` node, sibling of the root block and present on both dialects. It is **queryable contract data rather than a comment header**, the sanctioned home for standing context. A single string argument, with KDL's multi-line literals available for longer prose; an empty `description ""` fails closed, so the node is never a silent no-op.
