# Role briefings and methods

What a role briefing carries, and the methods a role may apply.

## Role skills

Each person profile owns one ordinary role skill. KDL keeps compact identity data and leaves long-form doctrine in the skill body. It may also own [role methods](role-briefings.md) set by the package's cross-role policy, and activate [role boundaries](role-boundaries.md) sharing doctrine outside its budget.

### Profile layout

A role fragment binds a stable skill id:

```kdl
role "tpm" {
    display-name "Portfolio Director"
    purpose "Decide what the portfolio does next, and carry each decision to its gate."
    skill "role-tpm"
    personality "decisive" "outward"
}
```

The body at `roles/tpm/SKILL.md` needs ordinary frontmatter, matching
`role-<slug>` metadata, three paragraphs, and at most 400 words after its
title. V1.x packages may retain an inline `briefing`. The compatibility adapter
projects it as an in-memory `role-<slug>` skill. A role cannot declare both
forms, and the adapter never writes a second mutable source tree.

### Progressive disclosure

An assigned native bundle materializes the selected role skill, its role
methods, and every personality skill in its ordered meld. Startup instructions
carry the fixed role bootstrap and a compact identity card. The card retains
purpose, harness seats, one role-owned name and pronoun pair, personality
emblem names, motifs, colors, cues, melded color, and skill ids. Compact
fields use ` // `. The native roster installs role and personality skills for
discovery without loading their bodies globally. After role selection, the
agent reads that role skill and its complete meld before acting. Compiled
delivery has no native skill loader. It appends the selected role skill first,
then the active personality skills, role methods, and capability skills, so its
behavioral content stays equivalent without emitting unusable pointers.

### Authority boundary

Role skills define identity and the feedback loop a role owns. Capability
providers define task methods. Ward and guarded runtime policy define
executable authority. Developer Advocate (`devrel`) owns every recommendation
about communication addressed outward, including wording, tone, framing,
timing, channel, reply strategy, and editorial fitness. Other roles retain
mechanical records and defer only for recommendations, and two hold a named
scope over the words inside an artifact they own. External action still
requires task, runtime, and user authorization. Agentic Platform Engineer
(`platform`) owns foundational software. Systems Administrator (`sysadmin`)
owns controlled running-system change, live verification, and rollback.
Evaluation Engineer (`eval`) stays read-only around running backends unless the
runtime grants an enforced disposable fixture mode. No role skill grants
commands, credentials, mounts, network access, deployment, model selection, or
permission.

Design Engineer (`frontend`) owns the surface a person navigates and builds it
as well as shapes it: responsive presentation, components, tokens,
static assets, semantic structure, focus treatment, metadata, empty states, and
the route, rendering, accessibility, and navigation tests that hold them.
Business rules, state machines, runtime data, APIs, persistence, permissions,
migrations, and shared tooling are foundational software and return to
platform. `devrel` may land content-only repository changes, including
human-facing literals embedded in code. That exception requires unchanged
control flow, state, schemas, structured contracts, and executable behavior.
Portfolio Director (`tpm`) owns code review as a gate decision, so a
defect returns to the owning seat with evidence rather than with a patch.

## Role methods

A person package may bind progressive-disclosure method skills to one role.
Use a role method when the procedure is determined by that package's roster
policy and would become misleading if copied into a general knowledge provider.

### Package layout

Declare method ids in the owning role fragment:

```kdl
role "eval" {
    skill "role-eval"
    method "eval-fixture-suite"
}
```

Store each body under that role:

```text
roles/eval/SKILL.md
roles/eval/skills/eval-role-comms/SKILL.md
roles/eval/skills/eval-role-live-ops/SKILL.md
```

Every method directory contains only `SKILL.md`. The frontmatter name matches
the declared id. Missing, extra, malformed, duplicate, or cross-role duplicate
methods fail package loading.

### Selection and delivery

Agent Compose selects methods only with their owning role. The selected role's
identity card names them without eagerly loading their bodies. Native delivery
projects them as discoverable skills, while compiled delivery appends the same
selected bodies to preserve behavior for harnesses without a skill loader. Bare
roster convergence installs every method beside role and personality skills so
an inferred interactive role can activate it. The roster instruction keeps
methods inactive until both the current role and task match. Assigned AOS
launches consume the verified bundle and own no copy of the method source.

### Core Roster methods

The Core Roster declares none. The two evaluation methods it carried were
scaffolding for the boundaries in #254 and retired with them. The primitive
stays available to any package whose roster policy needs a single-owner
procedure. A method is owned by exactly one role. When the same procedure binds
several roles, use a [role boundary](role-boundaries.md) instead.
