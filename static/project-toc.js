// Marks the section currently in view in a project page's contents rail.
// Presentation only: every link in the rail works with this script absent,
// which is why it is deferred rather than inlined.
;(function () {
  var links = [].slice.call(document.querySelectorAll(".project__toc a"))
  if (!links.length || !("IntersectionObserver" in window)) return

  var byId = {}
  links.forEach(function (a) {
    byId[a.getAttribute("href").slice(1)] = a
  })

  var seen = {}
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        seen[e.target.id] = e.isIntersecting
      })
      var current = null
      Object.keys(byId).forEach(function (id) {
        if (seen[id] && !current) current = id
      })
      links.forEach(function (a) {
        if (a === byId[current]) a.setAttribute("aria-current", "true")
        else a.removeAttribute("aria-current")
      })
    },
    { rootMargin: "-20% 0px -70% 0px" }
  )

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})()
