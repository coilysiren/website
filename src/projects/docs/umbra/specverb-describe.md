# describe model and generated visibility

Gold-standard visibility for a fanatically thin generated CLI. The surface is spec-driven with no hand-written verbs, so its visibility is generated too. The engine never pulls descriptions it cannot trust from a sparse upstream spec; it surfaces the **structure** it always knows. See [specverb.md](specverb.md).

## The Surface model

`specverb.Describe(Config)` builds a `Surface`, the in-engine model of the mounted surface and the single structural truth shared by help and the describe verb. It is assembled from the same resolved descriptors the runtime mounts, so it can never name a verb that is not callable.

- **`Surface`** - the command path, resolved base-url, `AuthInfo`, and one `VerbInfo` per mounted leaf in mount order.
- **`VerbInfo`** - the CLI placement, HTTP method and path, the destructive flag, the dotted audit name, the authorizing grant sentence, the optional `describe` note, `Params`, and the `FixedBody` a state toggle always sends.
- **`ParamInfo`** - each param tagged by kind (`path` positional, `query` flag, `body` flag) plus type and requiredness. Aliases also record their upstream parameter.
- **`AuthInfo`** - the scheme, header, and token **path**. The secret value never appears in the model.

## The three consumer surfaces

**Rich per-verb help.** Every leaf's `--help` carries method and path, the authorizing grant, the `describe` note, each param tagged by kind and requiredness, and the dry-run hint. Always present, even where the upstream description is blank.

**The `describe` verb.** `Build` mounts `describe` as a real verb on the group, rendering `Surface.Markdown()`: a header and plain-language auth sentence, then a stanza per verb whose heading is the full command path and whose body frames the HTTP op, grant, and destructive flag in prose above two flat aligned enumerations, positional arguments and options, kept in separate lists. The verb takes no flags; capture is a shell redirect.

**The generated agent skill.** With `--skills-out`, umbra reconstructs the merged urfave tree and writes a concise `SKILL.md` plus `references/commands.yaml`. The body routes agents to live help and describe output, and the lazy index records every reachable leaf without copying exhaustive help into eager context.

Machine consumers read the mounted command tree directly in Go rather than through a `--query` rail on the verb.

## Guardfile `describe "..."` annotations

A grant may carry a `describe "..."` child: a per-grant slot enriching a thin upstream spec where it matters.

```kdl
can delete repos {
    describe "irreversible: deletes the repo and all its data"
}
```

The note flows into `Grant.Describe`, then into the verb's help and the describe model, so a human can supply the description a sparse spec omits without touching Go.
