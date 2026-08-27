# Decision trace

The decision-trace record, and run 115 as its worked example.

## Decision trace

Composition is chatty. The resolver records what it picked and why as each
decision occurs, into `trace.json` inside the bundle. Reasons are never
reconstructed after composition. A trace is an ordered list of decisions. Each
decision names the thing being decided - a personality skill, an instruction, a
delivery entry point - the source it came from, the outcome, and a
human-readable reason. The v0.1 outcomes are:

* `selected` - policy admitted the candidate.
* `excluded` - policy considered and rejected the candidate.
* `shadowed` - an identical higher-precedence copy already filled the slot.
* `delivered` - the adapter placed selected content at a bundle entry point.

The trace also retains one provider report for every selected provider and
every configured provider excluded from the active role. Reports classify the
selected person package, ordinary catalogues, and role-only skill-provider
repositories, then record their configuration scope, outcome, and reason. When
a role provider carries an ordinary-skill selector, its report also records the
configured selector and the admitted catalogue fraction. Skills outside that
slice remain explicit excluded decisions, so `describe --why` can distinguish
selector filtering from provider or role exclusion. Each provider report
carries a context-budget contribution. `skills` counts canonical selected skill
trees attributed to that provider. `context_bytes` is their exact retained byte
count, and `approximate_tokens` uses `ceil(context_bytes / 4)`. Shadowed copies
do not contribute twice. Excluded providers record explicit zero values for all
three fields. Native and staged projection preserve the same trace, so the
budget does not depend on the consumer layout. Selector-backed provider budgets
count only the admitted slice. Invalid input fails composition with diagnostics
from the in-progress trace, and no bundle is produced. Reasons are plain
sentences, safe to show in a terminal and safe to keep in a public bundle. A
private overlay is referenced by its source id; its content never appears in a
reason. Runtime noise - durations, cache hits, terminal styling - stays out of
the trace. `agent-compose describe` renders provider outcomes, context budgets,
and the stored decisions in scannable sections, `describe --why <item>` follows
one item to its outcome, and `diff` compares two bundles by decision subject
plus manifest logical content ID and digest. Artifact-level changes remain
visible beside logical changes. These commands do not reopen authoring roots.
`trace.json` itself is the decision machine-readable surface; there is no
second explanation format. Human output and TTY styling are views over the
trace and never enter model instructions; redirected output is plain and
deterministic.

## Issue-suite run journal

Contract: Forgejo issue #115. Program counter uses structured bullets because
the repository voice forbids prose tables.

* reconcile-current-main
  * status: completed
  * attempts: 1
  * evidence: `v1.32.0`, 15 open issues, baseline `ward exec test` and
    `ward exec smoke` passed
* role-skills-and-qa-fixtures
  * status: completed
  * attempts: 1
  * evidence: canonical role skills, compact startup cards, QA fixture
    doctrine, Engineer and Ops boundary, `ward exec test`, and
    `ward exec smoke` pass; commit `cd99a44` landed; #121, #116, and #128
    closed
* ceo-portfolio-operating-model
  * status: completed
  * attempts: 1
  * evidence: commit `ef75fa4` landed and issue #129 closed
* close-landed-foundations
  * status: completed
  * attempts: 2
  * evidence: profile and library graph, aliases and affinities, generalized
    seats, copy contracts, complete evaluation matrices, and executable
    external profile covered by `ward exec test` and `ward exec smoke`
* complete-catalog-and-export-contracts
  * status: completed
  * attempts: 2
  * evidence: rich text and JSON catalogues, logical content manifest and
    diff, deterministic verified export, `ward exec test`, and
    `ward exec smoke`
* refresh-evaluation-baselines
  * status: completed
  * attempts: 3
  * evidence: 44 frozen responses, independent QA scores, 11 v2 records,
    explicit retry provenance, `ward exec test`, and `ward exec smoke`
* cross-repo-fixture-enforcement
  * status: blocked
  * attempts: 1
  * evidence: Ward #1617 landed at `2d58c641`; AOS fixture enforcement landed
    at `8e5c7a75`; live proof awaits infrastructure #685 and AOS #781
* zero-open-audit
  * status: pending
  * attempts: 0
  * evidence: none

### Append-only observations

* 2026-07-28 - Current main already contained partial implementations for
  issues #110 through #127, but their acceptance contracts remained open.
* 2026-07-28 - The first genuine blocker was #121. Long-form role doctrine
  still lived in KDL and global startup eagerly embedded every role.
* 2026-07-28 - Role-skill migration reduced the unassigned Codex roster by
  54%, the unassigned Claude roster by 56%, and assigned Engineer startup
  instructions by 70% while retaining selected skill bodies.
* 2026-07-28 - Commit `cd99a44` landed the role-skill checkpoint and issues
  #121, #116, and #128 closed with acceptance evidence.
* 2026-07-28 - Issue #129 arrived after the initial inventory. Its CEO
  operating-model contract became an additional role-skill slice.
* 2026-07-28 - Foundation acceptance auditing found real partial work in
  #124 through #127. The checkpoint completed copy-contract provenance,
  whole-matrix replacement, rich catalogue JSON, export verification, and
  logical-content diff instead of closing the issues from commit history alone.
* 2026-07-28 - QA scored the refreshed corpus 19/44 overall: frontier 19/22
  and OSS 0/22. Current `qwen3:4b` responses exposed reasoning, truncated,
  and sometimes invented facts, so the records preserve those failures.
* 2026-07-28 - Cross-repo repository work is landed. The remaining fixture
  proof requires an Ops-owned registry bootstrap tracked by infrastructure
  #685, followed by the QA fixture run tracked by AOS #781.
