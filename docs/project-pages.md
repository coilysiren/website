# Project pages

One page per headline project at `/projects/<name>/`. `umbra`,
`agent-compose`, and `mcp-beaver` are live. `sirens-echo` does not have one yet.

The decisions behind the layer live on `coilysiren/inbox#417`. These three
pages cover only what a future editor needs in order to not break it.

- [project page system](project-page-system.md) - the fragile parts, the mark,
  the wordmark, and the shared stack chain.
- [project page assets](project-page-assets.md) - every derived image, and the
  measurements behind it.

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

Each section declares both as attributes, `data-band` and `data-accent`. They
used to be keyed off the section id, which worked exactly until a second page
wanted a section named something other than `#guardfile`.

## Adding the next one

1. Copy `src/projects/umbra.njk`. Keep the section order: hero, field, problem,
   how it works, the spec, what it is not, the stack, reference. A page may add
   one more section, as both newer pages do. Put it wherever the hero's promise
   needs paying off, which is before the spec on agent-compose and after it on
   mcp-beaver.
2. Declare `canonical` and `robots` in front matter. The sitemap and
   `llms.txt` checks derive from those, so a page with neither is invisible.
3. Give every section a `data-band` and a `data-accent`, and alternate the
   bands. A section with neither falls back to penumbra and mint.
4. Commit the banner as `src/images/banners/<slug>.jpg`, then run
   `just derive-project-assets <slug> <path>/assets/mark/<slug>-256.png`.
5. Add `--plate-texture` and, for a long name, `--wordmark` to `project.scss`.
6. Declare `ogImage` as the derived card, and add the route to `CARDS` in
   `src/build-output.test.ts`. Every card in that map is size-asserted.
7. Add the route to `cypress/routes.ts` and to `CANONICAL_ROUTES` in
   `src/build-output.test.ts`. A unit assertion fails on drift between them.
8. Add `page:` to that product's entry in `src/data/projects.js`, so the
   homepage tile stops sending the reader off-domain.
9. Add the page to `static/llms.txt` by hand. That file is not generated.
