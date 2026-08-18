---

template-key: blog-post
title: "Deleting the Mechanical Scorer"
date: 2026-08-18
description: >-
  I built a regex tier to decide which agent responses a human should grade. Measured against my own grading it agreed on nothing that mattered, so I deleted it. Doing that in two unrelated systems left them with the same hand-graded shape and the same scoring rule, which is how the shared grading layer got extracted, and why its first useful output was a number that made me look bad.

---

Two of my systems evaluate agent behavior. One, `agent-compose`, is a context compiler that composes role
and personality definitions for agent harnesses, graded against a roster. The other, `sirens-echo`, runs a
Discord agent that answers strangers in a community nobody is paid to moderate, graded against the clauses
in its own prompt.

They have nothing in common. Different subjects, different runners, different failure modes. They ended
up sharing a grading layer anyway, and the reason is that I deleted the same component from both.

## The measurement that killed it

The component was a regex tier. Each case carried a `discriminator`, a list of patterns matching the
behavior I was worried about, and the match count decided which responses reached me for grading. Sensible
engineering: hundreds of cases, one grader, so filter first and spend human attention where the machine
already smells smoke.

Then I checked whether the filter and I agreed. Across nine pass-or-fail cases: **one false positive, two
false negatives, and six agreements on cases where nothing happened.**

The six agreements are the tell. On every case where either of us thought something was wrong, we
disagreed. A follow-up probe ran three separate detectors over the same twenty responses and they
disagreed with each other about as much as with me.

So the filter measured something. It did not measure what I was grading.

## Tuning would have been the wrong repair

The instinct with a bad classifier is to improve it: better patterns, a confidence threshold,
LLM-as-judge instead of regexes. That instinct is wrong specifically when the classifier sits between a
human and their own evidence.

A filter with an unknown error rate does not reduce grading work. It reduces *visible* grading work while
silently deciding which failures I am allowed to find. The false negatives are the expensive half. A case
the filter dropped is a case I never saw, and I could not notice, because the filter's output was the only
thing I looked at.

The confirmation came later, and it is the sharpest fact I have: the first fully hand-graded board found
exactly one real boundary failure, and it was a case the old filter would have dropped before I saw it.

Hamel Husain and Shreya Shankar's [evals FAQ](https://hamel.dev/blog/posts/evals-faq/) argues the
adjacent point from the other side. Error analysis, actually reading failures, is the highest-return
activity in an eval program, and binary pass-or-fail beats numeric scales wherever a case has a right
answer. Their "benevolent dictator" recommendation, one domain expert setting the standard rather than a
distributed panel, is the same shape. I am the only annotator on my own systems, which I had been treating
as a staffing limit. It is the recommended practice.

## The rule I wrote twice

Deleting the filter meant grading every authored case by hand: pass or fail, critique required on any
deduction, fifty words because fifty words fit one slide at large type.

Hand-grading only stays tractable because of the **pair**. A boundary case comes in halves. The in-half is
a situation where the rule must fire and the agent must decline. The out-half is the neighbouring case
that looks similar and must still be served. **A pair passes only when both halves pass.** Failing one and
passing the other is a boundary failure, not fifty percent.

That rule exists because of a specific way a metric lies. Score only the halves where the agent should
refuse, and an agent that refuses *everything* scores perfect conformance. Most clauses on the community
agent's board are refusals, so a defensive, useless, refuse-by-default deployment is exactly what my early
coverage numbers would have rewarded. The in-half is a negative control and never optional. The loader
rejects a pair holding one half rather than passing it through as partial coverage.

Here is the part that matters for the second workstream: **I arrived at that rule twice, under separate
pressure, in two codebases that did not know about each other.** Once from a role compiler where a
deferring role could pass by deferring always, once from a community agent where refusing was the safe
failure. Same rule, two implementations, no shared code.

Ribeiro et al.'s [CheckList](https://arxiv.org/abs/2005.04118) formalized this in 2020: behavioral testing
as a capability-by-test-type matrix, and the in-out pair is their Directional Expectation test, where you
perturb the input across a boundary and the expected verdict flips with it. I did not get there from the
paper. I got there from a deployment that would have scored well while being worthless, then found the
paper had a name for it.

## Extracting the layer

Two independent implementations of one rule is the signal to extract. So the grading half is now a small
shared package: record schema, the pairing rule, the annotation loop, the failure taxonomy, and a one-way
export. Both systems grade through it.

The rule I would keep for this: **share the thing both sides invented independently, not the thing one
side is willing to donate.** A rule one repo authored and the other inherited is a dependency. A rule both
arrived at under separate pressure is a contract. You find out which you have by noticing the duplicate,
not by planning the abstraction.

Deleting the scorers is what made the extraction possible at all. Before that, the two systems' scoring
logic was the part that differed most: different regexes for different failure modes, tangled into
different runners. Once neither had a mechanical scorer, what was left in each was the same shape,
authored cases plus a human verdict, and that shape is small enough to share.

Two constraints keep it honest:

**No runner and no model client in the shared layer.** Grading spends no tokens and touches nothing
deployed, so the expensive and risky half stays in the repositories that own their own subjects. One calls
a composed prompt through a proxy. The other drives a live harness against a real tool roster. Neither
detail crosses the boundary.

**Each consumer declares a profile.** Test types, label sets, word caps, and the fields a case cannot
omit are per deployment, declared as config. A second consumer adopts the schema by writing a profile
rather than by growing a branch inside the schema. The community agent's profile has one column where the
role compiler has three, and neither knows about the other's.

Structurally this is the dataset-solver-scorer split that [Inspect](https://inspect.aisi.org.uk/), from
the UK AI Security Institute, uses. I adopted Inspect for the run leg and kept a human in the scorer slot,
which is where I diverge from it deliberately.

## Its first useful output was a number that embarrassed me

When I pointed the shared checker at the community agent, it reported that the deployment declares 28
boundaries, implying **56 cases the board must contain, none of which are authored**, plus **10 authored
cases that no declaration derived**.

That is unflattering and it is the best evidence the tool works. The declaration is the deployment's
boundary inventory. The board is authored against clauses in the rendered prompt. The two taxonomies have
not met yet, so coverage is 0 of 56 with ten cases parked outside the scheme.

The version of this tool that reported a coverage percentage would have seen ten authored, ten graded, and
said 100%. Both numbers come from real data. Only one of them can come back negative.

That is the same thesis as deleting the regex tier, arriving from the other direction. **An instrument
that cannot embarrass you is not an instrument.** The regex filter could not tell me it was wrong. A
coverage percentage over authored cases cannot tell me what was never authored. Both feel like
instrumentation. Both are decoration.

The export half is the third instance. When it projects a graded run to a public display target and a
record looks like it carries a secret, it stops and names every reason rather than redacting and
continuing. A scrubber that misses one pattern ships the secret. A refusal cannot leak by omission.

## What I would tell someone starting

Grade a handful of cases by hand before building anything that grades for you. Then check your automation
against your own labels, on the same cases, and look specifically at whether you disagree on the cases
where *either* of you flagged something. Agreement on the boring cases is not agreement.

Pair every rule case with the neighbouring case that must still be served, or your metric will reward an
agent for doing nothing.

Prefer the number that can come back negative, in your evals and in your coverage reports both.

And when you extract a shared layer, extract the rule you wrote twice.

## The code

All three are readable without an account, and each page links the other two.

* [aos-eval](https://forgejo.coilysiren.me/coilyco-flight-deck/agentic-os/src/branch/main/docs/aos-eval.md) -
  the shared grading layer: schema, the pairing rule, annotation, the failure taxonomy, the refusing
  export, and the agent-and-model probe layer that sits under anything graded.
* [agent-compose evaluation](https://forgejo.coilysiren.me/coilyco-flight-deck/agent-compose/src/branch/main/docs/evaluation.md) -
  the roster-derived board, and the nine cases where the discriminator tier and I disagreed.
* [sirens-echo evaluation](https://forgejo.coilysiren.me/coilyco-gaming/sirens-echo/src/branch/main/docs/sirens-echo-eval.md) -
  the live-harness board, the clause citations, and the 56-slot coverage gap as its own tool reports it.

Counts in this post are from `main` on the day of writing: 28 declared boundaries, 56 derived slots, 0
authored against them, 10 cases authored against prompt clauses instead. Re-derive them with
`aos-eval boundaries check` rather than trusting the number here.
