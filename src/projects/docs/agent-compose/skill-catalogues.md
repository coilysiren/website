# Skill catalogues

The catalogue export surface and the local catalogues it reads.

## Catalogues and bundle export

Agent Compose exposes the effective selected profile through deterministic text
and JSON catalogues. Inspection is read-only. It does not select a role,
activate a personality, change authority, or fetch a source.

### Catalogue commands

Every person-dependent command accepts `--person-source` and repeatable
`--personality-library` roots:

```text
agent-compose catalog personalities [--query <cue>] [--json]
agent-compose catalog roles [--json]
agent-compose catalog seats [--role <slug>] [--json]
agent-compose catalog expressions [--json]
```

Text output is unpaged and follows effective catalogue order. Exact normalized
personality slugs win over aliases. An ambiguous alias returns every candidate
in catalogue order.

Every JSON command emits:

```json
{
  "format": "agent-compose.catalog.v1",
  "items": []
}
```

Personality items contain `slug`, `skill`, the one-sentence skill
`description`, `aliases`, `color`, `motif`, `emblem`, `form`, `sound_mark`,
`source_library`, `digest`, and complete role `affinities`. Role items contain
`slug`, `purpose`, `skill`, role-skill provenance, role `identity`, `seats`, ordered
`personalities`, `favorite_color`, and the derived `background`. Seat items
contain `role` plus the full
stable seat object. Expression items are stable strings.

### Deterministic export

`agent-compose bundle export <bundle-dir> --out <file>.tar.gz` verifies the
bundle before opening the output. The exporter sorts safe slash-separated
relative paths, rejects links and non-regular entries through verification,
normalizes gzip and tar metadata, and includes `manifest.json`. Identical
verified trees produce byte-identical archives.

### Content-aware diff

`agent-compose diff <left-bundle> <right-bundle>` reports resolver-decision
changes, logical content changes, and changed bundle artifacts. Logical content
uses stable IDs and SHA-256 digests from the manifest. The effective role
skill, invariant, personality definitions, evaluation assets, copy contract,
and compact role identity metadata therefore remain visible even when a change
does not alter a resolver decision.

## Local skill catalogues

Agent Compose accepts an AOS-emitted local catalogue manifest:

```yaml
skill_catalog_manifest: ~/.config/aos/catalogues.json
```

This is the Agent Compose v2 ownership boundary. AOS owns remote selection,
Git access, locking, cache freshness, offline fallback, and host paths. Agent
Compose opens only the resulting local JSON and never fetches its sources.

### Manifest contract

The document must use `aos.catalogues.v1`:

```json
{
  "format": "aos.catalogues.v1",
  "catalogues": [
    {
      "source": "owner/repo/.agents/skills@main",
      "path": "/absolute/local/catalogue",
      "commit": "0123456789abcdef0123456789abcdef01234567"
    }
  ]
}
```

Every entry needs a nonempty source, an absolute existing directory, and a
full 40- or 64-character Git object ID. Unknown fields, trailing JSON,
unsupported formats, missing paths, relative paths, and regular files fail
before roster or load-point writes.

Entries retain declaration order. Later catalogue entries win duplicate skill
names. Existing unowned files at a native load point still win over every
managed catalogue.

### Ownership boundary

Agent Compose v2 accepts only the local manifest. It does not fetch catalogue
repositories or mutate MCP and approval configuration. AOS owns those
environment-facing operations and must complete them before invoking Agent
Compose convergence.
