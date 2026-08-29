# Evaluation

The board runner, `evalkit`. It derives a challenge board from the roster, runs
it through Inspect against Agent Proxy, and hands datasets to the annotator.

**Stub.** The structure is settled and the prose is not.

## The board is derived, not maintained

`evalkit/matrix.py` builds it through `derive()`. Boundary allocations, role fit,
personality, and voice each produce their own challenge shapes. Adding a boundary
or changing an adjacency changes the output, which is what stops the board
falling behind the roster it tests. A human writes the prompt into each derived
challenge, and `challenges.yaml` is where those land.

## The runner

`evalkit/task.py` is the Inspect task, replacing a hand-rolled fan-out with
`inspect eval`. Inspect's epochs are what a repetition count used to be. It runs
**unscored**, because the scorer is a human. That seam is deliberate: a board can
be regraded without re-running it, and a run repeated without regrading it.
Grading is [`grading.md`](grading.md). Transport goes through Agent Proxy,
configured by `AGENTPROXY_BASE_URL` and checked by `agent_proxy_configured()`
before a run rather than partway through.

## The projections

`evalkit/roster.py` projects the person snapshot into the entity roster the
shared annotator renders, spelling out `owns`, `defers`, `scoped`, and traits
there rather than in the shared schema. `evalkit/profile.py` declares this
board's test types: `boundary`, `role-fit`, `personality`, `voice`. Adding one is
a profile edit, never a schema edit.

## Still to write

* The workflow end to end, and what each test type looks for.

## See also

* [`role-boundaries.md`](role-boundaries.md) - the allocations the board derives from.
