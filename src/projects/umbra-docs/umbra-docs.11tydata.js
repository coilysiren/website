import { umbraDocsFlat } from "../../data/umbra-docs.js"

// Vendored verbatim, so nothing here adds front matter to the source files.
// Title, shelf, and position come from the manifest, keyed on the filename.
const bySlug = new Map(umbraDocsFlat.map((page) => [page.slug, page]))

export default {
  layout: "layouts/docs.njk",
  project: "umbra",
  projectPage: "/projects/umbra/",
  robots: "follow, index",
  eleventyComputed: {
    docSlug: (data) => data.page.fileSlug,
    entry: (data) => bySlug.get(data.page.fileSlug),
    title: (data) =>
      `${bySlug.get(data.page.fileSlug)?.title ?? data.page.fileSlug}, umbra docs | Kai Siren`,
    // The blurb is Kai's own line from umbra's docs/index.md, so the meta
    // description is lifted rather than written a second time.
    description: (data) => bySlug.get(data.page.fileSlug)?.blurb,
    permalink: (data) => `projects/umbra/docs/${data.page.fileSlug}/index.html`,
    canonical: (data) => `/projects/umbra/docs/${data.page.fileSlug}/`,
    // Identical bytes sit on two git hosts, so this copy carries the frame
    // they cannot: the project it belongs to and where it sits in the order.
    docsSchema: (data) => ({
      headline: bySlug.get(data.page.fileSlug)?.title ?? data.page.fileSlug,
      shelf: bySlug.get(data.page.fileSlug)?.shelf,
      slug: data.page.fileSlug,
    }),
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
