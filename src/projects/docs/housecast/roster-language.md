# The roster language

What YAML housecast reads and what it refuses. The loader is
`housecast/roster.py`, the checks are `housecast/validate.py`, and the composed
roster is `housecast/data/roster.yaml`, whose header documents its field ancestry.

**Stub.** The structure is settled and the prose is not.

## Two loaders, one semantics

Ported from the Go engine's `internal/person`. Go parses KDL and housecast parses
YAML, so the loaders differ on purpose. The semantics either one applies once the
file is in memory must not, and `agent-compose#339` keeps the differential test
alive until the Go engine goes.

## The types

* **`Roster`** - roles, personalities, boundaries, the invariant.
* **`Role`** - a charter, its ordered personality meld, its boundary allocation,
  its seats, its favorite color.
* **`Personality`** - a trait definition carrying its own `Emblem` and `Voice`.
* **`Boundary`** - see [`role-boundaries.md`](role-boundaries.md).
* **`Scoped`**, **`Adjacent`** - the two qualifiers on an allocation.

## What it refuses

`validate()` runs before anything resolves, so a bad roster fails at load rather
than at emission: `check_boundary_ownership`, `check_personality_bindings`,
`check_definition_set`, `check_personality_colors`, `check_skill_frontmatter`,
`check_copy_contract`. Their messages quote the Go tests closely enough to find
the Go check from a Python failure.

## Still to write

* A minimal valid roster, and a field reference generated from the dataclasses
  so it cannot drift.

## See also

* [`composition.md`](composition.md) - what the engine does with a loaded roster.
