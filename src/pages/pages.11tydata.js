const route = (data) => data.page.filePathStem.replace(/^\/pages/, "")
const isPost = (data) => data.page.filePathStem.startsWith("/pages/posts/")

export default {
  layout: "layouts/content.njk",
  eleventyComputed: {
    // Derived from the same route as permalink, so a Markdown page can never
    // ship the canonical/og:url pair the .njk pages declare by hand.
    canonical: (data) => `${route(data)}/`,
    contentClass: (data) =>
      data.page.fileSlug === "resume"
        ? "post-body post-body--resume"
        : "post-body",
    // Posts are the pages most likely to reach someone who does not yet know
    // the name, so they carry it. Other pages bake it into their own title.
    documentTitle: (data) =>
      isPost(data) ? `${data.title} | ${data.site.title}` : data.title,
    isArticle: isPost,
    permalink: (data) => `${route(data)}/index.html`,
    // A separate key because this computed `robots` beats front matter.
    // Why, and what else it drives: docs/source-layout.md.
    robots: (data) =>
      data.page.fileSlug === "resume" || data.promoted
        ? "follow, index"
        : "noindex, nofollow",
    // resume.md opens with its own `# Kai Ase Siren`, so its header title stays an
    // h2 rather than giving the page two h1 elements.
    titleHeading: (data) => (data.page.fileSlug === "resume" ? "h2" : "h1"),
  },
}
