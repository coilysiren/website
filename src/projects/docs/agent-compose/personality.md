# Personalities

## Person profiles and personality libraries

Agent Compose selects exactly one local person profile. A profile owns role
skills, structured role metadata, role identity, seats, the invariant, copy contracts, and
optional role evaluation matrices.

### Profile layout

```text
person.kdl
roles/NN-role.kdl
roles/<role>/SKILL.md
personalities/NN-local.kdl
definitions/INVARIANT.md
definitions/skills/<skill>/SKILL.md
evaluations/<role>.yaml
libraries/<local-library>/
```

The established complete-person layout remains valid during v1.x. Its local
personalities act as an implicit package-local library.

### Library layout

```text
library.kdl
personalities/NN-personality.kdl
definitions/skills/<skill>/SKILL.md
```

`library.kdl` has one stable logical library name. Libraries contain only
personality-owned content. They do not own roles or a profile invariant.

### Admission and ordering

The profile discovers `libraries/` children in lexical order. Callers may admit
further local roots with repeatable `--personality-library` flags,
`personality-library` request nodes, or ordered host `personality_libraries`.
Profile-local roots resolve first, then the caller order. Every root is a local
directory or the reserved `roster:core` root, and Agent Compose accepts no URLs,
git refs, release identifiers, or fetch instructions.

The reserved root is a name rather than a path. Admitting it merges the shipped
core personalities, so a package binds `grounded` by slug and the binary supplies
the body. Only that disposition axis crosses: roles, seats, identity, and the
invariant stay package-exclusive.

### Conflicts and compatibility

Roles reference personality slugs, not a library name, so a profile may meld
local and admitted personalities. A role may have any nonempty ordered meld,
including one personality. Byte-identical definitions deduplicate, a divergent
duplicate slug or skill binding fails before materialization, and missing
references fail after all admitted libraries merge. Alias collisions stay visible
as ordered candidate sets. Generated v1-compatible `person.json` remains
available, and the additive `person.v4.json` and `personality-index.md` add
aliases, affinities, provenance, and derived melds.

### Cues and affinities

Libraries declare aliases with `alias "cue"` inside a personality entry. Lookup
applies Unicode NFKC, lowercases, trims surrounding whitespace, and normalizes
whitespace, underscores, and hyphens to one hyphen. A canonical slug match
wins. Otherwise every matching alias candidate remains visible in deterministic
catalogue order. Affinities derive from the effective profile only. Each v4
personality entry records its roles and each complete ordered meld, or an empty
affinity list when no selected role uses it. A cue never changes a role,
authority, permissions, or the native confirmation and lifetime rules for an
interactive personality swap.

## Signature and bond

Each core role melds exactly two personalities: a signature no other seat holds,
and a bond shared with its siblings. `grounded` bonds platform, sysadmin, and
eval, the substrate seats. `imaginative` bonds frontend and gamedev, both making
something a person enters. `outward` bonds tpm and devrel, both checking the
local answer against the world outside. `color.Favorites` weights a component by
`1/shared` squared, so a signature counts 1.0 and a three-seat bond about 0.11:
the signature drives the color four to one and the bond only tints it. The
roster measures 0.1590 at its closest pair against the 0.08 floor.

## Personality palette explorer

The repository ships a local visual explorer for the canonical personality
colors and each role's meld. It preserves color as expression only, and
authority, safety, and completion remain outside personality. Run
`just palette-serve` from the repository root.

That generates `web/personality-palette/public/palette.json` from the embedded
person source, installs the pinned browser toolchain, and starts Vite locally.
The JSON, dependency directory, and production build stay uncommitted.
`palette-build`, `palette-test`, and `palette-tidy` carry the rest of the
lifecycle, and `just test` includes the palette test.

### Data ownership and interaction

The embedded KDL person source remains the only owner of personality colors,
identity primitives, role membership, role order, and boundary inputs. The
hidden `palette-data` command projects that source into versioned JSON, and the
Go color package derives each role's boundary before the browser sees it. The
TypeScript layer owns only presentation metadata: friendly color names, short
associations, and spectrum ordering. Startup validation fails visibly if that
list drifts from the canonical catalog.

The explorer shows the full ten-personality spectrum with emblem, motif,
geometry, and sound, role filters with complete melds, component colors and the
derived role boundary, day and night previews, spectrum and alphabetical
ordering, one-click copying, and a responsive reduced-motion layout.

The app is a framework-free Vite and TypeScript project under
`web/personality-palette`. It is a local source tool, not a deployment target.
