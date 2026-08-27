# Load-point projection

Composition is harness-blind. Projection only places verified content at paths
the harness reads. Canonical native instructions carry the selected role's
compact identity card and mandatory skill ids. Compiled context also embeds
the selected role and personality bodies.

```
agent-compose project <bundle-dir> --layout <name> --scope repo|home --target <dir>
```

## v0.1 layout registry

Every layout declares load points per delivery mode. Native-skills bundles
place the instructions file plus each selected skill tree; compiled bundles
place the single compiled context document at the instructions load point.

* `claude` - instructions to `CLAUDE.md`, skills to `.claude/skills/<skill-id>/`.
* `codex` - instructions to `AGENTS.md`, skills to `.agents/skills/<skill-id>/`.
* `goose` - instructions to `.goosehints`, skills to `.agents/skills/<skill-id>/`.
* `opencode` - instructions to `AGENTS.md`, skills to `.agents/skills/<skill-id>/`.

A layout that lacks load points for a bundle's delivery mode fails with a
diagnostic. Layout names and load-point paths live only in this layer; they
never appear in the resolver, the request, the manifest, or the bundle tree.

## Home scope

`project --scope home` treats the target as a home root and uses each
harness's global load points, for any launch owning the whole home. That covers
containers and the native session home a consumer names through
`AGENT_COMPOSE_RUNTIME_HOME`. Such a launch replaces the host global load point,
so its bundle leads with the operating base instead of inheriting one:
claude `.claude/CLAUDE.md` + `.claude/skills`, codex `.codex/AGENTS.md`,
goose `.config/goose/.goosehints`, opencode `.config/opencode/AGENTS.md`,
with `.agents/skills` as the portable global skills directory for all but
claude. Verified 2026-07: goose documents the global hints path and the
`~/.agents/skills` recommendation; opencode lists its global rules and skill
locations; claude and codex global paths are corroborated by their official
docs and this fleet's live v1 load-point symlinks.

## Upstream conventions (verified 2026-07)

All four harnesses read Agent Skills (SKILL.md) natively, and
`.agents/skills/` is the portable standard location: goose documents it as
the recommended skills directory (its Skills platform extension is on by
default), and opencode discovers project skills from `.opencode/skills/`,
`.claude/skills/`, and `.agents/skills/`. Compiled delivery gives consumers
one instruction document.

Claude Code is the exception on both portable conventions. Its documented
skill locations are `.claude/skills/` and `~/.claude/skills/` only -
third-party claims of an `.agents/skills/` alias are not corroborated by the
official docs or changelog - and it does not natively read AGENTS.md either;
the documented workaround is a symlink or an `@AGENTS.md` import from
CLAUDE.md. The claude layout therefore keeps `CLAUDE.md` and
`.claude/skills/`.

Goose combines configured context files. Its layout writes `.goosehints`
beside a repo-owned AGENTS.md. OpenCode reads root AGENTS.md and falls back to
CLAUDE.md only when AGENTS.md is absent.

## Ownership and safety

Projection verifies and reads the bundle before it locks or changes the
target. `.agent-compose/projection.json` records every owned file. Projection
refuses foreign files, replaces only its prior files, removes stale owned
files, and leaves the immutable input bundle untouched. A write or cleanup
failure restores the prior files, modes, and sidecar, so consumers retain the
last known-good projection.

An adapter can project into an empty private home, remove `.agent-compose/`
after the transaction, then validate and wrap the selected load points. See
[staged-home.md](staged-home.md). Agent-compose does not emit that handoff
manifest or receive its authority.

## See also

* [bundle-protocol.md](bundle-protocol.md) - the tree projection consumes.
