# Native role launch

`acompose <role> <harness>` starts a native host harness with one
caller-assigned role bundle:

```sh
acompose frontend codex
acompose platform claude --model opus
acompose eval goose run
acompose devrel opencode
```

Arguments pass through. Long form: `agent-compose launch <role> <harness>`.

## Selection

Launch reads the selected role from
[`repository-plan.yaml`](repository-plan.md). It admits operating context,
global repositories, role repositories, and [role-scoped providers](role-selection.md).
Required providers fail closed. Optional exclusions stay traced.

Model tier is a launch-consumer runtime fact. Agent Compose defaults it to
`frontier`. A launch consumer may set
`AGENT_COMPOSE_MODEL_TIER=frontier`, `commodity`, or `oss` to select the role
compatibility lane. AOS owns the runtime registry. Every supported tier and
harness receives the same complete selected context through its existing
projection layout.

The resulting bundle contains only the assigned role skill, its role methods,
complete ordered personality meld, ordinary admitted skills, and composed skills
bound to that role. Startup instructions require the harness to read the role
and boundary skills before acting. Another role requires another launch.

Before the harness starts, the launcher renders the canonical role transcript
and nothing else. Routine composition status stays off screen: the host
convergence lines, the assignment line, the bundle and request intro, the
source, decision, path, and trace counts, and the selector provenance notes
that the decision trace already carries. A bare terminal therefore shows the
identity card rather than a page of bookkeeping around it. Errors, skipped
roster sources, and a failed refresh still reach stderr.

`AGENT_COMPOSE_VERBOSE=1` puts all of that back and turns on verbose host
convergence with it. `agent-compose compose` keeps the full audit either way.

When both input and output belong to an interactive terminal,
`Press Enter to continue` keeps that identity visible until acknowledgement.
Enter starts the harness. Ctrl-C cancels before launch.

Piped, redirected, and headless launches retain the non-interactive flow. They
never read stdin or wait for acknowledgement. TTY output uses the melded role
color and each personality's own color. Redirected output and `NO_COLOR` remain
plain.

Bare interactive Codex launches also supply an initial prompt asking the active
Codex seat to introduce itself from the loaded identity card and personality
boundary, then invite the user's task. Codex options such as AOS's workspace trust
override or an explicit model selection may precede that prompt. An explicit
positional prompt, subcommand, or unknown option passes through unprompted. A
Claude launch instead carries [identity flags](claude-launch-identity.md).

## Native workspace integration

Agent Compose owns selection and projection. A launch consumer owns workspace
isolation and process lifecycle. AOS's shared shell wrapper places the explicit
role launch inside its leased native workspace and supplies a shadow home
before invoking `agent-compose launch`. The shadow preserves native host state
but omits the host user-skill mount, so inactive role and personality skills do
not re-enter the session. System and plugin skills remain harness-owned. No
container is involved. When the shadow links an existing Codex state directory,
Agent Compose resolves that link before setting `CODEX_HOME`. Codex therefore
keeps one canonical identity for persisted hook trust while `HOME` remains
isolated to the session.

The direct long form projects into the current directory using Agent Compose's
transactional sidecar rules. A consumer that permits concurrent sessions
should provide a distinct current directory for each launch. Projection fails
before starting the harness when foreign load-point files occupy that target.
Without a launch-consumer shadow home, existing user-scoped skills remain
visible according to the harness's normal discovery rules.

Bare `acompose` still converges the host. `acompose -- <command>` retains the
inferred-role native path for compatibility.

## Agent-to-agent launch

A launched session cannot start a second seat by accident. `launch` reads the
same `AGENT_COMPOSE_LAUNCH` sentinel the wrapper path uses, and refuses while
naming `--nested` as the deliberate spelling:

```sh
acompose --nested eval claude -p 'measure the launch path and report'
```

Harness arguments still pass through verbatim, so a task prompt needs no
agent-compose flag of its own. A positional Codex prompt also suppresses the
bare-session introduction prompt, so a task and an introduction never collide.

**A nested launch does not converge.** Its parent already did, against the
same state, so `launch` skips it and says so on stderr in the wrapper path's
shape: `skipping converge` against `skipping refresh`. Both call sites read the
one sentinel and compose that notice from one place, since saying different
things is how they came to do different things (#348).

Two bounds keep the opt-in from becoming a chain:

* `AGENT_COMPOSE_LAUNCH_DEPTH` counts the launches a process sits inside, and a
  nested launch is refused past one hop. A launched seat may start a worker.
  That worker may not start a third.
* A nested launch refuses to project over the load points its own session runs
  on. Projection protects foreign files, and the parent session's files are not
  foreign, so the parent would otherwise go on lazily loading the child's skills
  as its own. Launch from another directory, or stage
  `AGENT_COMPOSE_RUNTIME_HOME` for the child.

## See also

* [Integration](integration.md) - host and isolated delivery tiers.
* [Role selection](role-selection.md) - inferred and caller-assigned roles.
* [Projection](projection.md) - harness load points and ownership.
* [Repository policy](repository-plan.md) - availability and residency.
