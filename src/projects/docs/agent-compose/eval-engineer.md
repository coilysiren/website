# The eval role and its context budget

The Evaluation Engineer role, and the skill context budget a role works within.
Measurements below the first section are historical and name the roster of the
day, so they keep the slugs they were taken against.

## Evaluation Engineer

The eval seat owns the evidence loop for model and agent behavior:

`instructions -> context -> model -> inference runtime -> hardware -> observed behavior`

The role maintains prompt and context experiments, evaluation cases and
baselines, raw-response provenance, capability and inference measurements,
benchmark runners, scoring and aggregation tools, rankings, diagnoses, and
model recommendations grounded in supplied evidence. Prompt engineering is one
method in that loop, not the whole role. It also owns the done-condition, which
the retired qa seat carried: correctness is defined before execution, and never
by whoever produced the thing under test.

Its scope on `build-foundational-software` covers its own runners, probes,
graders, and aggregation. The shared tooling those measure belongs to platform.
sysadmin owns deployment, live verification, rollback, and recovery claims.
devrel owns communication addressed outward, and tpm owns investment decisions
and the reach outside the local frame. Role doctrine grants no model transport,
hardware, deployment, or executable authority.

Lower model tiers remain disabled until their complete evaluation lanes pass.
The role may draft deterministic packs and preserve evidence gaps without
fabricating scores, raw responses, hardware facts, or operational state.

See [model tiers](harness-vendoring.md), [evaluation](evaluation.md),
and [role-scoped providers](role-selection.md).

## Role-skill context budget

This comparison measures the role-skill migration against released `v1.32.0`.
Both sides use the embedded `roster:core` profile. The assigned measurement uses
`testdata/contracts/native.kdl` with Engineer selected. Approximate tokens use
the deliberately simple `ceil(bytes / 4)` heuristic.

* Unassigned native Codex - `AGENTS.COMPOSE.md` fell from 31,578 bytes
  (about 7,895 tokens) to 14,434 bytes (about 3,609), a 54% reduction.
* Unassigned native Claude - `AGENTS.COMPOSE.md` plus `AGENTS.claude.md`
  fell from 32,961 bytes (about 8,241 tokens) to 14,616 bytes (about
  3,654), a 56% reduction.
* Assigned Engineer bundle - startup `content/instructions.md` fell from
  7,215 bytes (about 1,804 tokens) to 2,145 bytes (about 537), a 70%
  reduction. The role and personality bodies remain present as selected
  skills, and compiled delivery still embeds them.

`just test` runs `scripts/context-budget.sh` and reports the current
measurements. The released baseline is retained here because rerunning a newer
binary cannot reconstruct an older renderer.

### Boundary extraction

Extracting the shared communication and live-operations boundaries into
[role boundaries](role-boundaries.md) freed 602 words of role body prose across the eight
Core Roster roles, from 2,759 to 2,157, a 22% reduction. Per role: engineer 295
to 180, director 318 to 195, qa 298 to 196, ops 394 to 264, design 395 to 364,
exec 288 to 226, ai 369 to 330, and creator unchanged at 402 because it owns
the communication boundary rather than deferring to it.

The boundary bodies are additive rather than deducted. Each is bounded by its own
400-word ceiling and never enters `Role.Briefing`, so the freed budget is
available to role-specific charter prose.

### Boundary rescope

Measured after the rename, the slug changes, and the owner sections. Each side
of a boundary is bounded separately at 400 words:

* `modify-live-system` - own 112, defer 234
* `suggest-human-comms` - own 111, defer 141
* `seek-external-validation` - own 157, defer 178

Owner prose left the charters that duplicated it. Content Creator fell from 399
to 318 words and is no longer one word under its ceiling, DevOps from 262 to
252, and Executive Strategist from 244 to 220 once the boundary took the claim
that outward reach is its work.

### Bounds on every shipped entry

Ceilings bind every person package, since they protect the context budget of
whoever loads it. Floors bind the roster this repo ships, since they are an
editorial standard rather than a consumer protection, and an external package
with deliberately terse prose is not wrong.

* role body - 140 to 400 words. Shipped range 178 to 362.
* personality body - 120 to 320 words. Shipped range 150 to 270.
* boundary side - 80 to 400 words. Shipped range 105 to 228.

Evaluation matrices carry no bounds. They are fixtures rather than doctrine, and
their length follows the case they describe.
