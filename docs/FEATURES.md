# Features

Baseline inventory of what `coilysiren/website` ([coilysiren.me](https://coilysiren.me)) ships today. Reference point for scope changes. When a feature is added, removed, or materially reshaped, update the relevant section so the diff shows scope drift over time.

Last full sweep: 2026-08-03.

## Stack

- **Eleventy static site** built with Nunjucks and Markdown, served from Netlify
  in production and an unprivileged nginx image in staging. Config and
  build-time Sass compilation live in
  [eleventy.config.js](../eleventy.config.js). The output is ordinary HTML,
  CSS, images, fonts, and documents under `dist/`, with no browser JavaScript
  or hydration runtime. See [static-generation.md](static-generation.md).
- **Canonical discovery files** at `/sitemap.xml` and `/llms.txt`, limited to
  the homepage, About, Hiring, and Resume surfaces.
- **Sass** styles under [src/sass/](../src/sass/).

## Pages

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
## Templates and data

Nunjucks layouts and shared navigation, footer, and long-form wrappers live
under [src/_includes/](../src/_includes/). Build data for the portfolio and
About page lives under [src/_data/](../src/_data/). The typed portfolio source
and its unit tests remain under [src/data/](../src/data/).

The primary navigation keeps About, Hiring, and Resume visible, with the Kai
Siren brand returning home and Source linking to the public GitHub profile.

The site-wide footer is a minimal identity line containing only Kai's public
name and role.

## Build scripts

Under [scripts/](../scripts/):

- **[build-resume.py](../scripts/build-resume.py)** - generates the printable
  resume PDF from the checked-in semantic resume page.
- **[clean-output.mjs](../scripts/clean-output.mjs)** - clears Eleventy output
  and retired Gatsby or Open Graph build artifacts before generation.

## CI workflows

Under `.forgejo/workflows/`:

- **`mirror-to-github.yml`** - trusted main and tag workflow. It streams the
  checkout from the repository-scoped host runner into the Node-specialist
  dev-base and Cypress images, then fast-forwards the tested Forgejo history
  to the read-only `coilysiren/website` GitHub mirror without force-pushing.
- **`publish-image.yml`** - trusted main-only publisher for the private,
  single-architecture staging image at
  `forgejo.coilysiren.me/coilysiren/website:<full-source-sha>`. The job uses a
  package-write credential, verifies the remote immutable manifest, and shares
  a serialized, scratch-pruned Docker lane with the repository's other trusted
  jobs.
- **`trufflehog.yml`** - trusted offline secret scan on push, cron, and manual
  dispatch through the repository-scoped host runner and dev-base image.

## End-to-end tests

- **Cypress** production-output tests under
  [cypress/e2e/](../cypress/e2e/), driven by
  [cypress.config.ts](../cypress.config.ts). They cover the canonical pages,
  retired-route 404 behavior, the designed 404, local-only asset requests, and
  the absence of browser scripts and social-image metadata.

## Deploy

- **Netlify** picks up `main`. Build status badge in the README. Site at <https://coilysiren.me>.
- **Staging image contract** builds the locked Eleventy site, serves `dist/`
  from unprivileged nginx on port 8080, and publishes the exact source commit
  to Forgejo OCI. Nginx owns the permanent redirects and designed 404 response
  on staging. The deploy repository pulls and rolls that image to
  <https://website.coilysiren.me>. See [staging.md](staging.md).
- **Site-deploy verification is out of scope** here. The workflows cover tests,
  image publication, mirroring, and trufflehog. Netlify and the deploy
  repository roll their respective hosts on their own cadence (see
  [AGENTS.md](../AGENTS.md)).

## Repo baseline

- **Managed pre-commit block** from agentic-os, plus the local offline `trufflehog` hook in [`.pre-commit-config.yaml`](../.pre-commit-config.yaml).

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [staging.md](staging.md) - staging image boundary and local verification.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [.ward/ward.yaml](../.ward/ward.yaml) - allowlisted commands.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
