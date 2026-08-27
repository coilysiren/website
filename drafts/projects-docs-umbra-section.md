<!--
Draft of the umbra slice of the projects docs section Gem is assembling.
Unlanded on purpose: Gem owns that section and picks its home, so this sits in
drafts/ rather than in docs/ where it would collide.

Sizing, because the doc-size hook is a hard fail at 80 lines and 4000 chars.
The section below is ~1150 chars. Three parallel sections plus a heading is
roughly 3600, which does NOT fit docs/pages.md (1584 chars free) and does fit
a new docs/project-page-tour.md or similar. If the target is pages.md instead,
each section has to come down to about 450 chars, which means cutting the two
umbra-specific bullets and keeping the route and the field.

The one link is written ../docs/... so it resolves from drafts/ and the
dead-cross-links hook stays green. Landing this in docs/ makes it
project-page-assets.md.

One correction to carry, and it matters because it is copyable:
docs/project-page-system.md says umbra's field is "62 git verbs". The built
page has 63 items, 1 granted plus 1 refused plus 61 unnamed, and the page's own
legend correctly says 61 others. The 62 is mine and it is wrong. The separate
"failed axe at 1.3:1 across 62 elements" line elsewhere in that file is Kai's
record of an actual axe run and is left alone.
-->

### umbra

`/projects/umbra/`, rendered from `src/projects/umbra.njk`. The first project
page built, and the one whose format the other two copy.

Its hook accuses rather than summarizes: "You gave an agent a shell. Now name
every command it can run." Everything under it answers that. The field below
the hero is the page's only ornament and also its argument, showing 63 git
subcommands with `commit` granted, `reflog` refused, and the remaining 61
never named and therefore unreachable.

Two things here belong to umbra rather than to the layer.

* **Section ids name umbra's own subject** - `#guardfile` and
  `#not-a-sandbox`. Grounds and accents are declared per section as
  `data-band` and `data-accent` exactly so a second page did not have to
  inherit those names.
* **The texture geometry was measured here first** - the lockup band numbers
  in [project page assets](../docs/project-page-assets.md) came off umbra's
  banner, and then held on the other three.

The release in the hero meta row and in `src/data/stack.js` is hand-edited. It
read v0.126.0 against a shipped v0.170.0 before the chain moved into one file,
so treat any version written into prose as stale by default.
