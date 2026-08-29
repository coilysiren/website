---
layout: layouts/project.njk
pagination:
  data: site.projectVariants
  size: 1
  alias: variant
permalink: "{% if variant == 'vanity' %}vanity/agent-compose/index.html{% else %}projects/agent-compose/index.html{% endif %}"
title: agent-compose, eval driven composer for roles and personas | Kai Ase Siren
description: agent-compose compiles the context an agent harness loads into one immutable bundle of plain files, and derives its test board from the roster, so you cannot change a role without changing what gets tested.
canonical: /projects/agent-compose/
robots: follow, index
ogImage: /images/banners/agent-compose-card.jpg
ogImageAlt: agent-compose, eval driven composer for roles and personas
softwareSchema:
  name: agent-compose
  claim: eval driven composer for roles and personas
  repo: https://github.com/coilyco-flight-deck/agent-compose
  license: https://spdx.org/licenses/MIT.html
project:
  slug: agent-compose
  eyebrow: Roles // and the board they imply
  claim: eval driven composer for roles and personas
  hook: You wrote seven personas. Which one has ever been tested?
  caption: That is the whole request. What comes back is a directory of plain files, and you can diff it against the last one before anything runs.
  meta:
    - "<b>v2.61.0</b>"
    - MIT
    - brew // scoop
    - linux // macos // windows
  contents:
    - { id: problem, title: The problem }
    - { id: how-it-works, title: How it works }
    - { id: eval-driven, title: Why eval driven }
    - { id: request, title: Reading a request }
    - { id: not-permission, title: What it is not }
    - { id: stack, title: The stack }
    - { id: reference, title: Reference }
  sample: |
    <pre><code><span class="k">compose</span> {
      <span class="k">role</span> <span class="s">"platform"</span>
      <span class="k">delivery</span> <span class="s">"native-skills"</span>
      <span class="k">source</span> <span class="s">"aos-public"</span>
    }</code></pre>
---

{% section { id: "problem", band: "penumbra", accent: "coral", label: "The problem, and what it costs to leave alone", heading: "Who an agent is and what an agent may do end up in the same blob." } %}
The usual shape is one long system prompt carrying the voice, the job, the house
rules, the tool list, and a few sentences that are really an authority claim. It
is edited by whoever is closest to the problem that week. Nothing about it is
versioned in a way a reviewer can read, and a change to the persona is
indistinguishable from a change to what the agent is allowed to reach.

The expensive failure is not a dramatic one. It is that the persona is the least
tested artifact in the stack, so nobody can say whether a seat still refuses the
thing it was written to refuse. Two roles drift into each other, one quietly
absorbs the other's work, and the only evidence is a transcript somebody has to
read by hand.
{% endsection %}

{% section { id: "how-it-works", band: "lilac", accent: "mint", label: "What it does about it", heading: "agent-compose compiles the context a harness loads, and nothing else." } %}
It selects a role, the personality meld that role carries, the skills that role can
see, and the tool inventory it gets, then materializes one immutable bundle of
plain files. Claude Code, Codex, Goose, and OpenCode all take the same bundle.
Execution permissions, runtime facts, and lifecycle stay with whatever launches
the agent, and a role slug shared with a launch consumer transfers no authority
back into agent-compose.

### What you can do to a bundle before you trust it

<dl class="project__deflist">
  <div>
    <dt>describe</dt>
    <dd>Renders the stored decision tree. <code>--why</code> follows one item from consideration to outcome.</dd>
  </div>
  <div>
    <dt>diff</dt>
    <dd>Reports the semantic change between two bundles, rather than the textual one.</dd>
  </div>
  <div>
    <dt>verify</dt>
    <dd>Checks that entry points, delivery, traces, and selected identities are complete.</dd>
  </div>
  <div>
    <dt>read it</dt>
    <dd>It is a directory of files. No format stands between you and the answer.</dd>
  </div>
</dl>

Selection is exclusive rather than additive. An external person package brings its
own roles, seats, personalities, and evaluation context, and it replaces the
default roster wholesale instead of merging with it, so there is no state in which
a seat inherits half of somebody else's charter.
{% endsection %}

{% section { id: "eval-driven", band: "penumbra", accent: "sage", label: "Why the tagline leads with eval", heading: "The test board is derived from the roster, not written beside it." } %}
Boundaries and their owners produce the pairs. Adjacency produces the role-fit
targets. Each role's meld produces the personality cases. Add a boundary, flip an
adjacency edge, or swap a personality, and the challenge list moves on its own.
You cannot write a case that does not correspond to the roster, and you cannot
change the roster without changing what gets tested.

The hard cases are generated on purpose. Role adjacency names each role's two
likeliest absorptions, and those reasons become the descriptors a generator uses
to build exactly the confusion a seat is most at risk of.

<div class="project__note">
  <p class="project__note-label">Note</p>

Three parties, and none of them holds two seats. A generator authors the cases,
a subject answers them, and a human grades them. The grading half ships
separately, so it holds no runner and no model client, and grading never spends
a token or touches a deployed system.

</div>
{% endsection %}

{% section { id: "request", band: "umbra", accent: "mint", label: "What it looks like in use", heading: "The reviewable surface is the request and the bundle it produced." } %}
Four lines name a seat, the shape the harness wants it in, and where the
role-scoped skills are allowed to come from. Everything downstream of that is
derived and recorded, which is why `describe` has something to render.

<div class="project__code project__code--annotated">
<pre><code><span class="k">compose</span> {                    <span class="c">1</span>
  <span class="k">role</span> <span class="s">"platform"</span>           <span class="c">2</span>
  <span class="k">delivery</span> <span class="s">"native-skills"</span>  <span class="c">3</span>
  <span class="k">source</span> <span class="s">"aos-public"</span>       <span class="c">4</span>
}</code></pre>
</div>

<dl class="project__deflist project__deflist--numbered">
  <div>
    <dt><span class="project__n">1</span> compose</dt>
    <dd>One request produces one bundle. Re-running it with the same inputs produces the same bundle.</dd>
  </div>
  <div>
    <dt><span class="project__n">2</span> role</dt>
    <dd>The seat, chosen from the roster. It carries a charter, a boundary set, and a personality meld, and it carries no permission.</dd>
  </div>
  <div>
    <dt><span class="project__n">3</span> delivery</dt>
    <dd>The shape the target harness wants. The selected context does not change with it.</dd>
  </div>
  <div>
    <dt><span class="project__n">4</span> source</dt>
    <dd>A skill-provider repository the role is allowed to see. What it does not name, the seat never reads.</dd>
  </div>
</dl>
{% endsection %}

{% section { id: "not-permission", band: "lilac", accent: "amber", label: "What it does not do", heading: "agent-compose is not a permission system." } %}
<b>A role is context, never permission.</b> It has no opinion about what an agent
may execute, and it cannot stop anything. A composed seat that says it defers an
action will still run that action if the runtime hands it the tool, because prose
is not a control.

The bundle carries no credential, no mount, no command, no network reach, and no
lifecycle, on any role. Those are absent by construction rather than by
configuration, so there is no setting that turns one back on. Treating a role
briefing as the boundary is the one misreading this page exists to prevent.

<div class="project__table-wrap">
  <table class="project__table">
    <caption>Four layers a launch needs, and who owns each</caption>
    <thead>
      <tr>
        <th scope="col">Layer</th>
        <th scope="col">Who owns it</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Context</th>
        <td>agent-compose. What the seat knows, believes it is for, and can read.</td>
      </tr>
      <tr>
        <th scope="row">Authority</th>
        <td>A guardfile, enforced before <code>execve</code>. See <a href="/projects/umbra/">umbra</a>.</td>
      </tr>
      <tr>
        <th scope="row">Isolation</th>
        <td>A container's job, and nothing here substitutes for it.</td>
      </tr>
      <tr>
        <th scope="row">Lifecycle</th>
        <td>Whatever launches the agent. Credentials, mounts, and network reach live there.</td>
      </tr>
    </tbody>
  </table>
</div>

The bundle is the evidence for exactly one of those four rows. That is a smaller
claim than a persona file usually makes, and it is one you can check.
{% endsection %}

{% section { id: "stack", extraClass: "project__chain", band: "penumbra", accent: "sage", label: "One boundary, three proofs", heading: "Constrain what an agent can do, and prove what it did." } %}
{% set here = "agent-compose" %}
{% include "components/project-chain.njk" %}
{% endsection %}

{% section { id: "reference", band: "umbra", accent: "peri", label: "Repository and docs", heading: "Reference" } %}
<ul class="project__links">
  <li><a href="https://github.com/coilyco-flight-deck/agent-compose">Repository ↗</a></li>
  <li><a href="https://github.com/coilyco-flight-deck/agent-compose/blob/main/docs/FEATURES.md">docs/FEATURES.md ↗</a></li>
  <li><a href="https://github.com/coilyco-flight-deck/agent-compose/blob/main/docs/architecture.md">docs/architecture.md ↗</a></li>
  <li><a href="https://github.com/coilyco-flight-deck/agent-compose/blob/main/docs/evaluation.md">docs/evaluation.md ↗</a></li>
</ul>
<p class="project__byline">
  <span>Built by <a href="/">Kai Ase Siren</a></span>
  <span>MIT licensed</span>
</p>
{% endsection %}
