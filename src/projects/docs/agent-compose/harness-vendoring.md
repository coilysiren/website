# Harness vendoring and model tiers

How harnesses are vendored, and the model tiers they select from.

## Vendored Claude Code harness data

Three facts `internal/nativeui` is coupled to, extracted from the shipped Claude
Code binary because none of them is a published contract. The files live in
`internal/nativeui/testdata/`.

* `harness-version.txt` - the version the current data came from.
* `harness-default-verbs.txt` - the default spinner verbs. Under `replace` mode a
  role verb that repeats a default reads as the default, doing no identity work,
  so `TestVerbsDoNotRepeatTheHarnessDefaults` holds that line.
* `harness-theme-tokens.txt` - every theme token name the harness knows, the
  union across all six base themes. An unknown token is dropped silently rather
  than rejected, so `TestThemeOverridesAreAcceptedByTheHarness` turns a rename
  into a failure instead of a blank role.

### Why the union rather than the dark base alone

The six bases (`dark`, `light`, `dark-ansi`, `light-ansi`, and both daltonized
variants) are keyed identically, and the mapping from base name to its object is
not recoverable from a plain read of the bundle. The union is what can be
extracted honestly. It still catches the failure this guards, a token the harness
no longer knows, because a renamed token leaves every base at once.

### Refreshing

```sh
just harness-refresh
```

That runs the extraction against the Claude Code binary on `PATH` and rewrites
all three files. Review the diff: a changed verb list is ordinary upstream
churn, a changed token list may mean a role stopped looking like itself.

Set `AGENT_COMPOSE_CLAUDE_BINARY` to extract from a specific binary instead.

### How drift is noticed

`TestVendoredHarnessDataMatchesTheInstalledBinary` re-extracts and compares
content on every run, and skips when `claude` is not on `PATH`. It deliberately
does not assert the version, so a Claude Code upgrade that changes neither list
stays quiet rather than failing every checkout the moment the harness
self-updates.

The extraction is anchored on the first default verb and on a token name that
appears once per base theme. If a future bundler layout breaks those anchors the
test fails loudly rather than reporting an empty list as agreement.

## Core model-tier matrix

The role KDL fragments under `internal/person/roles/` own this policy. This
page is its human-readable reference inventory. Model tier controls role
compatibility, not context selection, permissions, or executable authority.
Every tier supported by a role receives the same complete selected context.

Frontier covers Claude and Codex, commodity covers DeepSeek, and OSS covers
local or open models such as Ornith and Mistral.

### Category 1: complex roles

These roles require frontier reasoning for complex evidence or consequential
decisions.

* Director - frontier
* Executive Strategist - frontier
* DevOps - frontier
* AI Engineer - frontier

### Category 2: foundational roles

These roles produce bounded artifacts or verdicts that fit frontier and
commodity models.

* Engineer - frontier, commodity
* QA - frontier, commodity
* Designer - frontier, commodity
* Content Creator - frontier, commodity, OSS

### Category 3: high-security roles

Content Creator includes an OSS-classified Discord seat so callers can keep
sensitive community context on a local or open-model route. Role compatibility
does not choose a route or grant access. The launch consumer still selects the
appropriate tier and controls the supplied context.

### Evaluation state

**Deployment tier and tested tier are separate.** Everything above is a
deployment compatibility claim, and it is unchanged. Roles are still used on
frontier and OSS models, Content Creator's OSS Discord seat included.

The behavior board tests one tier: `commodity`, currently DeepSeek. It does not
read a role's declared tier and does not expand into lanes. Model tier does not
change selected context, so one subject measures the composed text for every
role, including the four declared frontier-only.

What this costs, stated rather than assumed: the board produces no evidence
about how a role behaves on a frontier or OSS model. A tier-comparison arm is a
separate question from the release gate, and answering it would mean running
the same board against another subject.

## See also

- [internal/nativeui/testdata/README.md](../internal/nativeui/testdata/README.md) - the vendored fixtures this describes.
