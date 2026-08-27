# Integration and delivery tiers

Agent-compose is the shared context substrate for knowledge sources, native
harnesses, and isolated launch consumers. It materializes the selected context
surface while launchers keep authority outside that surface.

The v1 Python composer was absorbed into
[`agent-compose cascade`](cascade.md), which composes doctrine sources into
`~/.agent-compose/COMPOSED.<harness>.md`, symlinks each harness's
global load point at the result, applies scope and harness filtering with
per-harness section overrides, and emits a strict repository plan.

## The seam rule

On a host, the cascade owns the harness global load points and everything
else (roster, overlays) feeds it sources. In a container, projection owns
the whole home and no cascade runs. No path is ever written by both.

Host convergence may also mount skills from repositories in the compiled
residency projection into configured harness-native skill directories.
Agent-compose owns links recorded in its sidecar. Infrastructure still
owns the load points a host declares.

## Host tier: context rides the native cascade

Agent-compose renders the selected person package into a roster artifact under
`~/.agent-compose/sources/`, a directory the cascade walks as a source root,
containing an `AGENTS.COMPOSE.md` entry plus lazy-loaded role and personality
skills. The entry carries the invariant, admitted overlay instructions,
adaptation bootstrap, and cards with role identity, harness selectors,
boundaries, emblems, colors, cues, and skill ids.
Host config may select one
[external person package](person-packages.md), which replaces the embedded
default before this artifact is rendered.
Under the [role-selection contract](role-selection.md), an unassigned agent
infers and records its initial role. Host-only
[native adaptation](native-adaptation.md) lets a direct user switch among
roles without another confirmation. Agent-proposed role and personality
changes require confirmation. The default needs no external source.

Running `agent-compose cascade` then carries the table into every harness's
global load point - one binary, no Python. Global bootstrap context loads at
session start. The selected role and boundary skills load before action rather than
every long-form body loading eagerly. Two agents sharing a (harness, role)
pair share a routing seat. Every harness for a role uses the same identity.

## Container tier: v2 owns the home

`verify` checks a read-only bundle, then `project --scope home`
transactionally fills the claude, codex, goose, or opencode global load
points. Black-box fixtures prove that each native home contains ordinary,
selected role, role-composed, and active personality skills. Compiled homes contain all
selected prose, and neither path changes the input bundle. Projected
instructions keep the caller-selected role fixed under the
[same contract](role-selection.md). A switch requires a new bundle. A
composition adapter can use an empty private target under the
[staged-home contract](staged-home.md).
[Role-scoped bundles](role-selection.md) project unchanged in either tier.

## Migration state

The cascade is native as of v0.2.0. Fleet cutover belongs to AOS and
infrastructure and is tracked in
[agentic-os#618](https://forgejo.coilysiren.me/coilyco-flight-deck/agentic-os/issues/618).
Hosts must reconcile hand-edited snapshots into sources before cutover.

## See also

* [projection.md](projection.md) - the load-point layer both tiers drive.
* [staged-home.md](staged-home.md) - isolated adapter handoff.
* [launch.md](launch.md) - refresh-then-exec and the recursion guard.
* [person-contract.md](person-contract.md) - roles, seats, and colors.
* [person-packages.md](person-packages.md) - external package selection.
* [role-briefings.md](role-briefings.md) - role charter delivery.
* [architecture.md](architecture.md) - composition inputs and ownership.
* [repository-policy.md](repository-plan.md) - the compiler and consumer seam.
