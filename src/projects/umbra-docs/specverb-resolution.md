# op resolution, wildcards, and unrecognised verbs

A grant's verb+resource resolve to a spec operation by convention, so the author rarely hand-binds an operationId; a grant-body `op` is the override seam. The conventions are pure path+method structure, no vendor strings, so one resolver drives Swagger 2.0 and OpenAPI 3.x alike.

## Verbs

- **CRUD** - `get`/`view` (GET item), `list` (GET collection), `create` (POST collection), `edit` (PATCH then PUT), `delete` (DELETE item).
- **State toggles** - `close`/`reopen`/`archive`/`unarchive` resolve like `edit` and carry a fixed `body`. **Membership** - `add` (POST), `set` (PUT), `remove` (DELETE).
- **`search`**, **`list-<child>`**, **`create-on-<parent>`** - GET `<collection>/search`, GET that sub-collection, POST under `<parent>`.
- **`comment`** / **`pin`** - POST, stated rather than reaching it through the fallthrough.
- **Any other verb** - its trailing noun is read as a child sub-collection to create on the resource (`transfer repo` -> `POST .../repos/{o}/{r}/transfers`).

## Resources

A resource may be a `parent-child` compound: `issue-label` targets the `labels` sub-collection under an `issue`. The resource segment is the trailing static segment, or the last before the trailing `{param}` run. Among matches, prefer a plural collection over a singleton, then the least-nested path.

With no path-structure candidate, the resolver matches verb and resource against the **words of each operationId**, reaching endpoints whose path does not name the resource. **Exact word-set beats superset**, so `search skills` -> `searchSkills` beats `aiSearchSkills` with no pin. Resolution is deny-by-default: zero candidates or a tie is a fail-closed error naming them, and that is when to pin `op`.

## Unrecognised verbs

That fallthrough is the **one place the grammar infers rather than refuses**, and a wrong POST against a real endpoint may not fail loudly the way a wrong GET does. So the guess is not silent: `MethodForVerb` reports `ok=false`, the parser records `Descriptor.MethodInferred`, and `ParseInlineWithWarnings` returns one note per inferred grant. Guardfiles keep working; for a novel verb state `method "PUT"`.

## Wildcard resource `"*"`

`can get "*"` applies a verb across every resource exposing it and `never delete "*"` denies it everywhere, expanding at build and prune time into one grant per match. Only convention verbs enumerate, because `"*"` carries no `op` to break a tie; any other fails closed.

Precedence is the ordinary deny-wins rule rather than a special case: a wildcard deny shadows a specific allow, a specific deny carves an exception out of a wildcard allow, and an explicit same-class grant wins rather than double-mounting. A wildcard mounts only ops the spec has, a new resource exposing `delete` is auto-denied with no edit, an empty expansion fails the build, and an ambiguous resource stays unmounted.
