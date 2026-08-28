# The coilyco.ai vanity hosts

How a project page reaches its `coilyco.ai` host. The short form is canon in
URLs, so the hosts are `umbra`, `acompose` and `beaver` while the project slugs
behind them stay `umbra`, `agent-compose` and `mcp-beaver`. Only the `from`
hostname differs; the rewrite target is still `/vanity/<slug>/`. The page itself is described in [project-page-system.md](project-page-system.md).

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

## Renamed hosts

`agent-compose.coilyco.ai` and `mcp-beaver.coilyco.ai` were the launch names and
were renamed the same day. They still resolve and still hold a certificate,
because the guarded Netlify wrap can add an alias but not remove one, so each
forwards to its short form with a single 301 rather than sitting on the site
root. An empty splat resolves to the bare host, which is why one rule covers the
root and every path beneath it.
