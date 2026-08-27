# Skill selectors and load points

How ordinary skills are selected, and where they load.

## Ordinary-skill selectors

A repository declaration in `.agents/roles.kdl` may bound its ordinary
`.agents/skills` catalogue with `skill` children:

```kdl
repositories {
    repository hardware path="example/hardware-knowledge" {
        skill "compute-stack"
        skill "machine-*"
    }
}
roles {
    role platform {
        use-repository hardware
    }
}
```

Patterns use Go path-match syntax. A literal is exact and `*`, `?`, or bracket
forms provide glob matching within one skill ID. Use `skill "*"` to admit a
provider repository's whole ordinary catalogue.

### Fail-closed validation

The KDL and generated-JSON loaders reject an empty pattern or malformed glob.
At composition time, every pattern must
match at least one ordinary skill. No skill may match two configured patterns.
Unmatched or overlapping patterns fail without producing a bundle.

Agent Compose loads and validates the provider's complete ordinary and
composed catalogues before filtering. A selector therefore cannot hide a
malformed source. Selection retains the catalogue's lexical order instead of
pattern order.

### Evidence and budget

The provider report records the patterns and admitted catalogue fraction.
Selected skill decisions carry that selector outcome. Skills outside the
slice remain explicit excluded decisions with a selector reason, so
`agent-compose describe --why skill:<id>` explains why they did not enter the
bundle.

Context bytes and approximate tokens measure only selected trees. Native and
staged projection consume the same immutable bundle and therefore retain the
same selector evidence and budget across Claude, Codex, Goose, and OpenCode.

See the [role-provider example](../examples/role-provider-selector/README.md)
for a minimal configuration fragment.

## Global skill load points

`skill_load_points` names the harness-native directory each harness reads for
global skills. Converge links the compiled residency set into every wired
destination.

### Defaults

Claude and codex are wired by default, matching `load_points`:

* `claude` - `~/.claude/skills`
* `codex` - `~/.agents/skills`

Claude Code reads `.claude/skills` and never the portable `.agents/skills`
directory, so one shared path cannot serve both harnesses. Goose and opencode
do read the portable directory, but like their instruction load points they
stay opt-in through config.

### Overrides

A configured entry replaces its default. A null or false value opts that
harness out entirely, the same falsy rule `load_points` uses.

Naming one harness leaves the other on its default. Before this, config that
set only `codex` unwired claude silently, and a claude session started with no
global skills at all while codex had the full set.
