# Projected composition status line

`acompose statusline` is Agent Compose's compact renderer for the immutable
bundle active at a repository or staged-home projection. It is read-only and
self-suppresses when no projection applies.

The ordinary row carries the composition facts worth keeping visible:

```text
🧭 🪨 📐 ⛏️  opal platform [she] uz86 // platform@codex // frontier // 99 skills / ~96k catalog // ✓ composed
```

* Emblems and the named seat with its subject pronoun come from the bundle;
  `uz86` is the session [short id](whoami.md). `--name` adds the role label.
* `role@harness` names the actual projection choice instead of inferring role
  from the current task.
* Model tier records the role compatibility boundary Agent Compose evaluated.
  It is not a model route or runtime permission.
* The skill and token footprint comes from selected provider reports in the
  stored decision trace. The token value measures the discoverable selected
  catalogue, including lazy skill content. It is not prompt-context usage.
* Health counts only sources classified as warnings during composition.
  Providers excluded because they belong to another role remain ordinary
  decisions and do not create false alerts.

The command walks upward from `--target` until it finds
`.agent-compose/projection.json`, then reads that projection's bundle manifest
and decision trace. It never recomposes, refreshes, verifies every bundle file,
or reads a mutable person source. New bundles retain the renderer metadata so
the row cannot drift from the context the agent actually received. Older
bundles degrade to the role and harness without inventing a seat or emblems.

Use `--color` when a status-line composer captures stdout through a pipe but
still accepts ANSI color. Direct redirected output remains plain by default.

## Provider integration

A status-line composer should invoke:

```text
acompose statusline --target <project-directory> --color
```

Agent Compose owns the rendered payload and bundle semantics. The caller owns
provider discovery, the project-directory runtime fact, row ordering, and
whether the output is shown. A missing projection emits no output. A recorded
projection with an unreadable manifest or trace emits a compact warning row.

## Subagent rows

`acompose statusline --subagent` decorates Claude Code's agent panel. The harness
runs the command once per tick with every live row on stdin, not once per row:

```json
{"columns": 72, "tasks": [{"id": "…", "cwd": "…", "status": "…", "label": "…"}]}
```

Stdout is one JSON object per line, `{"id", "content"}`, and the harness drops any
line that is not valid JSON or fails that shape. Each row resolves the projection
at its own `cwd`, so an agent working in another checkout reports that checkout's
identity. A row with no projection is omitted rather than decorated with a guess,
and an unreadable manifest warns for that row alone.

```text
🧭 📐 ⛏️ Angie [she] // platform@claude
```

Rows carry identity as text because Claude Code's eight subagent color slots are
shared across the session. A role claims the nearest slot and two roles can land
on the same one, so the slot is not a role identifier.

`native-ui` emits the `subagentStatusLine` key, so a composed Claude launch wires
this with no host mutation. It survives `--safe-mode` with the session row.

## See also

* [Native role launch](native-role-launch.md) - how assigned bundles are composed and projected.
* [Projection](projection.md) - load-point and ownership sidecar contract.
* [Catalogues and export](skill-catalogues.md) - detailed inspection beyond the compact row.
* [FEATURES.md](FEATURES.md) - shipped capability inventory.
