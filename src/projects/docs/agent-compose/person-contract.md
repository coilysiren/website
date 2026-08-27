# The person contract

## Roster package contract

The binary embeds one ordered `roster:core` source set as the default. A caller
may select one external package with the same contract:

```kdl
roster "core" {
    role "platform" {
        purpose "Build and land the foundational software the estate is built on."
        model-tier "frontier" "commodity" "oss"
        skill "role-platform"
        method "eval-fixture-suite"
        personality "tenacious" "grounded"
        identity name="opal platform" pronouns="she"
        agent "claude" tier="frontier"
        agent "codex" tier="frontier"
    }
    personality "tenacious" skill="personality-tenacious" color="#8f8c47" motif="rope-fiber"
}
```

A package splits the manifest, roles, personalities, invariant, and definitions
into the [external layout](person-packages.md). The loader validates it before
it becomes a source. A role names its display name, purpose, role skill,
[methods](role-briefings.md), ordered personality meld, and seats. Its optional
`model-tier` list restricts composition, while omission supports all three
tiers. Core roles declare the list explicitly. Core uses exactly two per
role, covers every canonical personality, caps usage at three roles, and
requires legible, distinct derived colors. External packages retain any
nonempty ordered meld. A [role skill](role-briefings.md) needs valid
frontmatter, three paragraphs, and at most 400 body words after its leading
title. Invalid sources fail loading. The default has seven roles and ten
personalities. Its explicit [role-by-tier matrix](harness-vendoring.md) groups
complex, foundational, and high-security roles without changing their
authority. A personality entry is a catalog binding from its canonical name to
a stable skill id (`personality-<name>`). Every role reference needs one or the
loader rejects it. The same selected person source supplies one complete
`SKILL.md` tree for every binding plus the personality invariant. A missing,
empty, extra, or mismatched definition fails source validation. Roster output
therefore carries every selected definition without a capability provider. The
[identity primitives](identity.md) define renderer semantics.

### Favorite colors

Every selected personality declares one hex `color` in its person source, which
owns the exact palette. Bundles tell the agent every active personality's
name, skill, and color plus the melded favorite. The parse gate requires OKLab
lightness 0.60-0.80 and chroma of at least 0.05. Each role derives its favorite
as the OKLab centroid of every component, restores chroma to their minimum, and
clamps it into the legible band - the perceptual middle, never gray.

### Agent seats

A Core role declares one `identity` with a name and pronoun pair. Every `agent`
node is a harness routing selector for that identity. Optional `channel` and
`tier` properties describe routing, and a tier must be canonical and supported
by the role. Launch consumers keep permissions, models, and reasoning effort on
their side. Nothing here grants authority. Every Core Roster role carries
harness seats. Seat keys remain stable join points while the role-owned name
and pronouns remain identical across them. Selecting another seat changes
routing metadata only. External packages authored before role-level identity
may keep `name` and `pronouns` on every seat. A role must use one form
consistently. Mixing role-level identity with per-seat identity fails
validation. Seats are personality-neutral. A compose request selects a role,
which activates its role skill, methods, and ordered personality set. See
[role-skill delivery](role-briefings.md). A private overlay may add scoped
instructions or selection rules. It may not redefine selected roles,
personalities, definitions, or role personality sets. Naming the seat is the
one exception: [seat identity](identity.md). An external package replaces
the embedded default as one unit, and AOS owns no copy of either package.

## Complete person snapshot

Normal bare `acompose` convergence and the hidden roster compatibility command
write `person.json` into the roster artifact directory. The default location is
`~/.agent-compose/sources/personality/person.json`.

### Contract

The JSON format marker is `agent-compose.person-snapshot.v3`, with numeric
schema version `3`. The artifact exports:

* the person name, selected `person:<name>` source provenance, and role order
* every role's purpose, role-skill id, logical source, digest and body
  projection, role-method ids, supported model tiers, ordered meld, color,
  role-stable identity, and seats
* every personality's skill binding, color, emblem, motif, geometry, body,
  and sound mark, and every role's stance
* the fixed renderer expression vocabulary

Roles and personalities are keyed by their stable slugs. `role_order` is the
canonical presentation order. Consumers should use the explicit order rather
than relying on JSON object order. Schema v3 carries optional role
compatibility fields. Model-tier compatibility is additive within v3, and
consumers must ignore optional fields they do not interpret. Consumers pinned
to v2 must upgrade before treating the format marker as compatible.

### Convergence

The snapshot is generated from the loaded person model in the same owned,
transactional roster projection as the human-readable files. A failed
projection restores the prior owned artifact. A second convergence leaves
identical bytes unchanged. The `compose` terminal transcript and compact
identity card render the selected-role slice from this same model. Core
surfaces include the canonical role identity once, harness routing selectors,
personality primitives, and the expression vocabulary. The generated file
remains outside repositories.
Consumers can read it but do not edit it or treat it as a second policy source.

### Authority boundary

The artifact describes public identity, orientation, and compatibility only.
It contains no model choice, reasoning effort, permission, credential,
endpoint, routing decision, or runtime authority. Launch consumers and deployment-specific
systems keep those fields.
