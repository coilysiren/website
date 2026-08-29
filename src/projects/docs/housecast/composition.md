# Composition

The engine path: a roster on disk becomes an immutable bundle. `housecast
compose` drives it and `housecast/compose.py` emits it. Everything the bundle
carries is derived rather than authored.

**Stub.** The structure is settled and the prose is not.

## The pipeline

1. **Load and validate** - a bad roster is refused before any work is done on
   it. See [`roster-language.md`](roster-language.md).
2. **Resolve** - the personality meld is ordered, the boundary allocation
   settled. See [`role-boundaries.md`](role-boundaries.md).
3. **Derive** - the identity primitives. See [`identity.md`](identity.md).
4. **Emit** - `compose()` writes the bundle, its `manifest()`, its `trace()`.

The bundle emits as **native skills** or as a **compiled** document.
`compiled_document()` is the second. Which one a consumer wants is a property of
the harness being fed, not of the roster.

## Byte-identity is the acceptance bar

The Go engine still composes, and the two must agree byte for byte until
`agent-compose#339` deletes it. That reaches further into this code than it
looks. `go_json()` exists because Go's encoder escapes `<`, `>`, and `&` even
inside strings and Python's does not. Without re-adding exactly those three, two
identical documents differ on any summary containing an ampersand, and `digest()`
is taken over the result, so it surfaces as a hash mismatch on documents that are
in fact the same.

## Still to write

* The bundle layout, what `manifest()` and `trace()` each carry, and what a
  digest match lets a consumer assume.
* A worked `compose` run against the shipped roster.

## See also

* [`identity.md`](identity.md) - the primitives derived here.
