// Plays a homepage demo clip only once it scrolls into view, and stops it when
// it leaves. Without this script the clip is an ordinary click-to-play video,
// which is also what the page-weight budget measures at the top of the page.
;(() => {
  const clips = document.querySelectorAll("video[data-play-in-view]")
  if (clips.length === 0 || !("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const clip = entry.target
        if (entry.isIntersecting) {
          clip.removeAttribute("controls")
          clip.play().catch(() => clip.setAttribute("controls", ""))
        } else {
          clip.pause()
        }
      })
    },
    { threshold: 0.35 }
  )

  clips.forEach((clip) => observer.observe(clip))
})()
