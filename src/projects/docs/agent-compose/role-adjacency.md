# Role adjacency

Adjacency names the two roles whose work a role is most likely to absorb, and
why. It is the axis the evaluation board reads to author role-fit cases.

## Directed, not symmetric

Absorption risk runs one way. The Systems Administrator sequencing follow-up
work after an incident is a live confusion, while the Portfolio Director
rarely reaches for a runbook. Declaring that pair symmetrically would buy a case
nobody fails.

So a role names who it drifts toward, and the reverse edge is a separate
decision. Do not add a symmetry check.

## Out-degree is fixed at two

Two forces the roster to pick the sharpest confusions rather than list every
plausible neighbour. Every role declares exactly two, or the roster declares
none at all. The all-or-nothing rule keeps external person packages authored
before this axis loading unchanged.

## The reason is generator input

Each edge carries a `reason`. It is not commentary. An adjacency case has to
construct one specific confusion, and a generator handed a bare pair will
invent the wrong one on exactly the edges that matter. An edge nobody would
guess is either a mistake or load-bearing, and the reason is how a reader tells
which.

## Package layout

Declare one node per edge, since each edge carries its own reason:

```kdl
role "sysadmin" {
    skill "role-sysadmin"
    boundary "suggest-external-comms" "seek-external-validation"
    boundary-scoped "build-foundational-software" scope="executable configuration only your own estate consumes"
    adjacent "platform" reason="implementing the fix instead of handing it back with observed evidence"
    adjacent "tpm" reason="sequencing follow-up work after an incident instead of surfacing it as findings"
    personality "protective" "grounded"
}
```

Loading fails on a self-edge, a repeated target, a missing reason, an unknown
target role, or an out-degree other than two.

## How adjacency differs from a boundary

A boundary removes one behavior from several roles and allocates it to an
owner, so it already tests each member against that owner. Adjacency covers the
confusions no boundary allocates.

Spend adjacency slots accordingly. An edge earns its slot when it points where
no boundary reaches: at a seat that owns none, or at a gap the allocation leaves
open. Two of the fourteen below name a confusion the owner's boundary already
blocks, which is not wrong but tests compliance rather than something new.

## Core Roster graph

```text
platform -> sysadmin, eval
sysadmin -> platform, tpm
eval     -> platform, gamedev
frontend -> devrel, gamedev
gamedev  -> frontend, sysadmin
tpm      -> devrel, eval
devrel   -> frontend, tpm
```

In-degree is even at two for every seat. The nine-seat roster had Engineer
absorbed by five of nine edges, a gravity well the seven-seat allocation
removes: `build-foundational-software` now seals the seats that used to spend an
edge on "might implement it".

## See also

* [Role boundaries](role-boundaries.md) - shared behavior allocated to one owner.
* [Boundary owners](ownership.md) - the two-sided relationship.
* [Role skills](role-briefings.md) - charter and progressive-disclosure model.
* [Evaluation](evaluation.md) - deterministic packs and review policy.
