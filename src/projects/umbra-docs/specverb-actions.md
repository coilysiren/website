# complex actions

A **complex action** is a named composite verb authored inside a `wrap` block, orchestrating a bounded sequence of already-granted leaves with control flow. Sugar over the allowlist, never an escape from it. See [specverb.md](specverb.md).

## The five invariants

1. **Granted-only.** An action may only target an op the same Guardfile grants via `can`. An ungranted target fails at `lock`/`build` time, not runtime.
2. **Bounded.** Every poll loop carries a mandatory `every` and `timeout`. No unbounded iteration exists in the grammar, which is what makes it reviewable.
3. **Per-call audit.** Each tick writes its own leaf `verb.Wrap` row, the action one envelope row.
4. **Dry-run is a plan.** `--dry-run` prints the call with bound params and the compiled `until`, firing nothing.
5. **One expression engine.** Conditions are JMESPath, the engine `--query` uses, extended with native `$input` variables.

## Input defaulting

An `input` may carry `default <jmespath>`. When the operator omits it, the action fires the poll leaf **once as a pre-flight**, evaluates the expression against that response, and binds the result before the loop starts, so `ci-watch owner/repo` with no `--run` resolves to the latest run. The pre-flight hits only the poll leaf, adding no new target or grant, and writes its own audit row like any tick.

## List inputs, and refusing before the write

An `input` may carry `array`, making its flag repeatable and projecting the values as a JSON array rather than one string. Flags only: a positional list cannot be told from the arguments after it.

The element type is not declared here. It is read from the schema of the leaf field the arg binds, so `--labels 199 --labels 333` against a leaf declaring `items: {type: integer}` sends `[199, 333]` as numbers, and `--labels headless` is refused rather than sent. An array whose spec declares an empty `items` schema resolves each token on its own, the union encoding in [specverb-request.md](specverb-request.md).

This is what lets a shadow refuse **before** a write. `required` on an action input is enforced while the inputs bind, before the request is assembled, so an action shadowing `create issue` can demand a label set and end the run with the hazard absent. `fail-when` evaluates over the final response, so it reports a bad write rather than preventing one.

Two forms carry scalars only, and both fail closed rather than flattening. A `collect` step pages a request built from string bindings, so binding an `array` input there is a build-time error. An exec step takes argv tokens, so a list reaching one is refused.

## `matches`: constraining the value, not just demanding one

`required` gets presence. `matches "<glob...>" message="<why>"` gets **composition**, so a shadow can demand a particular shape of value rather than any value at all.

```kdl
input labels {
    flag
    required
    array
    matches "priority/P[0-4]" message="no priority label: pass --labels priority/P2 (P0-P4)"
    matches "autonomy/headless" "autonomy/live-collab" "autonomy/async-consult" "autonomy/epic" \
        message="no autonomy label: pass --labels autonomy/headless"
}
```

Globs within one constraint are **alternatives**, variadic like `restrict <param> matches <glob...>`. Constraints **stack**, and each is checked independently, which is what lets a refusal say *which* axis is missing instead of only that something is.

On an `array` input each constraint demands **at least one** matching element, so the set above is refused when it carries no priority label however many other labels it has. On a scalar input the bound value itself must match.

Enumerate rather than wildcard when the vocabulary is fixed and the downstream ignores what it does not recognise. A loose `priority/*` accepts `priority/NOPE`, which the Forgejo labels endpoint drops silently while returning 200, so the guard would pass and apply nothing.

Globs are `filepath.Match`, matched by the same helper the wrap-level `restrict` uses, so a malformed pattern matches nothing and fails closed rather than erroring out. `message` is the only property, and an unknown one fails closed at parse.

Like `required`, this is enforced while the inputs bind, **before** the request is assembled. That is the whole point: a constraint checked after the response is a report, and the run ends with the hazard absent rather than described.

## An omitted optional input drops its argument

An `input` without `required` may simply not be supplied. The argument bound to
it is then **left out of the request** rather than failing the call, so a shadow
can carry the leaf's optional fields without forcing a caller to pass all of
them. `--dry-run` renders the same shape, so the plan never shows a
`${placeholder}` for something the live call would drop.

This is safe because it cannot hide a typo: a bare `$name` that no `input`
declares is rejected at **build** time, so a reference that survives to runtime
is always a declared input. A `$step.field` reference is unaffected and still
fails when the step it names is unbound.

Scoped to the spec dialect. An execverb step takes positional argv tokens, where
dropping one would shift every token after it and silently weaken an `argN`
guard, so that path is unchanged.

A supplied argument takes the **type its body field declares**, the scalar
sibling of the array rule above: an `integer` field receives a JSON number, and
a value that does not parse as the declared type is refused rather than sent as
a string. Path and query values stay raw tokens, because that is what they are
on the wire.

## `collect`: auto-pagination

A `collect` action walks a granted list leaf page by page, appending every array response until a page returns fewer than the page size, then emits one array bound to `as`. It takes `page-param`, `limit-param`, `default-limit`, and an optional `cache "<ttl>"` served from the on-disk TTL cache. Granted-only, audited per page plus an envelope row, and dry-runnable.

## Mount actions: shadowing a generated leaf

An action authored with **two** header arguments (`action view issue` rather than `action <name>`) mounts at that leaf path, taking the place of the generated leaf, which is how a default verb grows behaviour: `forgejo issue view` now resolves to a composite fetching the issue **and** its comment thread.

Three things follow. **It shadows**: the generated leaf is dropped from the CLI and describe surface, while the `can view issue` grant still resolves, so the shadow replaces the CLI leaf, never the grant. **It combines**: a mount call-action renders every `as` binding together as one object rather than only the final call's response, and `--query` projects that shape. **It keeps the leaf's audit identity**: the envelope row is named for the shadowed path, so audit and metrics stay continuous while each inner call writes its own row. A mount action may also be a `poll`, and only the header arity differs.
