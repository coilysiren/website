# Identity overlay

`agent-compose overlay` projects one selected person-package member into a
compact surface.
It is deliberately noninteractive. Terminal panes can use the plain card, and
other renderers can consume the same versioned JSON document.

## Text

Supply a role, harness seat, and renderer state:

```sh
agent-compose overlay \
  --person-source ./person \
  --role platform \
  --seat codex \
  --expression acting
```

Omit `--person-source` to use the embedded `roster:core` default.

The default text width is 40 columns. `--width 200` collapses the same fields
onto one line. Output contains no control sequences, so pipes and CI receive
stable plain text.

## JSON

Add `--json` for `agent-compose.overlay.v1`. The document contains:

* person, role, `role_display_name`, purpose, and selected seat
* `annotation`, the composed identity string a renderer shows verbatim
* the caller-supplied expression
* the role's derived favorite color, and its derived `background`
* every component personality's color and identity primitives, including its
  `geometry` token and its prose `body`
* the role's `stance`, its posture, which no personality carries

## Rules a generating renderer respects

Each was paid for by a specific failure while the first creatures were drawn.
Preserve them through any rewording of the fields themselves.

* **Anatomy leads, the object follows.** `archetype` describes a creature before
  `attachment` names the object. Reversing it produced a fairground ride on a
  plinth with no body under it.
* **Stance derives from the signature, never the bond.** Reading a bond for
  posture collapsed a hauling creature into a settled quadruped and made two
  seats indistinguishable. Stance living on the role forbids it.
* **A bond tints, it never adds a second object.** Two named objects make a
  renderer drop one, and it drops the signature. A bond contributes through
  `motif` and `color`.
* **The creature is painted from `color`, and the prose never names it.** The
  personality's authored accent is the creature's own colour, so a colour word
  in `archetype` or `attachment` restates a hex that can move without it. What
  the prose may name is a material's intrinsic colour, which `motif` already
  carries: brass is brass whatever the accent does, and moss is green without
  being told. The two are distinguishable by the test of whether changing the
  hex would make the sentence false.
* **A meld whose two geometries match cannot be told apart.** `playful` and
  `imaginative` were both `radial` and are melded, so the bond converted the
  signature rather than dressing it. Every arrangement is now distinct across
  the roster, which is what keeps the rule satisfied rather than documented.

Clause ordering, style, proportion locks, negative prompts, per-checkpoint
negatives, and detail register stay with the renderer. It names a personality by
slug and reads these fields back rather than holding creature text of its own.

The JSON is a projection of the selected person model, not a second policy
source.

## Why the background is derived here

`favorite_color` is an accent, solved in the terminal-legible band. A renderer
that wants a window background has been tinting that accent into a near-black
of its own, and seven accents tinted the same way land inside the
side-by-side JND of each other: the closest pair measured 0.0109 in OKLab
against a solved 0.0386.

Separation is a property of the set, so a consumer holding one overlay cannot
compute it. Only the roster sees every role at once. `background` holds each
role's own hue, moves the set onto equal spacing at one low lightness and
chroma, and picks the rotation offset that turns every role the least. Roster
loading asserts a floor on the closest pair, so an eighth role that runs out of
hue circle fails at load rather than shipping two windows nobody can tell
apart. The derived set is committed in
[`internal/palette/role-palette.txt`](../internal/palette/role-palette.txt), so
a roster edit arrives as a diff.

## Annotation

`annotation` is the one identity string every terminal surface shows for a
session, so a window title, a status row, and a launch flag never drift apart:

```text
Angie [she] (Agentic Platform Engineer)
```

Agent Compose owns the shape. A renderer that has the document shows the field
rather than reassembling it from the seat name, pronouns, and role. Both fields
are additive to `agent-compose.overlay.v1`, so a consumer built before them
keeps parsing the document unchanged.

The plain text card stops at `Angie [she]`, because it already prints the role
on its own line.

## State boundary

The caller supplies one expression from the fixed person vocabulary. Unknown
roles, seats, and expressions fail closed. Agent-compose never inspects a
process, trace, log, queue, agent runtime, or launcher state to infer an expression.

This keeps the overlay suitable for terminals, browser shells, streams, and
future mobile surfaces without turning identity data into observability.

## See also

* [identity-primitives.md](identity.md) - renderer semantics.
* [person-packages.md](person-packages.md) - external package selection.
* [person-snapshot.md](person-contract.md) - complete person export.
