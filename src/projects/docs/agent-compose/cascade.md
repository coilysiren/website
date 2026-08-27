# Cascade

The cascade turns doctrine sources into each harness's global context when
`~/.agent-compose/agent-compose.yaml` exists. Missing config is a no-op.

Bare `acompose` summarizes its roster, outputs, load points, repository plan, skill
links, and repaired drift.
Bare `acompose --reapply` recreates outputs and load-point links.
`acompose --verbose` emits each source, override, manifest, and link as
`source => destination`.

`person_policy: external-only` requires `person_source`. A bad package aborts
before roster or cascade projection can restore the embedded default.

All state lives under `~/.agent-compose`: config, outputs, repository plan, roster,
and cache. A legacy `~/.config/agent-compose` migrates on first use and leaves
a compatibility symlink through the cutover tracked in agentic-os#618.

Explicit `sources` compose first in listed order. Each `roots` entry then adds
sorted `AGENTS.COMPOSE.md` files. That filename marks always-global doctrine
that harness context does not also load.

## Selection and rewrites

A machine may declare `scopes`; a source declares its own in YAML
frontmatter and composes only when the two intersect. Omitting the machine
key disables filtering entirely; under active filtering an untagged source
never leaks in. Frontmatter `harnesses` restricts a source to named
harnesses. Composed bodies are rewritten for their new home: frontmatter
stripped, `## See also` navigation dropped, and relative markdown links
absolutized against the source's own directory.

A sibling `AGENTS.<harness>.md` beside a source patches it for one harness:
sections replace by verbatim heading, new headings append, and an ambiguous
heading fails the compose loudly. When harness slices diverge - by selection
or by override - output splits into `COMPOSED.<harness>.md` files; identical
slices share one `COMPOSED.md`, and obsolete banner-carrying outputs are
removed on convergence.

## Outputs

Each configured load point (claude and codex by default, others via
`load_points`, `null` to opt out) is symlinked at its harness's composed
file, backing up any pre-existing regular file to `.bak`. The strict
[`repository-plan.yaml`](repository-plan.md) is emitted beside the composed
output. It compiles operating context, global policy, role policy, provider
uses, and resident-only pins from trusted KDL with sealed input provenance.
See [Repository plan](repository-plan.md).

`--dry-run` previews only real changes; `--check` verifies every output
against a fresh compose and fails with a diff on drift. Writes happen only
on change, so a converged host recomposes silently.
`agent-compose config validate <path>` checks staged host configuration and a
linked strict provider document without writes.

## Native skill roots

Bare compose can also link authored skill catalogs into harness-native skill
directories through [`skill_load_points`](skill-selectors.md).

Native skill linking uses the compiled residency set from
`repository-plan.yaml`. Repositories contribute `.agents/skills`. The compiled
set precedes verified local catalogues. Existing unowned entries win. Missing entries warn and skip, while
other inspection failures remain fatal. Agent-compose records links in
`~/.agent-compose/skill-mounts.json` and removes only stale links that still
match that ownership record. Fleet pointer aggregation, conditional category
gating, and per-repo capability pulls remain rollout policy outside this
substrate operation.

`skill_catalog_manifest` projects AOS-verified roots without network work.
[Local skill catalogues](skill-catalogues.md) define the trust contract.

## See also

* [integration.md](integration.md) - how roster and cascade fit together.
* [repository-policy.md](repository-plan.md) - strict repository grammar and projections.
* [projection.md](projection.md) - repo and home load-point projection.
* [local-skill-catalogues.md](skill-catalogues.md) - AOS local-root handoff.
