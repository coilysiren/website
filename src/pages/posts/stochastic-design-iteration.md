---

template-key: blog-post
title: "Stochastic Design Iteration"
date: 2026-04-19
description: >-
  A pattern for co-authoring a markdown design doc with an LLM: the human is the static guiding force, the LLM is the stochastic writer, and the artifact gets sharpened across many small passes into something more pure and specific than the human would have written alone.

---

There's a collaboration pattern I've been leaning on. A single human author with strong underlying intent pairs with an LLM to co-author a markdown design doc. Across many small passes, the doc gets sharpened. It drifts toward a form that's more pure and more specific, a more refined representation of what the author meant in the first place. I call it **stochastic design iteration**.

## Human collaboration and machine collaboration operate at different wavelengths

Human design review has a long wavelength. You send somebody a doc, they sit with it for a day or two, they come back with a handful of notes that each pack real judgment. Good for sanity checks, calibration against someone else's taste, catching the drift you can't see yourself. Bad for working through the fifteen slightly-different shapes a section could take.

LLM collaboration has a short wavelength. You can ask for five rewrites of a paragraph in the next ninety seconds, compare them, keep the best phrase from each, splice them together, and rewrite again. The LLM has no ego about its phrasing and no strong opinions about which framing to prefer. That sounds like a weakness. You won't get a "this whole section is the wrong idea" push like you would from a trusted reviewer. But for the drift-toward-refinement case the lack of strong opinions is exactly the property you want. The LLM is willing to keep generating.

The two modes are complementary, not substitutable. Human review layers on top of a doc that's already been through many stochastic passes. The stochastic passes do the grinding that human review shouldn't have to do. The pattern I'm describing here is specifically about the short-wavelength half.

## The LLM is the stochastic one. The human is the static guiding force

In this pattern the LLM does the writing. It proposes language, shape, section boundaries, alternative framings. It generates variance. On any given pass, what it produces is partly what you asked for and partly a random draw from the latent space near your prompt.

The human's job is not to write. The human's job is to hold the intent steady while the LLM produces variations, then to accept, reject, redirect, and recombine. You're a filter on the LLM's distribution. Over many passes, the artifact gets purified. The sections that drift off-intent get caught and corrected. The sections that drift toward a sharper phrasing than you had get kept. What stays is the residue of many filtered drafts.

The LLM's propensity to hallucinate is not a bug in this pattern. It's load-bearing. A fresh random assertion in the middle of a section you thought was settled forces you to ask "wait, is that true? is that what I meant? would the reader read it that way?" The doc gets put under disruptive pressure that the human is responsible for correcting, and the act of correcting it refines the surrounding material at the same time. A model that only ever paraphrased your input would grind out nothing. There'd be no perturbation to push back against. The stochastic noise is the mechanism.

If you don't have strong ideas, the output will be slop. But the output would have been slop without an LLM too. The pattern doesn't invent signal where none exists. Human intent, focus, and strategy stay load-bearing. The LLM creates no ideas of its own. It sharpens the ones you bring.

## Affinity with ADHD

The iteration style has, for me, a strong affinity with ADHD. It's very easy to start a cycle: edit a section, ask the LLM for variants, skim the variants, pick one, move on. The friction is low enough that starting another cycle later feels like nothing, too. Between cycles, both parties (the human and the LLM) routinely lose the tactical direction. You'll come back an hour later and not remember why this section was framed the way it was. The LLM has no memory of it either.

That loss is actually the feature. Losing tactical forces you back up to strategic. When you re-enter the cycle cold, the only thing you have to orient to is the intent of the doc, not the micro-decisions of the last edit. The strategic layer is what gets reinforced by the forgetting. The micro-decisions that were worth keeping will regenerate under pressure from the strategic frame. The ones that weren't just quietly don't come back. This is the opposite of how a long-session human collaboration goes, where tactical memory accumulates and starts overdetermining the structure.

## What this pattern opens up

Historically, single-voice design-doc quality took decades of solo focus from one unusually disciplined author. Think of long-stewarded open-source projects like Salvatore Sanfilippo's [Redis](https://github.com/redis/redis), Daniel Stenberg's [curl](https://github.com/curl/curl), or Yukihiro Matsumoto's [Ruby](https://github.com/ruby/ruby). Stochastic design iteration short-circuits that. Docs I've produced this way are at a quality level I could not have reached on my own, through any amount of solo effort. The pattern doesn't make me a better writer. It makes the marathon of iteration tractable, so the quality I could always aim for actually lands on the page. The class of people who can now produce this caliber of writing is much larger than it was.

## A concrete example from LUCA

I've been designing a project called LUCA (a prototype of an agent-driven "dark factory" for building small platforms) this way. One section went through three visible passes over about a week, each answering the same question: "how do we harden our built application?"

1. **Pass 1: hand wave.** A **Worker** sub-agent builds, and then an **Attacker** sub-agent attacks.
2. **Pass 2: hard cap.** Worker builds and Attacker attacks alternate in cycles, capped at 4 total cycles, then the orchestrator halts. The finer question of how to interleave (attack on every merge vs. attack after N merges) gets deferred.
3. **Pass 3: release-candidate orchestration.** A separate **ReleaseOrchestrator** sub-agent cuts release candidates on a trigger and runs each one through the Gauntlet triple exactly once: **Attacker** proposes attack plans, **Inspector** sharpens them, **HoldoutEvaluator** judges against hidden invariants the Worker never sees. Failing scenarios commit back into the test set as permanent constraints.

The underlying intent never changed across the three passes. The mechanism got progressively more refined: a hand-wave, then a hard cap, then an architecture where the failure mode can't recur in the shape the cap was there to prevent. The third version is the one I meant the whole time. I just couldn't express it with sufficient detail on the first pass.

## Nearby patterns this is not quite

A few named things sit in the neighborhood and are worth distinguishing from:

- **Prompt engineering.** Refining a prompt so a single LLM call produces a better single output. Stochastic design iteration refines the doc, not the prompt. Prompts are disposable scratch.
- **Agentic writing.** An LLM autonomously edits a doc across many passes with minimal human intervention. The human sets a goal and the agent drives until it thinks it's done. Stochastic design iteration is the opposite polarity: the human is in every loop, and the human's filtering is what makes the thing converge.
- **Pair programming.** Two humans, real-time, one driving. The output artifact ends up somewhere in the middle between the two humans. In the majority of cases this is good for refining an existing artifact, but doing it with an incomplete idea can disrupt the intent to such an extent that it can't even form a solid shape.

## What makes it "iteration" rather than "prompting"

The difference is that the doc is the durable artifact and the prompts are disposable. A prompt-engineering loop treats the prompt as the thing being refined. A stochastic-design-iteration loop treats the doc as the thing being refined, and each prompt is a local tool for shifting one section's center of mass. Over a month of passes, you don't have a repo full of prompts. You have a much better doc, and the prompts that produced it are gone.

The doc that comes out the other side might be closer to what the author meant than anything they'd have written alone. If it is, it's because the process helped the human keep up the marathon: round after round after round of edits that no solo writer would have had the stamina for. The LLM's low-friction short-wavelength cycle is what makes that marathon tractable. The human's unyielding intent is what points the cycle somewhere worth going.

## An example prompt

The prompt has to be intentionally vague. You're not telling the LLM what to write. You're pointing it at a wide area of the doc and asking it to surface things. The narrower the prompt, the less variance you get, and variance is the whole reason you're running this loop.

> Perform stochastic design iteration on < some document >. I have run this prompt a few times - you intentionally have no memory of previous rounds.
>
> Pick any set of sections or components you think would benefit from another pass - you decide how many, you decide which. For each, propose a meaningful change: rename, rewrite, down-scope, expand, retire, whatever makes sense.
>
> Be specific and tactical. Your goal is to move the needle in a very particular way, and you decide which way that is. I'll reject most of what you return. The small fraction that lands is the point.

A few things to notice.

**"You decide how many, you decide which."** If I pick the sections, I've pre-filtered the proposals to match my current mental model, which is exactly the thing I'm trying to disrupt. Delegating scope makes the model responsible for noticing what I wouldn't.

**"Whatever makes sense."** The trailing phrase is intentional. The shape of the list tells the LLM that unnamed moves are welcome, and it sometimes comes back with one I wouldn't have named.

**"You intentionally have no memory of previous rounds."** This is load-bearing. A long-running session drifts along whatever gradient the human has been pulling on. Fresh context forces the LLM to re-read the doc cold and propose from there. The doc accumulates the iteration history. The conversation doesn't.

**"Be specific and tactical. You decide which way."** This is the move that activates the stochastic part. A model asked for "improvements" defaults to paraphrase. It's the safe answer. Forcing it to commit to a direction, and to own the choice, is what produces actual departures for the human to filter.

## In summary

Stochastic design iteration is not a thing the LLM does for you. It's a thing you do with an LLM, on purpose, round after round, until the intent you started with is actually on the page.
