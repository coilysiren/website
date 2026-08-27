# Person packages

## External person packages

One agent-compose installation can use a person package that is completely
independent of the shipped Core Roster, `roster:core`. Selection is exclusive.
Agent-compose never merges roles, role methods, seats, personalities,
definitions, or evaluation context across the two packages. The package owns
identity and operating policy. Capability providers still own general skills
and reusable doctrine. Launchers still own models, permissions, credentials,
tools, and execution authority. Authors follow
[person-package-authoring.md](person-packages.md).

### Bundle composition and host convergence and direct identity and evaluation commands

A portable request selects a package relative to the request file:

```kdl
compose {
    person-policy "external-only"
    person-source "person"
    role "builder"
    model-tier "commodity"
    delivery "native-skills"
    source "knowledge" root="knowledge"
}
```

Omitting both person nodes selects the embedded `roster:core` default.
`person-policy "external-only"` requires its paired source. The bundle manifest
records `person:<name>`, never the local package path.

The host config selects a package with `person_source`:

```yaml
person_policy: external-only
person_source: /path/to/person
sources:
  - /path/to/AGENTS.md
roots:
  - ~/.config/agent-compose/sources
load_points:
  claude: ~/.claude/CLAUDE.md
  codex: ~/.codex/AGENTS.md
```

The path may be absolute, config-relative, or home-relative. `external-only`
makes the selection machine-wide. Requests and direct person commands inherit
the source when they omit one. A request may name another external package.
Missing or invalid sources abort before projection. Refresh-then-exec also
refuses last-known-good fallback because that projection may use the default.
The direct `project` command rejects embedded-person bundles under the guard.
Without `person_policy`, removing `person_source` returns bare convergence to
the embedded default. Existing installations retain that behavior. The custom
package and its machine rollout belong in their own repository or host
configuration. They do not belong in the public agent-compose engine.

Person-dependent commands accept the same package explicitly:

```text
agent-compose evaluation \
  --person-source /path/to/person \
  --role builder --seat codex
```

`overlay`, `roster`, and `palette-data` accept the same flag. Under the host
guard they inherit its source when the flag is absent. Evaluation packs include
person identity, role-skill body, seat, invariant, and active definitions. Role
methods remain curation tools outside the behavior pack under test. External
packages use the generic frontier, commodity, and OSS fallback without
inheriting Core Roster scenarios. Agent-compose emits and validates the
deterministic pack. A runner or human still owns model calls, credentials,
response capture, and scoring.

## Person package authoring

An external package uses the same validated layout as the embedded default:

```text
person.kdl
roles/
roles/<role>/skills/<method>/SKILL.md
personalities/
definitions/INVARIANT.md
definitions/skills/<skill>/SKILL.md
```

`person.kdl` contains only `person "<name>"`. Each policy node lives in one
ordered KDL fragment:

```text
data/role-builder/role.kdl
data/role-builder/SKILL.md
[data/role-builder/evals.yaml]
data/personality-tenacious/personality.kdl
data/personality-tenacious/SKILL.md
[data/boundary-shared-thing/boundary.kdl]
[data/invariant/INVARIANT.md]
```

Every first-class entity owns one flat directory named `<kind>-<slug>`, where
kind is `role`, `personality`, or `boundary`. Its KDL fragment
is named for the kind, its body is `SKILL.md`, and a role may add `evals.yaml`.
The directory slug must match the node slug. Each entity declares an `order`,
which sequences the roster in place of the filename prefixes the layout used to
carry. Order is data on the entity, so moving a directory never reorders
anything. The loader strips it before parsing, so it never reaches the node
model. The invariant lives at `data/invariant/INVARIANT.md`. Every bound
personality needs its own directory, every boundary must be referenced by at
least one role, and a boundary's [owner](ownership.md) names a defined
role that must not declare it. Symlinks are invalid anywhere in the package.
The role, personality, identity, color, and model-tier validation applies
unchanged. A missing, malformed, or internally inconsistent package fails before
bundle materialization or host projection. Person packages never transport
credentials or launcher authority.
