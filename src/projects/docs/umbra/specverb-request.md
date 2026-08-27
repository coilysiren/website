# specverb request semantics

How the generic action behind every mounted leaf assembles, previews, and fires its request. Engine and policy layers are in [specverb.md](specverb.md).

## Inputs

- **Path params** become positional args, count-validated before any wire call. **Query params** become typed flags: scalars encode once, arrays as repeated keys in input order, unset values omitted.
- **Body fields** become typed flags; an unset optional is omitted rather than sent as a zero value, and arrays repeat the flag. **`--body-file`** supplies the whole body instead. Required fields are enforced at assembly rather than in the CLI layer, so either source satisfies them.

A local input shadowing a reserved engine flag (`--dry-run`, `--query`, `--output`, `--body-file`), or a query/body collision on one leaf, refuses to build rather than shadowing silently.

## A mapped body carries a declared type

A `body` block written as `map "source.path" to="target"` projects a **string** unless the mapping says otherwise. `type=` declares what reaches the wire, and `items=` the element type of an array:

```kdl
body {
    map "search_text" to="query"
    map "contents"    to="contents"       type="object"
    map "limit"       to="numResults"     type="integer"
    map "domains"     to="includeDomains" type="array" items="string"
}
```

Supported types are string, integer, number, boolean, object, and array. An `items` of `any` takes each element as supplied, the union rule an empty swagger `items` schema implies. The declared type reaches the model-facing schema too, so the tool says what the wire will carry rather than always saying string.

**A caller supplying the wrong shape is refused before the request fires.** Mapped leaves once projected a string in every configuration, leaving an upstream that wants an object unreachable. The mode no longer restricts the type.

An unsupported type, an `items` outside an array, and an unknown property all fail at parse time. Reasoning: coilyco-flight-deck/umbra#312.

## The shell-metachar gate is location-aware

`verb.Wrap` → `policy.ValidateArg` refuses shell metacharacters, but only on inputs composing into the request **URL**, the injection surface. Path params and query flags stay gated, each element of a repeated parameter independently. Body and form fields and `--body-file` are encoded into the body and never reach a shell or the URL, so they are exempt: gating them mangled legitimate free text.

## Firing

Auth resolves the secret through the value-provider registry. `--dry-run` prints the resolved request with the secret redacted and fires nothing. Live responses render through the `--query`/`--output` rail, and an empty 2xx prints an `ok:` line. The client refuses redirects for mutating methods, so a renamed target cannot silently swallow a write.

A wrap may declare `header "<name>" "<value>"`, applied to every leaf, which is how an author states the contact address some APIs ask for. `Authorization` is refused, since `auth` owns it and a second path would be an unreviewed credential surface, and so is `Content-Type`, which the runtime sets from the body. A duplicate name, an empty value, and a wrong argument count fail closed. Absent a declared one, every request carries `opcore.DefaultUserAgent`.

## Non-JSON responses

An operation whose success response offers no JSON writes its body to stdout byte for byte. The spec-driven path infers this from the declared media type, and an inline grant says it outright with a bare `raw-response` node. A response listing JSON beside something else is negotiating content rather than declaring bytes, so it is parsed.

Both paths choose **before** firing rather than after reading (umbra#289): decoding first fails on a plaintext or ZIP body, leaving the raw branch unreachable. Only the decode is skipped, never a gate, and `--query` is refused rather than ignored.

Fixed non-Swagger leaves live in [fetch overlays](specverb-fetch.md).
