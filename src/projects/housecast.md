---
layout: layouts/project.njk
pagination:
  data: site.projectVariants
  size: 1
  alias: variant
permalink: "{% if variant == 'vanity' %}vanity/housecast/index.html{% else %}projects/housecast/index.html{% endif %}"
title: housecast, a YAML driven roster framework for agent context | Kai Siren
description: housecast composes the context an agent loads from a YAML roster, and derives its evaluation board from the same file, so a role cannot change without changing what gets tested.
canonical: /projects/housecast/
# Unwritten below the mechanical sections, so it stays out of search and out of
# the sitemap until the prose lands. Flip to `follow, index` to publish.
robots: noindex, follow
softwareSchema:
  name: housecast
  claim: A YAML driven roster framework for agent context
  repo: https://forgejo.coilysiren.me/coilyco-flight-deck/housecast
  license: https://spdx.org/licenses/MIT.html
project:
  slug: housecast
  # No mark drawn yet, so the hero renders without one rather than 404ing.
  hasMark: false
  eyebrow: Roster // the context an agent loads
  claim: A YAML driven roster framework for agent context
  hook: TK. One sentence naming the problem in the reader's own words.
  caption: TK. What the sample above shows, and why it is the whole request.
  meta:
    - Preview
    - MIT
    - Python
  contents:
    - { id: problem, title: The problem }
    - { id: how-it-works, title: How it works }
    - { id: roster, title: Reading a roster }
    - { id: not-a-framework, title: What it is not }
    - { id: reference, title: Reference }
  sample: |
    <pre><code>TK. One real artifact: a roster fragment, a command, a
    composed bundle. Short enough to read in one pass.</code></pre>
---

{% section { id: "problem", band: "penumbra", accent: "coral",
             label: "The problem, and what it costs to leave alone",
             heading: "TK. The problem, stated as the reader already has it." } %}
TK. Written for someone who owns the problem rather than someone shopping for a
library. Name what it costs to leave alone, because that is the section that
decides whether this page reaches buyers or practitioners.
{% endsection %}

{% section { id: "how-it-works", band: "lilac", accent: "mint",
             label: "What it does about it",
             heading: "TK. The mechanism, at one level of depth." } %}
TK. One level of depth and no more. The repository description and README are
the source, because a project page never restates a fact that has a canonical
home elsewhere.
{% endsection %}

{% section { id: "roster", band: "umbra", accent: "mint",
             label: "What it looks like in use",
             heading: "TK. The artifact a reader understands immediately." } %}
TK. One real artifact, shown and then explained. This is where these projects
are unusually strong, because the policy and roster files are short and
readable, and a reader who sees one understands the product.
{% endsection %}

{% section { id: "not-a-framework", band: "lilac", accent: "amber",
             label: "What it does not do",
             heading: "TK. The honest non-goals." } %}
TK. Scope limits and non-goals. Converts better than more features do, and it is
the register Kai writes in anyway.
{% endsection %}

{#- No stack section yet. The four-step chain in src/data/stack.js is umbra,
    mcp-beaver and agent-compose, and where housecast sits in it is a
    decision rather than a gap. Related writing is absent for the same reason it
    is absent on every project page: it has no promoted post to point at. -#}

{% section { id: "reference", band: "umbra", accent: "peri",
             label: "Repository and docs",
             heading: "Reference" } %}
<ul class="project__links">
  <li><a href="https://forgejo.coilysiren.me/coilyco-flight-deck/housecast">Repository ↗</a></li>
  <li><a href="https://forgejo.coilysiren.me/coilyco-flight-deck/housecast/src/branch/main/docs/FEATURES.md">docs/FEATURES.md ↗</a></li>
</ul>
<p class="project__byline">
  <span>Built by <a href="/">Kai Siren</a></span>
  <span>MIT licensed</span>
</p>
{% endsection %}
