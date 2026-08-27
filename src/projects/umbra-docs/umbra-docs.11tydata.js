import { umbraDocsFlat } from "../../data/umbra-docs.js"

// Vendored verbatim, so nothing here adds front matter to the source files.
// Title, shelf, and position come from the manifest, keyed on the filename.
const bySlug = new Map(umbraDocsFlat.map((page) => [page.slug, page]))

export default {
  layout: "layouts/docs.njk",
  project: "umbra",
  projectPage: "/projects/umbra/",
  // Draft: out of the index until a sync replaces the hand-vendored copy.
  robots: "noindex, nofollow",
  eleventyComputed: {
    docSlug: (data) => data.page.fileSlug,
    entry: (data) => bySlug.get(data.page.fileSlug),
    title: (data) =>
      `${bySlug.get(data.page.fileSlug)?.title ?? data.page.fileSlug}, umbra docs | Kai Siren`,
    permalink: (data) => `projects/umbra/docs/${data.page.fileSlug}/index.html`,
    position: (data) => {
      const at = umbraDocsFlat.findIndex((p) => p.slug === data.page.fileSlug)
      return {
        prev: at > 0 ? umbraDocsFlat[at - 1] : null,
        next:
          at > -1 && at < umbraDocsFlat.length - 1
            ? umbraDocsFlat[at + 1]
            : null,
      }
    },
  },
}
