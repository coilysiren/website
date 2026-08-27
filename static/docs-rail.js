// Builds the on-this-page rail from the headings the vendored markdown already
// carries, and gives each one an id so the rail can link to it. Presentation
// only: the page reads correctly with this absent, which is why the rail ships
// hidden and this script is what reveals it.
;(function () {
  var rail = document.querySelector(".docs__rail")
  var body = document.querySelector(".docs__body")
  if (!rail || !body) return

  var list = rail.querySelector("ol")
  var slug = function (text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
  }

  var seen = {}
  var headings = [].slice.call(body.querySelectorAll("h2, h3"))
  headings.forEach(function (h) {
    if (!h.id) {
      var base = slug(h.textContent) || "section"
      seen[base] = (seen[base] || 0) + 1
      h.id = seen[base] > 1 ? base + "-" + seen[base] : base
    }
    var li = document.createElement("li")
    li.className = h.tagName === "H3" ? "docs__rail-sub" : ""
    var a = document.createElement("a")
    a.href = "#" + h.id
    a.textContent = h.textContent
    li.appendChild(a)
    list.appendChild(li)
  })

  if (headings.length > 1) rail.hidden = false
})()
