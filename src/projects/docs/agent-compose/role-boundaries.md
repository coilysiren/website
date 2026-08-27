# Role boundaries

A boundary is one behavior removed from several roles and allocated to exactly
one owner. Use one when restating that allocation per charter would let the
copies drift apart. A body every role declares is a roster-wide rule instead.

## Why boundaries exist

Role skill bodies have a 400-word ceiling. Before boundaries, every role sharing
an allocation restated it in its own charter, so shared policy competed with
role-specific prose for one budget. Extraction freed 602 words across the Core
Roster with no doctrine lost, and each side is bounded separately.

## How a boundary differs from its neighbours

* Personality - shared and eager too, but carries disposition, a color, and identity primitives, and never overrides a role obligation.
* Method - progressive disclosure, owned by exactly one role, inactive until role and task both match.
* Boundary - one behavior removed from several roles and allocated to exactly one owner.

## Package layout

Declare the catalog entry in a library, then reference it from each role:

```kdl
boundary "modify-live-backend" skill="boundary-modify-live-backend" owner="sysadmin" summary="Systems Administrator changes running backend systems, other roles observe and hand the action over"
```

```kdl
role "platform" {
    skill "role-platform"
    boundary "suggest-external-comms"
    personality "tenacious" "grounded"
}
```

Store each body beside the personality definitions:

```text
libraries/kai-core/boundaries/01-modify-live-backend.kdl
libraries/kai-core/definitions/skills/boundary-modify-live-backend/SKILL.md
```

The catalog id, `skill` property, and frontmatter name must agree, so boundary
`modify-live-backend` binds `boundary-modify-live-backend`. An unreferenced boundary fails loading.

## Three states, not two

A role owns a boundary, defers it, or **holds it within a scope**. The third is a
bounded grant rather than an absence, so it needs a declaration of its own: the
limit text is the whole content, and a role that simply omits a boundary says
nothing at all.

```kdl
role "gamedev" {
    boundary "build-foundational-software" "seek-external-validation"
    boundary-scoped "modify-live-backend" scope="a local world you run yourself, never a hosted surface"
}
```

Scoping is not deferring, and the parser rejects a role that does both for one
boundary. An owner may not scope its own boundary either, since it already
receives the body by owning it and would be handed two contradictory sides.

The scoped side of the body sits between the own and defer sides, under
`## If you hold this boundary within a scope`. It is **optional**: a boundary
nobody scopes needs no third section, which is what keeps packages authored
before this axis loading unchanged. A role that scopes a boundary whose body
lacks that section fails to load, so the grant can never arrive without its
instructions.

### What it buys the evaluation board

A boundary is scored as a pair, the in-half proving the rule fires and the
out-half proving it does not fire on the neighbouring case that must still be
served. A scoped grant fits neither half, so it earns its own pair: a
within-scope case proving the grant actually works, and a beyond-scope case
proving the limit holds. That moves the measured question from *does the rule
fire* to *does the grant hold its limits*, and "acted, but exceeded the scope"
is the failure a binary model cannot see.

`evalkit.matrix` derives that pair from `scoped_boundaries`, within-scope as the
in-half, so `in` means one thing in all three states: acting on own territory.

## Selection and delivery

Agent Compose selects a boundary with every role that declares it and with its
owner. The identity card lists them under `Boundaries`, marking each as owned or
deferred, and repeats them in `Active doctrine` so the agent loads them before
acting. Sharing one body is expected, not a collision.

The bundle manifest records the selected boundaries, the decision trace carries one
`boundary:<id>` entry per role, and bundle verification fails when the manifest and
trace disagree.

## Evaluation

Packs carry boundary bodies in a `boundaries` block beside the briefing, so
doctrine that left a charter still reaches the driver rather than scoring an
incomplete role. Both sides receive the body, so both owe its case. Changing a
body moves the pack digest for every role on either side, retiring those results
until an independently reviewed re-run.

## Core Roster boundaries

Each slug names the behavior that moves. Every boundary reaches all seven seats
as one owner, two scoped, and four deferring, so a missing seat is a defect.

* `build-foundational-software`, owner platform - scoped for sysadmin and eval, who write estate configuration and measurement instruments. Deferred by frontend, gamedev, tpm, and devrel.
* `modify-live-backend`, owner sysadmin - scoped for platform and gamedev, who run CI, local environments, and a local world. Deferred by devrel, eval, frontend, and tpm.
* `suggest-external-comms`, owner devrel - scoped for frontend and gamedev, who write the words inside the artifact they own. Deferred by platform, sysadmin, eval, and tpm.
* `seek-external-validation`, owner tpm - scoped for devrel and platform, who read their audience and audit a candidate dependency. Deferred by frontend, sysadmin, gamedev, and eval.

## See also

* [Role skills](role-briefings.md) - charter and progressive-disclosure model.
* [Boundary owners](ownership.md) - the two-sided relationship.
* [Role methods](role-briefings.md) - single-owner lazy procedures.
* [Personality libraries](personality.md) - the shared disposition axis.
* [Role-skill context budget](eval-engineer.md) - measured budget effects.
* [Evaluation](evaluation.md) - deterministic packs and review policy.
