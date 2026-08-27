# Architecture

Agent-compose sits between knowledge providers and context consumers. Providers
author reusable knowledge. Agent-compose selects and installs it for a harness.
Consumers supply runtime facts and executable authority outside the bundle.

## Terminology

Nine words. Three name what an agent is, two are what the shared grading layer
calls those, and four name the loop that measures them.

* `role` - one seat with a purpose, a charter, and the work it owns. See [role briefings](role-briefings.md).
* `personality` - a disposition a role melds. Two per core role, one signature and one bond shared with a sibling seat. See [personalities](personality.md).
* `boundary` - one behavior removed from several roles and allocated to one owner. A role owns it, defers it, or holds it within a scope. See [role boundaries](role-boundaries.md).
* `entity` - what is under test. A role here, a deployed lane in another deployment, so `aos-eval` names the abstraction rather than either.
* `attribute` - what is being tested about the entity. A boundary or a personality here, a clause elsewhere.
* `challenge` - one question put to a composed entity, with a target saying what passing means. The roster derives it unwritten, and a human writes it.
* `task` - one run putting the written challenges to the subject. Five epochs, unscored, because the grader is a human.
* `annotation` - one human verdict on one answer, carrying a critique wherever it deducts.
* `revision` - the edit a failure drives, in a charter, a boundary body, or the challenge itself.

A role melds personalities and holds boundaries. The roster derives its
challenges. You write them, run them as a task, annotate the answers, and the
failures drive a revision. See [evaluation](evaluation.md).

A role **is** an entity, and a personality and a boundary **are** attributes.
That mapping is why one grading layer serves a composed prompt here and a live
Discord agent in sirens-echo without either shape leaking into the other.

## Composition inputs

The caller supplies every input. Agent-compose infers nothing about the agent:

* `person source` - the caller may name one complete external package. Omission
  selects the embedded `roster:core` default.
* `role` - the caller names it, the selected person source validates it, and the role
  activates every personality it declares.
* `model tier` - the caller selects `frontier`, `commodity`, or `oss`, and the
  role may reject it before bundle materialization. A supported tier receives
  the same complete context as every other supported tier.
* `delivery` - native skills or compiled context.
* `source locators` - where optional capability files live. AOS's knowledge
  inventory is inferred from its provider root.

Model identity, harness, reasoning effort, interactivity, permissions, and task
acceptance stay with the launcher and consumer. Repositories only host
capability files reached through source locators.
Consumers map concrete models into the stable tiers. Claude and Codex are
frontier examples, DeepSeek is commodity, and Ornith or Mistral are OSS.
The Core Roster applies those tiers through its
[role compatibility matrix](harness-vendoring.md).

## Policy ownership

Agent-compose embeds the eleven-role Core Roster, `roster:core`, as its
public-safe default. A caller may
select one complete [external package](person-packages.md) instead. Selection
is exclusive. The package owns identity policy and
[role methods](role-briefings.md). Capability sources add knowledge but cannot
redefine package names or bodies.

Personality definitions live inside person-package skills. Agent-compose
discovers ordinary skills and a `.agents/roles.kdl` graph for
skill-provider repos and composed skills. Imported graphs do not recurse. Overlays may use
explicit source declarations. An optional legacy AOS invariant and personality
copy remains readable during rolling upgrades. Byte-identical copies shadow
behind the selected person source.

The resolver evaluates admitted private overlays in request order, then AOS
sources in request order. Byte-identical candidates for one delivery slot
deduplicate to the highest-precedence copy. Non-identical collisions fail in
v0.1 rather than adding an override grammar.

## Composition flow

Agent-compose loads exactly one person source, validates the role, selects
matching instructions, role and method skills, active personalities, and
provider skills, then materializes the bundle. It records
what it picked and why as each decision occurs.

## Integration obligations

Knowledge providers publish reusable doctrine, ordinary skills, capability
sources, instructions, and composed-skill bindings under stable relative
paths. They carry no copy of the selected person source or personality
definitions.

A consumer may build the compose request and adapt a verified home projection,
treating the source bundle as immutable. Authority and credentials never enter
the request. Agent-compose is a context producer, not a permission engine.
Consumers can run without composed context, and agent-compose can serve native
harnesses without a composition adapter.

## See also

* [kdl-contracts.md](kdl-contracts.md) - human-authored input grammar.
* [person-contract.md](person-contract.md) - validated person-package policy.
* [person-packages.md](person-packages.md) - isolated external package boundary.
* [bundle-protocol.md](bundle-protocol.md) - immutable output contract.
* [decision-trace.md](decision-trace.md) - retained decision evidence.
* [projection.md](projection.md) - the harness-aware load-point layer.
* [integration.md](integration.md) - the v1 cascade seam and delivery tiers.
