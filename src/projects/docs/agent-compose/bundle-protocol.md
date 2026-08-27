# The bundle protocol and contract review

How a bundle is assembled, and how its contract is reviewed.

## Bundle protocol

Every successful composition produces one immutable tree. Consumers enter it
through `manifest.json` and otherwise treat the tree as opaque.

### Tree contract

The v0.1 tree contains:

* `manifest.json` - what was composed, the delivery entry points, and
  `delivery.body_bytes`, the recorded size of what that mode hands a consumer.
* `trace.json` - the decision trace, provider outcomes, and provider
  context-budget contributions.
* `content/instructions.md` - selected instructions and compact role metadata.
* `content/skills/<source-id>/<skill>/...` - canonical selected skill trees.
* `delivery/compiled.md` - present only when the adapter compiles selected
  skill bodies into one document. Canonical skill trees stay beside it.

Every path uses slash-separated relative form. Bundle trees contain regular
files and directories only. Symlinks and paths that escape the root are
invalid. Harness load-point paths never appear inside the generic tree.

### Immutability and atomicity

The materializer writes into a private staging directory beside the final
location, verifies the tree is complete, then renames it into place
atomically. A finished bundle is never rewritten in place - refresh produces
a new tree and swaps it in. A failed refresh never partially replaces a
known-good bundle; the previous bundle stays live until the replacement is
complete.

`agent-compose verify <bundle-dir>` exposes that same read-only consumer
check. It rejects links and special files, unsafe or missing entry points,
unknown delivery modes, invalid traces, and any bundle whose identity trees do
not exactly match every skill selected by its trace. Cache hits pass
verification again before reuse, so the presence of `manifest.json` alone
never blesses a tree.

Successful verification prints only bounded skill and file counts. Selected
identity details remain in `trace.json`, where `describe` can render them as a
scannable audit instead of expanding them into the startup transcript.

`agent-compose bundle export <bundle-dir> --out <file>.tar.gz` runs verification
before opening the output. It writes sorted slash-separated file names with
normalized gzip and tar metadata. Identical verified trees therefore produce
byte-identical archives across supported platforms.

Runtime telemetry - durations, cache location, cache-hit status, terminal
state - never lands under the bundle root.

## v0.1 contract review

This is the human review record for issue #2. Kai reviewed the proposed
contract in issue #13 and the decisions below are the outcome. Implementation
issues consume this reviewed contract rather than the earlier proposal.

### Review decisions

* Agent-compose is a personality engine. It owns personality, source
  selection, and delivery. It is not a security boundary.
* Repositories are not an agent-compose concept. A repo is at best a place
  capability files happen to live, reached through a source locator like any
  other directory. Privacy scopes, target repositories, repo declarations, and
  per-repo capability resolution are removed from the contract.
* Agent, model, harness, reasoning effort, and interactivity belong to the
  caller and launcher and never enter a compose request. The original review retained
  a model-opaque density input, but
  [issue #59](https://forgejo.coilysiren.me/coilyco-flight-deck/agent-compose/issues/59)
  removed it after the consumer audit found no production caller. Legacy
  `density "full"` remains an ignored rolling-upgrade input. Brief density is
  rejected.
* Delivery mode - native skills or compiled context - is load-bearing and
  stays.
* A compose request selects a role, not one personality. The role activates
  every personality in its ordered set, and their component colors derive one
  melded favorite for the bundle.
* Personality definitions live inside `SKILL.md` trees. The person contract
  binds personality names to those skills and drops the presence, attention,
  tempo, and voice fields from KDL. Their bodies are freeform prose like role
  and boundary bodies, not a fixed section template.
* The person KDL drops its invariants section and renames
  `allows-personality` to `personality`. The invariant is embedded as shared
  instruction prose instead of schema surface.
* No schema-version fields and no digest ceremony. Immutability and atomic
  refresh remain because they are cheap and prevent partially replaced
  bundles, not because bundles are a trust artifact.
* The decision trace stays, but as a plain ordered list of decisions with
  human-readable reasons rather than a protocol-grade specification.
* Byte-identical duplicate content deduplicates; non-identical collisions for
  one delivery slot still fail in v0.1 instead of adding an override grammar.
* Agent identity entered the person contract as named seats - `agent` nodes
  with `name` and `pronouns` nested under each role. Names are opaque strings
  to the engine. Launchers keep permissions, models, and reasoning effort,
  joined only by the shared role slug.

### Consumer integration record

A consumer may build the compose request and adapt the resulting bundle or
home projection while treating the source tree as immutable. Authority claims,
credentials, permissions, mutable harness state, and task acceptance stay
entirely with that consumer. Either product can run independently.

### Knowledge-provider integration record

Knowledge providers publish reusable ordinary skills and instructions under
stable source ids and relative paths. They do not publish Kai's person source,
personality definitions, harness load points, launch policy, or installation
paths. Agent-compose resolves local declarations without fetching.

### Compatibility fixtures

* `native.kdl` - selected instructions plus native skill trees.
* `compiled.kdl` - selected instructions and skill bodies in one document.

The two fixtures prove that delivery mode varies without agent-compose knowing
which harness or model sits behind it.
