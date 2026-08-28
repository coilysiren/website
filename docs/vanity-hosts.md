# The coilyco.ai vanity hosts

How a project page reaches `<slug>.coilyco.ai`. The page itself is described in [project-page-system.md](project-page-system.md).

Each project page renders twice. `site.projectVariants` drives a two-item
pagination, so the canonical output stays at `/projects/<slug>/` and a twin
lands at `/vanity/<slug>/`. `base.njk` picks `nav-vanity.njk` and
`footer-vanity.njk` when `variant` is `vanity`, so the vanity host wears the
project rather than the site: the brand is the project and its claim, and every
link out is absolute, because that chrome is served under a hostname this site
does not own.

The twin keeps the canonical of the page it mirrors, which is what stops a
vanity host from becoming a second indexable copy and is why the subdomains do
not contradict the single-authority decision in
[coilysiren/website#133](https://forgejo.coilysiren.me/coilysiren/website/issues/133).
`sitemap.njk` skips the twin for the same reason: it would otherwise name one
URL twice.

`netlify.toml` carries six rules per host and their order is load-bearing,
because Netlify takes the first match. Shared assets pass through first,
`/fonts/*` among them, which is invisible in the HTML and reachable only from
`url()` inside `site.css`. The bare host serves the twin. Everything else 301s
to `www.coilysiren.me`, so an in-page link like `/projects/umbra/docs/` leaves
for the real site instead of 404ing on a host that has no such page.

One assumption is untested until a host is live: Netlify redirects non-primary
domains to the primary by default, and `force = true` is documented as
overriding file shadowing rather than that redirect. If the alias gets 301'd
before the rewrite runs, the vanity name never survives and none of this
matters. Proving it is one throwaway rule and a look at the address bar.
