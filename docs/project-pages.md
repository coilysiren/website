# Project pages

One page per headline project at `/projects/<name>/`. `umbra` is live. The
other three wait on mark assets, tracked at `coilysiren/inbox#431`.

The decisions behind the layer live on `coilysiren/inbox#417`. This page covers
only what a future editor needs in order to not break it.

## Why they do not inherit the site chrome

These pages are headed for standalone project domains, where matching
coilysiren.me is not a requirement at all. Building them to match a chrome they
are going to leave is work with a short half-life, so they carry their own
visual system in `src/sass/project.scss`.

## The one rule

**A surface is earned by function, never by section.** Code, tabular data and a
caution may paint. A section may not.

Sections separate by a hairline and a per-section accent instead. There are
three grounds, named for the zones of a real shadow because that is what umbra
is named after: `--umbra` carries the policy, `--penumbra` the explanation, and
`--light` sits outside it. A band's value tells you which zone you are in.

Accents come from the site palette and are assigned by register rather than by
position, so the hue carries meaning. Mint grants, amber refuses, coral is
cost, sage is the wider system, periwinkle is reference.

## Three things that break if you touch them

**The section reset must stay at `:where()` specificity.** `layout.scss` styles
the bare `section` element as a standalone card, from before the token system.
`project.scss` quarantines that. Writing the reset as `.project section`
instead raises it above the component classes and silently strips the
backgrounds it exists to protect.

**Nothing above a band may paint.** Each section paints its band with a
`z-index: -1` pseudo-element, and a negative-z pseudo paints beneath the block
background of every ancestor. That is why `body` carries the ground and
`.project` itself does not. Give `.project` a background and all six bands
disappear.

**`pre` needs a `0,1,1` reset.** `post.scss` carries
`pre:not(.warning-message)`, which outranks a `:where()` rule.

## The mark

The mark bleeds off the plate's top-right corner at **15% of its own width**.
That depth is set by the worst case across all four project marks rather than
umbra's: past it, agent-compose loses the base of its spool and mcp-beaver
loses the bar that crosses its ring. A redraw that moves an emblem closer to
its ring lowers this ceiling for every page.

The hero grid is bottom-aligned, so the code block's top edge is content-driven
and rises as the caption wraps. No mark size clears it at every width, which is
why the mark is pinned above with a drop shadow rather than sized to fit.

## Derived assets, and what replaces them

Both assets on the umbra page are stopgaps derived from published artwork,
because the generators do not yet emit what the page needs.

- **`images/banners/umbra-texture.jpg`** is the banner with its lockup removed,
  reconstructed by reflecting the clean bands above and below it into the gap.
  `umbra_banner.py` should emit a lockup-free texture instead.
- **`images/marks/umbra.png`** is corrected in CSS with `hue-rotate(-20deg)`,
  because the published mark is cyan at hue 182 and this page's mint is 161,
  which reads as a near miss rather than a relation. The filter deletes itself
  once `umbra_mark.py` emits on-palette.

Both are tracked on `coilysiren/inbox#431`.

## Accessibility note worth keeping

The occluded verbs in the deny-by-default field were originally 0.2 alpha,
which read exactly as intended and failed axe at 1.3:1 across 62 elements.
They are information rather than decoration, so they are readable now at
5.3:1. The occlusion still reads, because it is carried by the gap to the lit
states rather than by illegibility: granted sits at 15.6:1 and refused at
10.7:1 against the same ground.

## Adding the next one

1. Copy `src/projects/umbra.njk`. Keep the seven sections and their order.
2. Declare `canonical` and `robots` in front matter. The sitemap and
   `llms.txt` checks derive from those, so a page with neither is invisible.
3. Add the route to `cypress/routes.ts` and to `CANONICAL_ROUTES` in
   `src/build-output.test.ts`. A unit assertion fails on drift between them.
4. Add the page to `static/llms.txt` by hand. That file is not generated.
5. Do not set `ogImage`. The site ships one social card by contract, and
   `build-output.test.ts` asserts it across every canonical route.
