# Bundle manifest schema

`manifest.json` names what was composed and where the entry points are.

`manifest.json` names what was composed and where the entry points are:

```json
{
  "format": "agent-compose.bundle",
  "role": "platform",
  "role_skill": "role-platform",
  "role_skill_source": "roster:core:role:platform",
  "role_skill_digest": "sha256:<digest>",
  "model_tier": "frontier",
  "personalities": ["tenacious", "grounded"],
  "color": "#90a66a",
  "sources": ["roster:core", "aos-public"],
  "content": [
    {
      "id": "roster:core:role:platform:identity",
      "digest": "sha256:<digest>"
    }
  ],
  "delivery": {
    "mode": "native-skills",
    "instructions": "content/instructions.md",
    "skills_root": "content/skills"
  }
}
```

A compiled bundle replaces `skills_root` with `compiled_context` pointing at
`delivery/compiled.md` while the canonical skill trees stay in the tree for
inspection. Every named entry point must exist inside the bundle. `format` is a
plain marker, not a trust or cryptographic boundary. The built-in verifier
checks structural integrity: safe relative entry points, regular files and
directories only, complete delivery data, unique logical content IDs with
SHA-256 digests, and one identity tree per trace-selected skill. A consumer
that needs content authentication still hashes or signs the tree itself.
`sources` records which places content came from, by stable id, so the trace
and a human reader can refer to them. Locators and absolute paths never appear.
`personalities` preserves the role's declaration order. `color` is their melded
favorite, derived from every component color.
[person-contract.md](person-contract.md) owns the legibility and blend rules.
`model_tier` records the caller's `frontier`, `commodity`, or `oss`
compatibility lane. It does not identify or route a runtime model and never
changes selected context. A manifest from before the tier field is read as
`frontier`, matching the earlier implicit default. Retired `model_class` fields
in older JSON are ignored. `role_skill`, `role_skill_source`, and
`role_skill_digest` bind the role identity to its canonical doctrine. `content`
records the effective logical role skill and methods, invariant, personality
definitions, evaluation assets, copy contract, and compact role identity
metadata. `diff` compares these stable IDs and digests without reopening the
authoring roots. Local filesystem paths never appear.

## See also

- [kdl-contracts.md](kdl-contracts.md) - the requests this schema records.
