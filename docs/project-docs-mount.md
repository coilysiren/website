# Project docs mount

Each project's own `docs/` mounted under its project page. umbra is drafted at
`/projects/umbra/docs/`. Decisions and the reference set live on
`coilysiren/inbox#438`.

The docs sit **beside** the case study rather than replacing it. The case study
argues for a reader deciding whether to care, and the docs are for one who
already decided. The breadcrumb carries that relationship, so it always names
the project and links back up.

## The manifest is the structure

`documentation-layout` permits `docs/*.md` with no subdirectories, so a repo
cannot express sections as folders and alphabetical order is the only order a
reader gets. mdBook answers the same constraint with `SUMMARY.md`, and
[`src/data/umbra-docs.js`](../src/data/umbra-docs.js) is that file.

The section tree, the reading order, the sidebar, the front door, and prev and
next all derive from it. Adding a page is a one-line reviewable diff rather
than an accident of alphabetisation. Shelves are reader-task rather than
architecture: getting started, guides, reference, concepts, contributing.

Blurbs are lifted verbatim from the project's own `docs/index.md`, so the shelf
never invents a second description of a page.

## Verbatim, and what that costs

Vendored files get no front matter. Title, shelf, and reading position come
from the manifest, keyed on the filename, in
`src/projects/umbra-docs/umbra-docs.11tydata.js`.

Two things follow from verbatim, and both are load-bearing.

**Cross-links have to be rewritten at render.** A vendored page still carries
repo-relative `.md` links. The `mountedDocLinks` transform in
`eleventy.config.js` turns a mounted target into its route, and points an
unmounted one at the file in its own repo. That second branch matters: a link
to `../README.md` or to `SECURITY.md` is correct where it was written and has
no route here, so it stays readable rather than becoming a dead internal link.
Link **text** is left alone, so a rewritten link can still read `specverb.md`.

**Vendoring imports the other repo's link debt.** `dead-cross-links` resolves
those same relative paths against this repo and fails on every one that does
not exist here. Enforcing another repo's link hygiene at this gate would mean
editing vendored content, which is the one thing verbatim mounting exists to
prevent, so the mount is excluded in `pyproject.toml`.

Declaring that exclude switches the hook to a full-tree walk, which is why
`src/pages/**` had to join the list. Those are site URLs like `/resume.pdf`,
correct for the server and outside the repo on disk.

## Known dead links upstream

Found by the mount rather than by anyone reading umbra. All three resolve to
nothing in `coilyco-flight-deck/umbra` itself.

* `docs/architecture.md` links `features-detail.md`
* `docs/CONTRIBUTING.md` links `CODE_OF_CONDUCT.md` and `SECURITY.md`, which
  exist at the repo root rather than under `docs/`

## The snapshot stamp

`umbraDocsSource` records which umbra commit the vendored copy is of, and every
docs page prints it, naming the repository as the source of truth. A hand-copied
tree drifts silently and this makes it drift visibly instead.

A stopgap rather than a feature. The sync updates the stamp in the same step
that replaces the files.

## What is still a draft

The copy under `src/projects/umbra-docs/` is hand-vendored, so it is a
point-in-time snapshot that will drift. The sync is platform work on
`coilysiren/inbox#438`. Until it lands the mount is `noindex, nofollow` and
stays out of `CANONICAL_ROUTES`, though it is in `cypress/routes.ts` so
accessibility and page weight still cover every page.

The front door's headline is written rather than extracted, which makes it
Developer Advocate work rather than layout.
