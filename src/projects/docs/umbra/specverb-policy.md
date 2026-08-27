# specverb policy: auth, deny, restrict, tiering

The policy surface a Guardfile authors over the `op`-bound grants. Engine and layering in [specverb.md](specverb.md).

## Auth

A secret or opaque host is named, never committed: `value <provider> "<address>"`. umbra never reads the store; a registered provider does, and an unregistered one fails closed. See [value providers](value-providers.md).

Three schemes, each redacting its secrets in `--dry-run`: `header-token { header; prefix; value ... }` (the trailing space in `prefix "token "` is significant), `bearer`, and `query-param`.

`auth none` states that the upstream takes no credential: `authorize` returns without touching the request. The block stays **required**, because a spec omitting `auth` is a spec that forgot, and `auth none` carrying a block is an error. A placeholder is not a substitute: `value literal "unused"` sends a **wrong** `Authorization` rather than none, and an endpoint serving anonymous callers can still reject a credential it cannot verify.

`base-url` takes a committed string or a block resolving the host through a provider at request time, lazily and cached, so mounting the tree never touches the store. The forms are mutually exclusive; with no committed host the spec is vendored beside the guardfile.

## Deny beats allow; restrict gates scope

`cannot`/`never <verb> <resource>` blocks that class and beats any matching `can`. The allowed leaf is dropped from the tree, the spec lock, and the action poll set, replaced by a teaching leaf failing closed with `PolicyDenied` and the grant's `message`. A deny with no allow still mounts that leaf, so an operator learns why rather than hitting an unknown command.

`restrict <param> matches "<glob>"...` is a wrap-level allowlist. Every leaf whose path carries `{param}` must supply a matching argument at invocation or fail closed before any wire call. A malformed glob matches nothing, and it is enforced on the action path too.

## inherit and override

`inherit "<path>"` pulls in another guardfile's grants, so a tiered surface composes by layering. Resolution is **textual**, before the typed parse: each file is flattened recursively and its wrap body spliced in. Effective grants are the union, order-independent. `restrict` inherits deduped by param with the child winning, singletons only when the child declares none, and `action` blocks stay child-local. A missing ref or cycle fails closed.

The load-bearing rule: **an inherited `never` beats a plain `can`, and only an `override` naming the exact verb+resource beats an inherited `never`.** Deny low, override high.

`override can <verb> <resource>` re-grants exactly that pair and rejects `"*"`, so every escalation is enumerated. Enforced when guardfiles flatten, not at runtime: a plain `can` shadowed by an inherited `never` is a build error pointing at `override`, and an `override` lifting no matching `never` is one too, since silently it would be a plain `can`.
