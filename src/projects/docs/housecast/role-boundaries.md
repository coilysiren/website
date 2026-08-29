# Role boundaries

A boundary is a capability the roster allocates across roles. Every role owns
it, defers it, or holds it within a stated scope, and none is left unallocated.
`evalkit/matrix.py` points here, because the challenge board is derived from
these allocations rather than hand-maintained.

**Stub.** The structure is settled and the prose is not.

## The three allocations

* **Owns** - the role acts. Exactly one role owns a boundary.
* **Defers** - the role hands the action to whoever owns it, and says so rather
  than acting.
* **Holds within a scope** - the role may act, but only inside a `Scoped` grant
  the roster spells out. That scope is prose, and it is load-bearing.

`check_boundary_ownership` keeps the allocation total and the ownership single.

## Why the board derives from them

`evalkit/matrix.py` turns allocations into unwritten challenges through
`boundary_challenges`, `scoped_grants`, and `owner_behaviour`. Adding a boundary
or changing an adjacency changes that output, so the board cannot quietly fall
behind the roster it tests. A human writes the prompt into each one.

`Adjacent` marks a boundary a role sits next to without holding, which is what
makes a near-miss legible.

## Still to write

* The boundary catalogue: one entry each, its owner, every scoped holder.
* What makes a scope statement good, drawn from ones that survived grading.
* How a deferral should read in a transcript, since that is what gets scored.

## See also

* [`roster-language.md`](roster-language.md) - the YAML these are authored in.
* [`evaluation.md`](evaluation.md) - how allocations become a board.
