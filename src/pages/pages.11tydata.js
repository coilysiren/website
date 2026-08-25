const route = (data) => data.page.filePathStem.replace(/^\/pages/, "")

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
    isArticle: (data) => data.page.filePathStem.startsWith("/pages/posts/"),
    permalink: (data) => `${route(data)}/index.html`,
    robots: (data) =>
      data.page.fileSlug === "resume" ? "follow, index" : "noindex, nofollow",
  },
}
