---

template-key: blog-post
title: "Agent Launch Pillars"
date: 2026-04-28
description: >-
  Pillars hold up a launch pad. Payloads fan out from the top. Each pillar is one full capability stack: substrate, observability, permissions lockdown, and the skill that wraps them. Agentic product velocity is launch cadence off the pad, gated by the weakest pillar. I call them Agent Launch Pillars, ALP.

---

A single human operator can hold up a launch pad if the pillars underneath are built right. Agents do the launching. The operator picks the targets, grades the pillars, and stays out of the loop the rest of the time.

I call them **Agent Launch Pillars**, ALP for short.

## A pillar is one full capability stack

Four parts, all required:

- **Substrate.** The thing work happens on. A cluster, a repo, a vault, a release pipeline.
- **Observability.** A way to see what N parallel agents did, without tailing each one.
- **Permissions lockdown.** A trust boundary that lets agents act unsupervised without burning down shared state.
- **Skill.** A codified procedure or wrapper agents reach for instead of re-deriving.

A pillar is vertical and end-to-end, not a horizontal layer shared across pillars. Each capability area earns its own complete column.

## The pad fans out, the pillars do not

Pillars stand still. The pad is flat and uniform. Payloads launch off the top in parallel streams, and that fan-out is what I mean by agentic product velocity. Velocity is a property of the pad, not of any single pillar. You do not get more velocity by overbuilding one pillar. You get it by completing the set.

## My current pillars

- **coily-kubectl.** k3s. kubectl audit log. coily argv validation. `coily kubectl` pass-through.
- **gh-issue.** GitHub. Issue stream as activity log. `coily gh` lockdown. `to-issues`, `request-refactor-plan`.
- **release.** Tap CI. Pipeline status. Brew formula as the trust boundary. Schedule-wakeup-after-push as the operating skill.
- **cognition.** Obsidian vault. Session logs. No lockdown (local). `pulse`, `log-sessions`, `session-rollup`.

## Failure modes

- **Pad tilt.** Half-built pillar. Agents launch off-axis, ship the wrong thing safely.
- **Pad collapse.** Missing pillar. The loop stalls there and the operator steps back in. You think you delegated. You did not.
- **Marble column on a tarp.** One pillar overbuilt, others ignored. Beautiful lockdown, no cognition. Agents act safely with no idea why.
- **Spawn more Claude.** Treating agent count as the bottleneck. The bottleneck is the pillar census.

## Open

Grading rubric. Order of investment for a cold start. Payload as a first-class noun. Worked example of one shipping loop touching every pillar. Pre-agent contrast.
