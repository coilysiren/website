# Social card

The image link previews show, and how to rebuild it.

[`src/images/og-default.jpg`](../src/images/og-default.jpg) is the default
`og:image`, 1200x630, committed as a finished asset. There is no generator and
no build step. A page overrides it with `ogImage` and `ogImageAlt` in
frontmatter, and the shared base layout falls back to the `site.js` default.

`og:image:width` and `og:image:height` are a promise about the committed file,
so [`src/build-output.test.ts`](../src/build-output.test.ts) reads the JPEG
frame header and fails if the two disagree. Replacing the image without
updating the tags is the failure that guards against.

## Rebuilding it

The card is the homepage hero recomposed at 1200x630, so it reuses that page's
own tokens rather than inventing a second visual language.

* Canvas 1200x630, padding 74px 78px, grid `1.45fr` copy and `0.55fr` portrait
  with a 64px gap, matching `.portfolio-hero`.
* Background `$deep-ink` with `background-shapes.svg` at 960px, plus a purple
  bloom, `radial-gradient(60% 90% at 20% 45%)` of `$mid-purple` at 55%.
* Eyebrow `Kai Siren // Platform Engineer` in mono, 21px, `$mid-blue`,
  `.12em` tracking, uppercase.
* Headline `I build agentic engineering platforms` in Roboto 700, 74px,
  `-.055em` tracking, `.98` line height, white, `15ch` measure.
* Rule of `$light-purple` at 35%, then `www.coilysiren.me` in mono 22px
  `$light-blue`.
* Portrait is `headshot.jpg` in the `.portrait-frame` treatment: `$light-blue`
  mat, `rotate(-3deg)`, a 17px `$light-purple` 35% offset shadow, 4/5 crop.

Render it at a 1200x630 viewport and export JPEG at quality 88.

## Contrast

The bloom sits at 55% because the eyebrow is the limiting element. At that
value `$mid-blue` on the bloom peak is 4.66:1, which clears AA for normal text
rather than relying on the large-text threshold. Raising the bloom darkens that
ratio first, so re-check the eyebrow before changing it.

## See also

- [static generation](static-generation.md) - what the base layout emits.
- [verification](verification.md) - what the suite asserts.
