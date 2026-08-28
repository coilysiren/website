# Project page assets

Each [project page](project-pages.md) needs three images its published banner
does not directly provide. `just derive-project-assets <slug> [mark-source]`
builds all three and is where the measurements live.

The textures are a stopgap. The banner generators in `agentic-os-xxx` should
emit a lockup-free texture themselves, at which point that half of the script
deletes itself. Tracked on `coilysiren/inbox#431`.

## The plate texture

`images/banners/<slug>-texture.jpg` is the banner with its lockup removed,
reconstructed by reflecting the clean bands above and below it into the gap.

The measurements, so nobody has to find them twice. In a published 1280x492
banner the lockup occupies **y 145-327**, verified across all four. That leaves
two full-width bands clear of it, **y 0-144** and **y 328-492**. The gap is
filled by reflecting each band inward and cross-dissolving the two across it,
which keeps the output at the banner's native size.

Native size matters: the plate is 2.69:1 and the texture 2.6:1, so `cover`
renders it at 0.95x. An earlier crop of just the lower band was 7.8:1, and
`cover` had to blow it up 2.76x to fill the same plate.

## The social card

`images/banners/<slug>-card.jpg` is the same banner scaled to 1200 wide and
centred on `#16121f`, the ground `.project` paints, so the letterbox reads as
page rather than as crop. `build-output.test.ts` reads the committed file and
fails if it is not the 1200x630 the layout tags promise, for every card named
in its `CARDS` map.

## The mark

`images/marks/<slug>.png` is not derived. Each product repo publishes its own
at `assets/mark/<slug>-256.png`, framed so the coin fills **85.5%** of the
canvas, and the script only reframes it to 220 and quantizes it to 64 colours.

Every mark is corrected in CSS with `hue-rotate(-20deg)`, because the published
family is cyan at hue 182 and this page's mint is 161, which reads as a near
miss rather than a relation. Measured on umbra to land the rings on 164 and
240 against the page's 161 and 238. The filter deletes itself once the mark
generators emit on-palette.

## The mark as tab icon

A project page, its docs index, every docs sub-page and its vanity host wear the
project's mark in the browser tab rather than the site favicon, so a reader with
several open can tell them apart. `base.njk` resolves the slug from
`project.slug` on a project page or the bare `project` on a docs page.

`src/_data/projectMarks.js` reads this directory off disk rather than listing
slugs, so a project whose mark has not been drawn keeps the site favicon and
picks up its own the moment the file lands. housecast is that case today.

The banners are not candidates. Every one is wide, 1280x492 or larger, and they
carry the name as baked-in type, so a centre crop yields a fragment of a
wordmark. The mark is already square and about 4 KB.
