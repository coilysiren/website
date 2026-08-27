# Role selection and scoped providers

How a role is selected, and how providers scope to it.

## Role selection

Agent-compose distinguishes an inferred native role from a caller-assigned
role. Task shape may help an unassigned agent select its initial role, but task
shape never overrides an assignment that a caller already made.

### Inferred native roles

The host cascade exposes the complete named-seat roster. When no launch context
assigns a role, an unassigned native agent uses the initial substantive request
as a soft signal and selects the closest role. The agent records that role as
inferred and loads its role skill plus complete ordered personality meld. Its
role methods remain lazy until a matching task triggers them.

In an eligible directly steered session, an explicit user request naming a
valid rendered role slug switches immediately without a second confirmation.
The agent loads the target charter and boundary, announces the role, and stops
acting from the prior charter. The switched role remains inferred and persists
until another explicit switch or session end. This permits later switches and
a return to an earlier role.

An agent-proposed switch requires a separate confirmation. An unknown target
fails with the available rendered role slugs. The complete eligibility and
confirmation rules live in [native adaptation](native-adaptation.md).

### Caller-assigned roles

A compose request names exactly one role. The resulting bundle declares that
role authoritative and fixed for the session before presenting its identity card.
The agent does not change roles because a task resembles another role. The
agent does not activate, blend, or adopt another role's briefing or personality
set. When the user asks to switch, the agent rejects the request and directs
the caller to launch a new bundle with the different role.

### Enforcement boundary

The resolver excludes inactive role, personality, role-method, and composed capability
skills from the bundle. Container-home projection receives that selected bundle
and does not run the host roster cascade. These structural limits back the
instruction contract without turning personality into an authority boundary.

Native switching changes only the active charter and meld carried by the
already loaded roster. It does not change the harness, model, tools,
permissions, credentials, or executable authority.

## Role-scoped skill providers

A trusted root can admit local skill-provider repositories for one role without widening the host-global surface. It owns `.agents/roles.kdl`, whose repository IDs are document-local.

### Configuration

Declare skill-provider repositories beside composed skills in the trusted root's role graph:

```kdl
repositories {
    repository hardware path="example/hardware" {
        skill "compute-stack"
        skill "machine-*"
    }
}
roles {
    role operations {
        use-repository hardware
    }
}
```

`skill` children mark a repository as a role skill provider and select a bounded ordinary-skill slice. Use `skill "*"` when the role should receive the whole ordinary catalogue. See [Ordinary-skill selectors](skill-selectors.md).

Selected skill-provider repositories fail the assigned launch when their `.agents/skills` catalogue is unavailable. A provider assigned to a different role is excluded with its provider and discoverable skill reasons in the same trace.

### Selection

An assigned launch resolves providers in this order:

1. Explicit operating-context repositories.
2. Global repositories.
3. Direct repositories and skill-provider repositories admitted for the role.

Duplicate paths collapse first-wins. Byte-identical skills may shadow the
earlier copy, while different bodies with the same name fail closed.

Composed-skill selectors within one provider role form a set union. When two
selectors match the same composed skill, Agent Compose selects that skill once,
emits a warning, and retains every matching selector in `trace.json`. Overlap
within one role does not create a content collision. Different skill bodies
with the same name still fail closed during cross-provider resolution.
An empty role selects only operating context and global repositories. Bare `acompose`
uses the host-residency union. Assigned launch consumers hide that global skill
mount before projecting the role bundle.

### Native and staged delivery

Native launch remaps ordered repositories into an isolated `projects_root`.
Native projection and `project --scope home` consume the same immutable bundle.

`agent-compose describe <bundle>` shows selected and excluded providers in a
dedicated provider section. It classifies default and harness roots as ordinary
catalogues, role roots as skill-provider repositories, and the selected roster
as a person package. Its context-budget section names selected skill count,
retained bytes, and approximate tokens. Excluded providers contribute explicit
zeroes. A selected slice records its selector outcome and bounded budget.
`agent-compose describe <bundle> --why source:<provider-id>` explains provider
admission, and `--why skill:<skill-name>` follows a provider skill to its
selected, selector-excluded, role-excluded, or shadowed outcome.

### Ownership

A trusted root authors logical catalogue paths. Agent Compose discovers it
through the source graph, then owns strict loading, hydration, selection,
collision checking, and read-only projection. It does not fetch content,
choose authority, or add mappings to the Core Roster.
