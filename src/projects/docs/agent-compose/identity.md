# Identity primitives and seats

## Personality identity primitives

The selected person source owns a renderer-neutral identity record for every
personality. Web, mobile, terminal, audio, and generated-art consumers project
the same semantics without agent-compose owning their presentation.
[The overlay](overlay.md) carries the rules a renderer respects.

### Emblem

```kdl
emblem { name "knot" "hitch" "lifeline"; emoji "🪢" }
```

Names run widest-reading first: the emoji's literal name, then what this roster
reads the mark as. `🎨` is an artist palette and the personality it marks is
playful, so either word alone is half the story. A renderer with room for one
takes the first. Every name is a lookup key, unique across the roster.

### Motif

`motif` is one lowercase semantic token such as `wet-paint`, read as material or
texture rather than a CSS class or asset path. A motif is what the thing is made
of and an emblem is a thing you point at, so every motif is a material.

### Geometry

`geometry` is one lowercase semantic token such as `radial-facets`, the stable
shape language a renderer generates an avatar, sprite, or overlay figure from.
It is the agent's own representation, not a separate pet. `aterm` reads both
halves: mask, then ink.

### Body and stance

`body` is the creature, in prose rather than tokens, and it parses through its
own validator so tokens stay tokens. `stance` is its posture and lives on the
**role** beside `purpose`, never on a personality.

```kdl
body {
    archetype "sturdy compact body, simple rounded forms, thick tapering limbs"
    attachment "a thick rope knotted around its shoulder, running taut out of frame"
}
```
Every renderer uses this fixed expression vocabulary: `available`, `listening`,
`thinking`, `acting`, `waiting-for-human`, `blocked`, `completed`, `failed`,
`offline`. Expressions communicate state supplied by the owning runtime. Agent-compose
defines the vocabulary but never infers live state.

### Sound mark

Each `sound-mark` declares `timbre`, `contour`, and `pulse` tokens, a short
semantic identity seed for notifications or conversation entry. A renderer may
synthesize it or map it to an asset. Agent-compose ships no audio files,
playback behavior, volume policy, or event routing.

### Projection

The complete record and expression vocabulary ship in person snapshot schema
v2 and palette schema v2. Bundle role metadata stays compact and text-first.
Permissions, routing, model choice, and runtime authority remain outside the
identity contract.

## Naming the seat

A compose request may rename the seat it composes:

```kdl
compose {
    role "sysadmin"
    identity name="Echo" pronouns="it"
    delivery "native-skills"
}
```

Both properties are required and the node takes no arguments. Omitting it keeps
the role's own seat, which is what every existing request does.

### Why it exists

A caller that already has an identity would otherwise carry two. Sirens Echo
composes `sysadmin` for its operator doctrine and answers as Sirens Echo, so without
this its prompt introduced Vera as well, a name belonging to a different
context, in a lane whose policy forbids describing itself at all. The
alternative was a whole person package, which replaces the embedded roster as
one unit. Copying seven roles to rename one seat makes every future roster
change something the copy has to chase.

### What it does not do

It renames. Skills, methods, personalities, boundaries, and model tiers are
untouched, and no equivalent exists for any of them. The personality meld is
the one people ask for next, and it is a different shape. `role.Personalities`
also drives the melded favorite color, the nativeui theme tokens, and a
validator requiring exactly two personalities on a core role. Filtering a
meld is several seams; a name is one.

### The dictatable short id

Terminal surfaces append the running session's short id to the rendered name
(`Angie [she] (Agentic Platform Engineer) uz86`), so a human can name one agent out loud among
several. Read from `AOS_NATIVE_SESSION`, never minted. See
[the dictatable short id](whoami.md).

### The invariant this sits beside and what moves together

[The person contract](person-contract.md) says an overlay may not redefine
selected roles, personalities, definitions, or role personality sets. This is
the single exception, and the line it holds is between **who is speaking** and
**what the role is**. Naming a seat is identity. A caller that wants different
role content still brings its own package, as one unit.

The override rewrites the role identity and every seat, because different
consumers read different ones: the identity card and roster read the role,
while the overlay, statusline, native launcher, and bundle manifest read the
seats. Rewriting one alone yields a bundle whose card and statusline disagree.
The bundle key moves with it, because `cacheKey` hashes the rendered
instructions and the card is in them. A renamed seat cannot reuse an unrenamed
bundle.
