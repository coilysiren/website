# agent-compose features

Inventory of what ships today.

## Composition engine

* `agent-compose compose` turns a KDL request into an immutable bundle.
* `roster:core` has 7 seats and 10 personalities. Each seat melds one signature
  trait with one bond shared with a sibling seat, and every boundary reaches all
  seven as one owner, two scoped, and four deferring.
  [Role briefings](role-briefings.md) own each charter.
* [External person packages](person-packages.md) and
  [local personality libraries](personality.md) replace the default.
* `personality-library "roster:core"` lets an external package bind the
  [embedded core personalities](personality.md) by slug instead of vendoring
  their bodies. Roles, seats, and identity stay package-exclusive.
* `.agents/roles.kdl` owns [skill-provider repos](role-selection.md), skills, and [repository policy](repository-plan.md).
* [Three model tiers](harness-vendoring.md) declare Core role deployment
  compatibility without changing selected context.
* Materialization promotes admitted `COMPOSED.md` to native `SKILL.md`.
* Resolver traces provider and content outcomes with budgets.
* `boundary-omit` drops a defer-side boundary whose owning seat the deployment does not have, and refuses a scoped grant. See [boundary omission](boundary-omission.md).
* Atomic materialization verifies staged and reused bundles.
* Canonical skills use identity cards and compiled fallback. Role bodies cap at
  400 words, [role boundaries](role-boundaries.md) under a separate one.
* [Role adjacency](role-boundaries.md) names each role's two likeliest absorptions.

## Load-point projection

* `agent-compose project` places verified bundles transactionally at repo or
  container-home load points for four harnesses.
* Sidecar ownership protects foreign files and restores prior owned state.

## Launch-time refresh

* [Launch](native-role-launch.md) adds color, an Enter gate, and a Codex intro.
* A Claude launch passes [identity flags](claude-launch-identity.md), not files.
* Refresh uses validated fallback unless `external-only` forbids it.
* `launch --nested` starts a [second seat from inside a session](native-role-launch.md),
  one hop deep and never over the caller's own load points.

## Inspection

* `config validate` strictly checks staged host configuration without writes.
* `agent-compose describe` renders a collapsible decision tree. `--why`
  follows one item from consideration to outcome.
* `agent-compose diff` reports semantic changes. `verify` checks entry points,
  delivery, traces, and selected identities.
* [Catalogues and export](skill-catalogues.md) provide inspection,
  reproducible archives, and logical content diff.
* `compose` renders the role metadata and the identity texture. `--explain`
  adds the briefing, the credits, the expressions, and the decisions.
* [Evaluation](evaluation.md) derives the board from the roster, runs it with
  `evalkit`, and grades it by hand with the shared `aos-eval`. No mechanical
  scorer anywhere in the loop.
* [V2 migration](release.md) maps v1 roles without aliases.
* TTY colors use canonical identity and pass an OKLab legibility gate.
  Redirects and `NO_COLOR` stay plain.

## Identity surfaces

* [Identity primitives](identity.md) give every personality an ordered emblem
  name list, a `motif`, a `geometry`, a prose `body`, and a `sound-mark`, and
  give every role a prose `stance`. The body and stance are what a generating
  renderer needs to draw the creature without hand-authoring it.
* [Identity renderers](statusline.md) cover the palette, overlays, the
  `acompose statusline` row, `--subagent` rows, and the
  [short id](whoami.md). [`whoami`](whoami.md) prints it. The
  [overlay](overlay.md) carries a separation-solved window `background` beside
  the accent, so a renderer no longer tints its own.
* [`native-ui`](claude-native-ui-surfaces.md) emits per-role Claude Code themes.

## Roster artifact and cascade

* `agent-compose roster --out <dir>` renders lazy-loaded role and personality
  skills plus [native adaptation](native-adaptation.md).
* Bare convergence emits deterministic [`person.json`](person-contract.md).
* `cascade` emits harness doctrine and the role/residency
  `repository-plan.yaml` with sealed provenance.
* `bundle materialize` returns a verified role/harness bundle with provenance.
* Bare `acompose` converges hosts. `--reapply` forces the layout, `--verbose`
  traces `source => destination`, and `-- <command>` refreshes then execs.
  Ward smoke proves idempotence.
* [Local skill catalogues](skill-catalogues.md) consume AOS roots.
* [Release](release.md) publishes unreleased product deltas, including
  roll-forward recovery, under a hold.

## See also

* [../README.md](../README.md) - product boundary and current status.
* [../AGENTS.md](../AGENTS.md) - repo-specific operating rules.
* [../justfile](../justfile) - development recipes.
* [../.ward/ward.yaml](../.ward/ward.yaml) - catalog metadata.
* [Catalog trifecta](https://forgejo.coilysiren.me/coilyco-flight-deck/agentic-os/src/branch/main/docs/features-release-tooling.md).
