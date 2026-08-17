# Site pages

What each route renders and where its source lives.

Page templates live at the root of [src/](../src/). Markdown content remains
under [src/pages/](../src/pages/) so the resume keeps its canonical source.

- **`index.njk`** - project-first home. It leads with Kai's platform thesis,
  then moves directly into a full-width active portfolio grouped into
  Infrastructure, Agent platform, and Product cards. Repository cards retain
  their literal Forgejo descriptions and topics, while Eco App, Galaxy Gen,
  and Sirens Echo use emoji marks. The static Many MCPs card uses locally
  vendored Lunch Money, Reddit, and Steam marks without requiring a separate
  catalogue page. Public repository cards point at their GitHub mirrors for
  sturdy public access. The homepage ends after the active portfolio rather
  than repeating Writing and hiring calls to action.
- **`about.njk`** - canonical About page pairing its concise bio opening with a
  single portrait, followed by the visual autobiography and themed collections.
- **`resume.md`** - canonical semantic resume source for both the public page
  and the generated PDF.
- **`cool-people.md`** - unlisted links page celebrating people whose work and
  communities have crossed paths with Kai.
- **`hiring.njk`** - recruiting surface linked from the primary
  navigation. It is a project-free information reference covering Kai's
  strongest role shapes, practical constraints, recruiter context, interview
  boundaries, and tenure context.
- **`writing.njk`** - retired date-ordered long-form archive, reachable only by
  direct URL and marked `noindex, nofollow`.
- **`coilysiren-personal-gmail-privacy.md`** - privacy and contact notice for the `coilysiren-personal-gmail` OAuth client.
- **`404.njk`** - a fully designed not-found recovery page that preserves the
  real 404 response while carrying the homepage's visual system into clear
  routes to the About, Hiring, and Resume pages.
- **`posts/`** - retired long-form posts retained at their existing direct URLs
  and marked `noindex, nofollow`.
