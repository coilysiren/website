export default {
  layout: "layouts/content.njk",
  eleventyComputed: {
    contentClass: (data) =>
      data.page.fileSlug === "resume"
        ? "post-body post-body--resume"
        : "post-body",
    isArticle: (data) => data.page.filePathStem.startsWith("/pages/posts/"),
    permalink: (data) =>
      `${data.page.filePathStem.replace(/^\/pages/, "")}/index.html`,
    robots: (data) =>
      data.page.fileSlug === "resume" ? "follow, index" : "noindex, nofollow",
  },
}
