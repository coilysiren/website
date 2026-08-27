# Boundary and content ownership

Who owns a boundary, and who owns created work.

## Boundary owners

Every boundary names the role holding the other side with a required `owner`.
A boundary without one is a roster-wide rule that some roles care about more
than others, which belongs in the layer that owns rules rather than here.

The owner is a relationship, not authority. It grants no permission and no
executable capability. It does two mechanical things: the owner receives the
body without declaring it, and loading fails when an owner declares its own
boundary, since that would place one role on both sides.

### Two-sided bodies

One body carries both halves under conditional headings, so the reader
self-selects before reading a word of prose:

```markdown
# Boundary: modify live system

Who changes running systems, and who hands that change to the role that owns it.

### If you own this boundary

You own live system modification...

### If you defer this boundary

Your clone is sealed against live mutation...
```

The owner section comes first, so the deferral reads as the consequence of the
allocation rather than as a bare prohibition. Both sections are required, each
is bounded separately at 400 words, and the whole file goes to both sides so
each role can read what the other was told.

Nothing parses these headings. The roster already records who owns and who
declares, so delivery, the identity card, and evaluation coverage all key off
that. Headings exist for the glance.

Sections identify by relationship, never by role name. A role list in prose
beside the same list in KDL is the drift this design removes.

## Product and engine ownership

Agent Compose keeps executable parsing, validation, selection, deterministic
rendering, and diagnostics in Go. Product prose and profile policy belong to
reviewable local data assets.

### Boundaries

* Engine assets - generic evaluation behavior and the native adaptation
  policy. `internal/roster/definitions/NATIVE-ADAPTATION.txt` is embedded data,
  not a profile override.
* Profile assets - role skills, role-bound methods, structured role metadata,
  role identity, invariant, copy contracts, and optional complete
  `evaluations/<role>.yaml` matrices.
* Personality-library assets - personality bindings, aliases, identity
  primitives, and definition skills.
* Consumer configuration - local profile and library roots only. Agent
  Compose does not fetch URLs, clone repositories, resolve releases, or read
  git references.

### Evaluation matrices

The engine supplies its complete generic matrix when a selected role has no
profile asset. A profile matrix replaces that matrix as one complete unit. The
loader does not merge fields, and a role cannot silently opt out.

Developer Advocate owns one connected audience loop: reusable source artifacts,
provenance, claim discipline, editorial recommendations, audience research,
channel adaptation, community continuity, durable feedback, qualification,
discovery support, evidence selection, and decision records. These
responsibilities no longer cross artificial role handoffs.

It owns recommendations about communication addressed outward, not every
human-readable artifact. `suggest-external-comms` is the single source for which
records a deferring role retains, which words a scoped seat may write inside its
own artifact, and for the separate authorization publishing and sending need.
This page does not restate those lists, because three hand-maintained copies had
already drifted apart before the boundary existed.

## Omitting a boundary

A deployment with no seat for the owning role composes without that boundary.
See [boundary omission](boundary-omission.md).

### Reviewed production locations

* `internal/evaluation/evaluation.go` - typed evaluation pack rendering,
  generic fallback, profile matrix parsing, and validation remain executable.
  Role-specific profile matrices load from data assets.
* `internal/evaluation/result.go` - result decoding, score validation, and
  canonical v2 pack digesting remain executable behavior.
* `internal/roster/roster.go` - rendering remains executable. The long-form
  native-adaptation policy lives in `definitions/NATIVE-ADAPTATION.txt`.
* `internal/person/person.go` - KDL parsing, local library merge, conflict
  detection, and copy-contract validation remain executable.
* `cmd/agent-compose/main.go` - CLI help and command wiring remain executable
  glue. No profile, library, or customer-specific prose belongs there.

Generated artifacts retain logical source IDs and content digests. They do not
publish local filesystem paths.
