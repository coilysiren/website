# The compose mark and banner

The agent-compose mark, and the banner built around it.

## The agent-compose mark

A spool of thread wound with twill cloth, its flanges crossing the ring. It is
a sibling of the coilyco org avatars and shares their ink, mint, and lilac.

The files live in [assets/mark/README.md](../assets/mark/README.md).

### What ships in assets/mark

- `agent-compose.svg` - the canon mark on the 400 avatar canvas. Its opaque
  ink field is part of the mark, so it stands alone on any background.
- `agent-compose-{400,256,128}.png` - coin rasters, transparent outside a disc
  just inside the ring, so each drops onto any surface without dark corners.
- `agent-compose-favicon-{64,32,16}.{svg,png}` - small sizes, each drawn on its
  own pixel grid. These keep the opaque field rather than the coin mask.

Do not resize the canon for a favicon. Nothing in it lands on a pixel boundary
at small sizes, so every edge blurs across two pixels. Use the size-specific
files, or regenerate.

### Geometry

On the 400 canvas: flange half-width 124 before the cut, cut by the ring circle
at r 171.5, thickness 32, taper 26, ink halo 7. Core half-width 72, half-height
96. Twill at cell 26. Mint ring r 165.5 stroke 12, lilac ring r 153 stroke 13.

Three numbers are load-bearing rather than cosmetic.

- The core half-width equals `flange_half_width - taper`, so the core's edges
  continue the line the flange taper ends on. Narrower reads thin, and wider
  leaves the thread standing proud of the core.
- The flanges are drawn after the rings, over a 7-wide ink halo. Drawn before
  them a mint flange merges into the mint ring, and the crossing then reads as
  a mistake rather than as a decision.
- The flange is cut by the ring circle so its ends follow the curve. Past
  r 171.5 it would leave the ring and the coin mask would clip it.

### Regenerating

The generator is `scripts/marks/agent_compose_mark.py` in `agentic-os-xxx`, and
its canon output is pixel-identical to what ships here. Its comments carry the
constraints that silently change the mark when they are broken.

Two forms are still outstanding. The website canvas is a redraw at 500 with an
ink filter rather than a resize, and the lockup form over the coilyco S has not
been drawn.

## The agent-compose banner

A field of point-twill cloth with the [spool mark](#the-agent-compose-mark) on it,
drawn in the same construction language as the mark: flat fill, every edge on
an axis or at 45 degrees, ink with mint and lilac.

The file lives in [assets/banner/README.md](../assets/banner/README.md).

### What ships in assets/banner

- `agent-compose-banner.jpg` - 2560 by 1280, the only form.

One file, not four. The earlier convention called for a 1280 beside the 2560
and a form without the mark, on the theory that some surfaces already show the
avatar. No surface in use does: a social preview, a link card and a README
header all present the image alone. The 2560 downscales cleanly because every
pixel in it is drawn rather than photographed, and at 384 KB it sits inside
GitHub's 1 MB social-preview cap. Draw another form when a surface asks for it.

JPEG rather than PNG. The field is thousands of flat cells, which PNG handles
well, but the type carries a blurred halo that dithers visibly at any palette
small enough to help.

### The field

Point twill: a twill draft folded on both axes, so the cloth reads as nested
diamonds rather than as a texture. Herringbone folds one axis and goes to noise
at banner size.

On the 1280 form, from which the 2560 scales exactly: cell 32 with a 3 seam,
the fold at 6 cells, lattice contour 2 cells thick, secondary contours every 6.
Ground weight 0.10, lattice 0.50, secondary 0.22. Light rises to the right in
four quantized steps from 0.3 to 1.0, and the pattern fades to a quarter over
the outer 45 percent of the height at the top and bottom edges.

Those last two are why the banner sits in a README rather than on it. A first
cut ran the lattice to 0.8 and hard to every edge, which reads well on its own
and reads as a slab dropped onto the page. A banner is judged where it lands.

Four numbers there are load-bearing rather than cosmetic.

- The lattice is an integer contour of the folded draft, `zigzag(i) + zigzag(j) == fold`. A threshold on a normalised depth widens into a blob at every diamond vertex, because the fold's gradient goes flat there.
- The contour is 2 cells thick. A 1-cell contour on a 45 degree stair touches only at the corners, so it reads as a dotted line, and the seam between picks finishes it off.
- Each thread darkens along ink to its own shadow to its hue, mint through `#103a3f` and lilac through `#38275c`, with the shadow at 0.35 of the ramp. Interpolating straight from the shadow leaves the ground at a mid violet and the whole field glows.
- Picks draw as merged floats rather than as separate cells. A 2/2 twill's visible unit is a float two cells long, and boxing each cell breaks it into a pixel grid.

### Type

`agent-compose // $ acompose` over the tagline, lilac with a mint separator,
set on a centred dark halo rather than an offset drop shadow. An offset implies
a light direction the mark does not have and protects one side of each glyph.

The cloth itself carries the legibility: the pattern thins under the two lines
of type the way a woven label interrupts a sett, its edge dithered by a cell so
the quiet still reads as cloth. Quieting the whole lockup instead empties the
banner, since that box runs four fifths of the width, and the mark needs no
help.

### Regenerating

The generator is `scripts/banners/agent_compose_banner.py` in `agentic-os-xxx`,
alongside the mark generator it draws the spool from. Its working record and
the directions that failed on the way here are in that repo's
`kai-comfyui-agentic` skill.

The banner is not set as the repository's social preview. That is a setting
rather than a file, and it stays an operator action.
