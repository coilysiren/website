# Identity primitives

What the engine derives about a role beyond what the roster states: the identity
card, the instruction document, and the favorite color. `housecast/render.py`
and `housecast/color.py` own this between them.

**Stub.** The structure is settled and the prose is not.

## The card and the instructions

`identity_card()` renders the compact identity a harness shows: purpose, meld,
voice, boundaries, seats, favorite color. Every literal is copied from the Go
`RenderRoleIdentityCard` rather than paraphrased, because byte-identity with the
Go renderer is the acceptance bar. `thousands()` exists only to reproduce Go's
digit grouping.

`instructions()` is the other half, joining the role skill and its ordered
personality skills into the document an agent reads. `skill_body_sizes()` reports
what each contributes, which is how a card states its own doctrine byte count.

## The favorite color

`housecast/color.py` ports `internal/color/color.go`, and only the compose path
came across: `parse_hex()`, `to_oklab()`, `from_oklab()`, `legible()`,
`favorites()`. Shimmer, nearest-match, ANSI, and background tooling stay in Go
because no bundle depends on them.

The solve is joint rather than per-role. `favorites()` picks for the whole roster
at once so no two roles land too close, and `legible()` holds the band that keeps
every result readable on the surfaces it renders on.

## Still to write

* Why OKLab rather than a simpler space, a real decision recorded nowhere.
* The legible band: its bounds, and what they were tuned against.
* Whether existing roles may move when a role is added.

## See also

* [`composition.md`](composition.md) - where these are derived in the pipeline.
