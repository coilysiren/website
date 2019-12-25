---
template-key: blog-post
title: Golang PR Field Notes (Part 1)
date: 2019-12-25T02:57:55.736Z
description: >-
  I'm writing these notes as a part of my grand quest to make a performance improvement to Golang!
---

## Identifying an issue

I started with of the following search:

- open issues
- that need a fix
- that don't have a CL (eg. [a changelist](https://news.ycombinator.com/item?id=20891103))
- that aren't planned to be fixed by the go team
- about toolspeed

[From this url](https://github.com/golang/go/issues?utf8=%E2%9C%93&q=is%3Aopen+label%3AToolSpeed+label%3ANeedsFix+NOT+%22golang.org%2Fcl%22+milestone%3AUnplanned+). There were a few considerations that went into that search. In my experience with open source, and also under the guidance of go's [contributing guide](https://golang.org/doc/contribute.html#before_contributing), I determined that _"open issues that will take a fix, but no fix is planned"_ is the best path for contribution. They essentially say _"we will take a fix that looks like this, if anyone drops in to create it"_. The golang issue tracker separates "backlog" from "unplanned", which I learned about here => https://github.com/golang/go/issues/34376. I assume that a backlog issue may have someone on the golang team drop in and sweep it out from under me, whereas unplanned issues are free game essentially indefinitely. I've had a variant of that happen to me before, where I created a PR for django and then a maintainer decided to [take some of my work and start their own PR](https://github.com/django/django/pull/9016#issuecomment-373777203). So, I'm painfully allergic to that happening again here.

The focus on toolspeed is inspired by my learning goals, I go into that briefly on twitter here => https://twitter.com/lynncyrin/status/1209628089346490368. There's another label that fits my learning goal, the "performance" label. Here's both the toolspeed and performance searches, mostly for my future reference:

- [toolspeed](https://github.com/golang/go/issues?utf8=%E2%9C%93&q=is%3Aopen+label%3AToolSpeed+label%3ANeedsFix+NOT+%22golang.org%2Fcl%22+milestone%3AUnplanned+)
- [performance](https://github.com/golang/go/issues?q=is%3Aopen+label%3ANeedsFix+NOT+%22golang.org%2Fcl%22+milestone%3AUnplanned+label%3APerformance)

## Short aside on labeling

If you can't tell from my methodology here, accurately labeling issues is critically import for new contributors. When I first drop into a repo, [the labels](https://github.com/golang/go/labels) are the first thing I look at. There's a lot of new information to ingest when entering a repo, and often the labels are the best "front door".

This makes accurately labeling issues a fairly high priority concern for repository maintainers, in my opinion. I was very happy to see [a cpython proposal](https://discuss.python.org/t/proposal-create-bug-triage-team-on-github/992) by [Mariatta](https://twitter.com/mariatta) on creating a "bug triage" role. Essentially the entire job of that role is to apply labels. I would totally apply to that role, if contributing to cpython looked like it would helpful for my career. But it's looking like golang is going to be where my interests lie, so that's why you're reading a post about golang.

## Exploring the issue

So, with the previously mentioned search as my guide, I went for the first issue that looked the most approachable. "Approachable" here is a subjective definition, it translates roughly to "do I feel capable of doing this". The issue I picked was https://github.com/golang/go/issues/15752, with the title

> cmd/go: only rebuild dependent packages when export data has changed

From the title, I determined that the issue relies on core understanding of two concepts:

- dependent packages (which I understand)
- export data (which is unknown to me)

This prompts our focus to revolve around the "export data" concept. There is a particular dependency in this issue on "the export data changing" which is a pre-requisite for making any enhancements based on that fact. That is, in order to create any logic that relies on diffs in the export data, we have to be able to fully trust that diffs in the export data are sufficiently reliable to make decisions. We can state that fact without first even having an understanding of what "export data" is.

The export data reliability point comes up in the issues description, specifically in this line

> Not sure how often it happens that code changes don't impact export data (or how cheap that is to detect), but when it does happen, that could save a bunch of computation.

From this context I'm able to determine that "export data" means something like "metadata about a function". I assume that the export data contains some basic information about a function of package, such as last edited time / file size / function signatures / etc.

There's one part here that's particularly important to emphasize

> Not sure how often it happens that code changes don't impact export data

So golang teams' current understanding is that it's unknown if the export data is currently reliable enough to make decisions based on it. At this point, I'm starting to reframe the issue into two separate tasks:

- only rebuild dependent packages when export data has changed _(the original task)_
- change the export data for a dependent package whenever that package needs to be rebuilt _(a derived task from the above)_

This surfaces another question, specifically: _**what does it mean to build a dependent package, and when do we know that a dependent package needs to be rebuilt?**_ Being able to answer that question is a pre-requisite to writing code for the conditional rebuilding of dependent packages. This creates a set of subtasks, specifically

- change the export data during (case 1)
- change the export data during (case 2)
- etc...

Further comments give more information about the export data concept

> the plan would be to do something like check the SHA of the export data. If that hasn't changed, then the **downstream compilation won't change**.
>
> ...
>
> Yeah, I was just thinking that you'd store the SHA1 of the export data of
all imported packages in the .a file and only recompile if any of them had
changed. No sense trying to be too sophisticated.
>
> I don't know often this would be useful. Certainly sometimes (especially in
a **"add more and more debug prints"** cycle)

Emphasis mine. So part of the goal is to avoid rebuilding a dependent package if you've made trivial internal changes to it, like for example adding some debugging prints.

Further down the thread I'm seeing several people mention that they're working on some portion of this ([1](https://github.com/golang/go/issues/15752#issuecomment-220458227), [2](https://github.com/golang/go/issues/15752#issuecomment-313510033)) which gives me some pause. But those comments are from years ago, so I believe I'm in the clear.

Another comment by the author further reinforces the direction I believe this should be approached from

> Is this now just (“just”) a matter of only hashing the export data when determining whether object files are stale?

specifically my note about _change the export data during..._ above. This comment surfaces some new questions, specifically:

- _**what are object files?**_
- _**how do we know when object files are stale?**_
- _**how do we change the export data when object files are stale?**_

The final comment in this issue is a wildcard for me, it says

> I think it's a little bit more than that because you still need to re-link any executables?

This statement is hard for me to parse, and raises several questions:

- _**how do executables relate to needing to rebuild dependent packages?**_
- _**what does it mean to re-link executables?**_

I know that executables are a type of asset produced by a build process. Specifically I believe that `go build ...` produces executables. It was my understanding that go build produced a single [statically linked](https://en.wikipedia.org/wiki/Static_library#Linking_and_loading) executable, but I now believe that understanding is incorrect. My new understanding is that `go build ...` possibly creates multiple executables, perhaps one for each package? If you were conditionally rebuilding executables based on export data, then you would end up with multiple executables where some of them are outdated and need to be pointed to new links? I'll be sure to investigate this.

## Next steps

So far we've identified the following:

- there is a problem I can solve here
- the desired solution has some performance impact
- I don't currently possess all the knowledge I need to solve them problem, but the amount of knowledge that I need to gain feels reasonable
- there is some active work on this issue, but not so much active work that my contributions would be invalidated

In summary, there's work to do! My next step is to double down on investigating this issue, and gain any surrounding context that I might need.
