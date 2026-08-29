# Features

Coarse inventory of the major capabilities housecast ships. Bugfixes, refactors,
and internal plumbing never earn an entry here.

## Shipped

* **The composition engine.** Reads a roster as YAML, validates it, resolves each
  role's meld and boundary allocation, derives the identity primitives including
  each role's favorite color, and emits an immutable bundle in either delivery
  mode. See [`composition.md`](composition.md) and [`identity.md`](identity.md).
* **The roster language.** `housecast/data/roster.yaml` carries roles,
  personalities, boundaries, and the invariant. See
  [`roster-language.md`](roster-language.md) and
  [`role-boundaries.md`](role-boundaries.md).
* **A roster projection.** `housecast roster` emits the `person.json` shape
  downstream tools read, which is what removed Go from the eval path.
* **evalkit, the board runner.** Derives the challenge board from the roster,
  runs it through Inspect against Agent Proxy, and hands datasets to the
  annotator. It travels with the engine so the graded artifact and the shipped
  artifact stay identical. See [`evaluation.md`](evaluation.md).
* **The grading half.** `housecast grade` under the `eval` extra: schema, pairing,
  annotation, failure taxonomy, one-way export. See [`grading.md`](grading.md).
* **A browser grading surface.** `housecast grade serve` holds one committed run
  open for a grader on loopback, writes every decision back to
  `annotations.yaml` under the same rules the terminal loop enforces, and refuses
  to bind past loopback without `--expose`. See
  [`grading-surfaces.md`](grading-surfaces.md).

## Not shipped

No PyPI distribution. Consumers install from Forgejo with uv, described in the
README. The name claim is `agent-compose#347` and waits on Kai. The Go engine in
agent-compose still exists and still composes. It is deleted under
`agent-compose#339`, which is blocked separately.

## See also

* [`../README.md`](../README.md) - what housecast is and how it pairs with acompose.
* [`../AGENTS.md`](../AGENTS.md) - agent-facing operating context.
