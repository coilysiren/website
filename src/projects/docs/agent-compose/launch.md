# Launch-time refresh

A `--` on the compose verb freshens context, then hands the process to the
real command:

```
agent-compose compose <request.kdl> --layout <name> --target <dir> -- <command> [args...]
agent-compose compose -- <command> [args...]
```

The first form refreshes a bundle and its projection before exec; the bare
form converges the host (roster plus cascade) before exec. Refresh is
compose plus project. Both halves are already idempotent - the
bundle cache reuses identical inputs and projection replaces only its own
files - so a warm launch is a no-op that validates and execs. The warm path
runs in single-digit milliseconds on the reference host, well inside the
250 ms budget the test suite enforces.

The assigned-role shorthand is separate:

```
acompose <role> <harness> [harness arguments...]
```

It resolves eligible host providers, selects the complete role bundle, and
projects through the harness layout before exec. Unlike generic request
refresh, an assigned-role launch does not fall back to a prior projection.
Starting with the wrong stale role would violate the caller assignment.
Launch consumers may pass their model-tier decision through
`AGENT_COMPOSE_MODEL_TIER`. Agent Compose defaults it to `frontier` and clears
the launch-only variable before handing control to the harness. The retired
`AGENT_COMPOSE_MODEL_CLASS` variable is ignored and stripped during migration.
`AGENT_COMPOSE_RUNTIME_HOME` similarly selects a prepared session home. Agent
Compose switches `HOME`, `CODEX_HOME`, `XDG_CONFIG_HOME`, and Claude's config
directory only after composition, then clears the control variable.

## Recursion guard

Launch sets `AGENT_COMPOSE_LAUNCH` in the child environment before exec. A
nested launch sees the sentinel, skips refresh, and execs straight through,
so a shadowed binary that wraps a harness can never recurse into itself.

The assigned-role verb reads the same sentinel and refuses rather than execing
through, because starting a second seat is a deliberate act rather than a
wrapper re-entering itself. `agent-compose launch --nested` is that deliberate
act, bounded by `AGENT_COMPOSE_LAUNCH_DEPTH` to one hop. See
[native-role-launch.md](native-role-launch.md).

## Failure behavior

A refresh failure never blocks a launch that has context to run with. When
compose or project fails and the target holds a validated last-known-good
projection - every file the sidecar records still present - launch warns
loudly on stderr and proceeds with it. Without a usable previous projection
the launch aborts. A refresh failure touches only the bundle cache and
projection-owned files; credentials and mutable harness configuration are
never in its write path.

An effective `external-only` person policy disables this fallback. The prior
projection may have used the embedded package, so launch aborts instead of
risking a prohibited identity. Direct projection also rejects such bundles.

## Concurrency

Concurrent identical launches converge on one cache entry: the materializer
stages beside the target and the rename loser reuses the winner. Concurrent
launches for different requests or targets stay isolated by construction -
distinct cache keys, distinct target directories, and a per-target lock file
(`.agent-compose/lock`) serializing projection writes.

## Wrapper installation requirements

Binary shadowing rollout belongs to the infrastructure repo. A wrapper that
fronts a harness must exec `agent-compose compose` with its fixed request,
layout, and target, forward the original argv after `--`, and resolve the
real harness binary through normal PATH lookup - the sentinel, not PATH
surgery, is what prevents recursion. No rollout code lives here.

## See also

* [projection.md](projection.md) - the load-point layer launch drives.
* [native-role-launch.md](native-role-launch.md) - assigned native sessions.
* [bundle-protocol.md](bundle-protocol.md) - cache identity and atomicity.
* [architecture.md](architecture.md) - composition inputs and ownership.
