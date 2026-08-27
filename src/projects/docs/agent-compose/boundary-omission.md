# Boundary omission

When a deployment composes without a boundary, and what stops that meaning too much.

## The case for it

The defer side of a boundary is routing: hand this to the role that owns it. A
deployment where that role is not a seat has nowhere to route, so the rule
reads as a stop rather than a handoff, and the agent defers work nobody will
pick up. A single-agent deployment hits this on every boundary it defers.

A request states the absence directly:

```kdl
compose {
    role "eval"
    boundary-omit "modify-live-backend" "seek-external-validation"
}
```

The omission removes the boundary from the composed set entirely: no body in
the bundle, no name on the identity card, no entry in the manifest. Naming a
boundary whose body is absent is worse than either, because the card then
describes doctrine the agent cannot read.

Three refusals keep the knob from meaning something it should not:

* An unknown boundary name fails rather than no-opping, matching the rest of
  the request parser.
* A boundary the role **owns** cannot be omitted. An owner losing its own
  boundary is a larger claim than a deferrer losing one, and it would leave the
  boundary with no side that holds it.
* A boundary the role does not activate fails too, so a stale request surfaces
  instead of quietly expressing nothing.

The decision trace records each omission as an excluded profile decision. A
bundle that quietly lacks a boundary is worse than one that never had it,
because the review surface stops telling the truth.
