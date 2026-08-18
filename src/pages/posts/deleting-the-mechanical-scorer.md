---

template-key: blog-post
title: "Deleting the Mechanical Scorer"
date: 2026-08-18
description: >-
  I built a regex tier to pre-filter which agent responses a human should grade. Measured against my own grading it agreed on nothing that mattered, so I deleted it rather than tuning it. What replaced it is a human grading every case, a pairing rule that makes refusing everything score zero, and a small shared tool that reports gaps instead of coverage.

---

I had a regex tier in my agent evaluation pipeline. Each test case carried a `discriminator`, a list of
patterns matching the behavior I was worried about, and the match count decided which responses reached
me for grading. It was the sensible engineering move: I have hundreds of cases and one grader, so filter
first and spend the human attention where the machine already smells smoke.

Then I checked whether the filter and I agreed.

Across nine pass-or-fail cases: **one false positive, two false negatives, and six agreements on cases
where nothing happened.** The six agreements are the tell. On every case where either of us thought
something was wrong, we disagreed. A follow-up probe ran three separate detectors over the same twenty
responses and they disagreed with each other as much as with me.

So the filter measured something. It did not measure what I was grading. I deleted it instead of tuning
it, and that decision turned out to be the load-bearing one in the whole system.

## Tuning would have been the wrong repair

The instinct with a bad classifier is to improve it. Better patterns, a confidence threshold, an
LLM-as-judge instead of regexes. I want to argue that instinct is wrong specifically when the classifier
sits between a human and their own evidence.

A filter with an unknown error rate does not reduce grading work. It reduces *visible* grading work
while silently deciding which failures I am allowed to find. The false negatives are the expensive half:
a case the filter dropped is a case I never saw, and I had no way to notice, because the filter's output
was the only thing I looked at. That is not a measurement pipeline, it is a pipeline that produces
numbers.

The strongest evidence for deleting it came later. The first fully human-graded board found exactly one
real boundary failure, and it was a case the old filter would have dropped before I saw it.

Hamel Husain and Shreya Shankar's [evals FAQ](https://hamel.dev/blog/posts/evals-faq/) makes the
adjacent argument from the other direction: error analysis, actually reading failures, is the
highest-return activity in an eval program, and binary pass-or-fail beats numeric scales wherever a case
has a right answer. Their "benevolent dictator" recommendation, one domain expert who sets the standard
rather than a distributed panel, is the same shape. I am the single annotator on my own systems, which I
had been treating as a staffing limitation. It is the recommended practice.

## What a case looks like now

Every case is authored once and graded by hand. Pass or fail, with a critique required on any deduction,
capped at fifty words because fifty words fit one slide at large type.

The structural piece that makes hand-grading tractable is the **pair**. A boundary case comes in halves.
The in-half is a situation where the rule must fire and the agent must decline. The out-half is the
neighbouring case that looks similar and must still be served.

**A pair passes only when both halves pass.** Failing one and passing the other is a boundary failure,
not fifty percent.

That rule exists because of a specific failure mode. Score only the halves where the agent should refuse
and an agent that refuses *everything* scores perfect conformance. Most of the clauses on my community
agent's board are refusals, so a defensive, useless, refuse-by-default deployment was the exact thing my
early coverage numbers would have rewarded. The in-half is a negative control, and it is never optional.
The pack loader rejects a pair holding one half rather than letting it through as partial coverage.

If that sounds like a rediscovery, it is. Ribeiro et al.'s [CheckList](https://arxiv.org/abs/2005.04118)
formalized behavioral testing as a capability-by-test-type matrix in 2020, and the in-out pair is their
Directional Expectation test: perturb the input across a boundary and the expected verdict flips with it.
I did not get there from the paper. I got there from a deployment that would have scored well while
being worthless, then found the paper had a name for it.

## Two systems, one grading layer

I ran into the pairing rule twice, in two unrelated repositories, and implemented it twice.

One is a context compiler that composes role and personality definitions for agent harnesses. Its
subject is a composed prompt called through a proxy, and its cases derive from a role roster: change a
boundary or an adjacency edge and the case list moves on its own.

The other is a Discord agent that answers strangers in a community nobody is paid to moderate. Its
subject is a live harness turn against a real tool roster. What it refuses matters as much as what it
answers, so it has the same pair structure for entirely different reasons.

Two runners, two very different subjects, one identical scoring rule. That is the signature of something
worth extracting, so the grading half is now a small shared package: the record schema, the pairing rule,
the annotation loop, the failure taxonomy, and a one-way export.

The extraction rule I would keep: **share the thing both sides invented independently, not the thing one
side is willing to donate.** A rule one repo authored and the other inherited is a dependency. A rule
both arrived at under separate pressure is a contract, and you find out which you have by noticing the
duplicate rather than by planning the abstraction.

Two constraints held it honest. The shared layer holds **no runner and no model client**, so grading
spends no tokens and touches nothing deployed, which means the expensive, risky half stays in the
repositories that own their own subjects. And the runners each declare a **profile** naming their test
types, label sets, and required fields, so a second consumer adopts the schema by declaring config
rather than by growing a branch inside it.

Structurally this is the dataset-solver-scorer split that [Inspect](https://inspect.aisi.org.uk/), from
the UK AI Security Institute, uses. I adopted Inspect for the run leg and kept a human in the scorer
slot, which is where I diverge from it deliberately.

## The tool's first useful output was a gap

When I pointed the shared checker at the community agent, it reported that the deployment declares 28
boundaries, which imply **56 cases the board must contain, none of which are authored**, plus **10
authored cases that no declaration derived**.

That is an unflattering number and it is the best evidence the tool works. The declaration is the
deployment's boundary inventory. The board is authored against clauses in the rendered prompt. The two
taxonomies have not met yet, and until they do, coverage is 0 out of 56 with ten cases parked outside the
scheme.

The version of this tool that reported a coverage percentage would have looked at ten authored, ten
graded, and said 100%. Both numbers are computed from real data. Only one of them can come back negative.

That is the whole thesis, and it is the same thesis as deleting the regex tier. **A measurement that
cannot embarrass you is not a measurement.** The regex filter could not tell me it was wrong. A coverage
percentage over authored cases cannot tell me what was never authored. Both feel like instrumentation
and both are decoration.

So the export half refuses rather than scrubs, too. When it projects a graded run to a public display
target and a record looks like it carries a secret, it stops and names every reason instead of redacting
and continuing. A scrubber that misses one pattern ships the secret. A refusal list cannot leak by
omission.

## What I would tell someone starting

Grade a handful of cases by hand before building anything that grades for you. Then check your automation
against your own labels, on the same cases, and look specifically at whether you disagree on the cases
where *either* of you flagged something. Agreement on the boring cases is not agreement.

Pair every rule case with the neighbouring case that must still be served, or your metric will reward an
agent for doing nothing.

And when you extract a shared layer, extract the rule you wrote twice.
