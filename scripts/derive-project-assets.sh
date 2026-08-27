#!/usr/bin/env bash
# Prepare a project page's plate texture and mark.
#
# The texture is a stopgap. agentic-os-xxx owns the banner generators and they
# should emit a lockup-free texture directly, at which point this half deletes
# itself. Until then the numbers live here rather than in a commit message, so
# the next project page reproduces them instead of re-measuring them. Tracked
# on coilysiren/inbox#431.
#
# The mark is not derived at all. Each product repo publishes its own at
# assets/mark/<slug>-256.png and this only reframes it to the size the page
# declares.
#
# The social card is just the banner letterboxed onto the page's own ground at
# the 1200x630 the layout promises. build-output.test.ts reads the committed
# file and fails if it is any other size.
#
# Usage: scripts/derive-project-assets.sh <slug> [mark-source.png]
set -euo pipefail

slug=${1:?usage: derive-project-assets.sh <slug> [mark-source.png]}
mark_src=${2:-}
banner="src/images/banners/$slug.jpg"
[ -f "$banner" ] || { echo "no banner at $banner" >&2; exit 1; }

# Published banners are 1280x492 with the lockup at y 145-327, which leaves two
# full-width bands clear of it. Verified across all four project banners.
W=1280
TOP_H=145            # y 0-144, the clear band above the lockup
BOT_Y=328 BOT_H=164  # y 328-491, the clear band below it
GAP_H=183            # y 145-327, the lockup's own rows
# Published marks frame their coin at 85.5% of the canvas. Resizing preserves
# that, so every page's mark reads at one weight against the plate.
MARK=220
# The social card. 1200 wide puts the 1280x492 banner at 1200x461, centred on
# the ground `.project` paints, so the bars read as page rather than as crop.
CARD_W=1200 CARD_H=630 GROUND="#16121f"

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

magick "$banner" -crop "${W}x${TOP_H}+0+0" +repage "$work/top.png"
magick "$banner" -crop "${W}x${BOT_H}+0+${BOT_Y}" +repage "$work/bot.png"

# Each band reflects into the gap. The block immediately past a band is that
# band flipped, so the seam repeats the edge row rather than jumping.
magick \( "$work/top.png" -flip \) "$work/top.png" -append \
  -crop "${W}x${GAP_H}+0+0" +repage "$work/top-fill.png"
magick "$work/bot.png" \( "$work/bot.png" -flip \) -append \
  -gravity south -crop "${W}x${GAP_H}+0+0" +repage "$work/bot-fill.png"

# Cross-dissolve the two across the gap, so neither reflection announces itself
# at the midpoint.
magick -size "${W}x${GAP_H}" gradient:white-black "$work/mask.png"
magick "$work/bot-fill.png" "$work/top-fill.png" "$work/mask.png" \
  -composite "$work/gap.png"

# Native size on purpose: the plate is 2.69:1 and this is 2.6:1, so `cover`
# renders it at 0.95x. A crop of one band alone is 7.8:1 and gets blown up
# 2.76x to fill the same plate.
magick "$work/top.png" "$work/gap.png" "$work/bot.png" -append \
  -quality 82 -sampling-factor 4:2:0 -strip "src/images/banners/$slug-texture.jpg"
echo "texture src/images/banners/$slug-texture.jpg"

magick "$banner" -resize "${CARD_W}x" -background "$GROUND" \
  -gravity center -extent "${CARD_W}x${CARD_H}" \
  -quality 86 -sampling-factor 4:2:0 -strip "src/images/banners/$slug-card.jpg"
echo "card    src/images/banners/$slug-card.jpg"

if [ -n "$mark_src" ]; then
  # 64 colours holds a flat mark with an antialiased ring and cuts the file ~5x.
  magick "$mark_src" -resize "${MARK}x${MARK}" -colors 64 -strip "src/images/marks/$slug.png"
  echo "mark    src/images/marks/$slug.png"
fi
