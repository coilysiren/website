# Project page system

The parts of [project pages](project-pages.md) that are load-bearing rather
than cosmetic.

## Four things that break if you touch them

**The section reset must stay at `:where()` specificity.** `layout.scss` styles
the bare `section` element as a standalone card, from before the token system.
`project.scss` quarantines that. Writing the reset as `.project section`
instead raises it above the component classes and silently strips the
backgrounds it exists to protect.

**Nothing above a band may paint.** Each section paints its band with a
`z-index: -1` pseudo-element, and a negative-z pseudo paints beneath the block
background of every ancestor. That is why `body` carries the ground and
`.project` itself does not. Give `.project` a background and every band
disappears.

**`pre` needs a `0,1,1` reset.** `post.scss` carries
`pre:not(.warning-message)`, which outranks a `:where()` rule.

**The band attributes need their element in the selector.** A bare
`[data-band="lilac"]` is `0,1,0` and loses to `.project__body > section`, so it
computes to nothing at all rather than to an error.

## The mark

The mark bleeds off the plate's top-right corner at **15% of its own width**.
That depth is set by the worst case across all four project marks rather than
umbra's: past it, agent-compose loses the base of its spool and mcp-beaver
loses the bar that crosses its ring. A redraw that moves an emblem closer to
its ring lowers this ceiling for every page.

The hero grid is bottom-aligned, so the code block's top edge is content-driven
and rises as the caption wraps. No mark size clears it at every width, which is
why the mark is pinned above with a drop shadow rather than sized to fit.

## The wordmark

A hyphenated wordmark is set `nowrap`, because `agent-compose` at the default
size breaks at its own hyphen and leaves one dangling. That makes the size
load-bearing, so a long name declares its own `--wordmark` ceiling beside its
texture. The face measures **0.478em per character** at this weight and
tracking, against a hero cell that stops growing at **549px**, which is the
arithmetic behind each clamp.

## The field, and its accessibility floor

The field under each hero is the page's one ornament and it is also its
argument, so each page builds its own from the same component. umbra shows 62
git verbs with one granted and one refused, mcp-beaver shows 36 Forgejo
operations with five minted and one withheld, and agent-compose shows a roster
with one seat lit plus a second row of what no bundle ever carries. The counts
in each legend are real, so recount them when a list changes.

umbra's occluded verbs were originally 0.2 alpha, which read exactly as
intended and failed axe at 1.3:1 across 62 elements. They are information
rather than decoration, so they are readable now at 5.3:1. The occlusion still
reads, because it is carried by the gap to the lit states rather than by
illegibility: granted sits at 15.6:1 and refused at 10.7:1 on the same ground.

## The stack chain

Every page closes on the same four-step chain, rendered from `src/data/stack.js`
through `_includes/components/project-chain.njk`. The including page sets
`here` to its own slug: that step loses its link, takes the section accent, and
gains "You are here."

Versions there are edited by hand, because the build has no network and should
not grow one for a footer. The list exists because the chain was copied into
`umbra.njk` inline, and by the time a second page wanted it, umbra's own
version was three minor releases stale and agent-compose's was a major behind.
