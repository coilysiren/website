# Project docs mount

Each project's own `docs/` mounted under its project page. umbra is drafted at
`/projects/umbra/docs/`. Decisions and the reference set live on
`coilysiren/inbox#438`.

The docs sit **beside** the case study rather than replacing it. The case study
argues for a reader deciding whether to care, and the docs are for one who
already decided. The breadcrumb carries that relationship, so it always names
the project and links back up.

## Verbatim, and what that costs

Vendored files get no front matter. Title, shelf, and reading position come
from the manifest, keyed on the filename, in
`src/projects/docs/docs.11tydata.js`. Eleventy cascades a directory's data into
its subdirectories, so every mount lives under `src/projects/docs/<project>/`
and reads its project from the path rather than from a per-project copy of that
file.

Front doors are virtual templates registered in `eleventy.config.js`.
Pagination was the obvious shape and the wrong one: only its first page reached
`collections.all`, so a second mount's front door built correctly and then fell
out of the sitemap.

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

Every docs page prints which source commit the copy is of, naming the
repository as the source of truth. The sync writes that stamp in the same step
that writes the files, so the two cannot disagree: [project docs
sync](project-docs-sync.md).

## What is still a draft

The mount is indexed. The same bytes sit on two git hosts with more authority
than this domain, so what this copy competes on is the frame they have none of:
a canonical, a description lifted from the manifest blurb, `TechArticle` and
`BreadcrumbList`, the reading order, and links in from the project page. Kai
published ahead of `coilysiren/website#133`'s Search Console baseline, which
that issue still wants recorded.

The front door's headline is written rather than extracted, which makes it
Developer Advocate work rather than layout.
