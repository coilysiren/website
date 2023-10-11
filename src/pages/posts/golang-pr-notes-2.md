---
template-key: blog-post
title: Golang PR Field Notes (Part 2)
date: 2019-12-26
description: Today we do concept exploration! Tomorrow is concept definition.

---

if you're looking for part 1, [it's back this way <===](https://coilysiren.me/posts/2019-12-25-golang-pr-field-notes-part-1/)

## Starting up again

Something I under-estimated, is how amazingly useful having my notes [from yesterday](https://coilysiren.me/posts/2019-12-25-golang-pr-field-notes-part-1/) would be. Having written so much down gives me a much stronger launching pad for furthering my knowledge, particularly when the alternative is having to remember everything.

To kick off the day, here's the list of questions I need to answer:

- _**what does it mean to build a dependent package, and when do we know that a dependent package needs to be rebuilt?**_
- _**how many more types of code change do we need to make change the export data?**_
- _**what are object files?**_
- _**how do we know when object files are stale?**_
- _**how do we change the export data when object files are stale?**_
- _**how do executables relate to needing to rebuild dependent packages?**_
- _**what does it mean to re-link executables?**_

I need to be able to answer all those questions before I can confidently make any movement here, but I actually don't want to start on that yet. What I want to do first is do more requirements gathering, because the issue we're looking at has links to other issues that may contain relevant information.

## Looking through related issues

Related issues often contain context that's required to fully understand the origin issue. When working in very large repos when potentially complex histories, I read all the issues out two steps from the origin issue. So if I've started on issue #101 which mentions #102 which mentions #103 which mentions #104, I'll read all of #101, #102, and #103 (eg. and not #104). This is essentially a triage mechanism, in a repo as large as golang I could probably spend an entire calendar year just reading issues.

So here are all the issues mentioned up to 2 steps out, in order of their creation.

- https://github.com/golang/go/issues/4719
- https://github.com/golang/go/issues/9887
- https://github.com/golang/go/issues/8893
- https://github.com/golang/go/issues/11193
- https://github.com/golang/go/issues/14271
- https://github.com/golang/go/issues/15681
- https://github.com/golang/go/issues/15734
- https://github.com/golang/go/issues/15736
- https://github.com/golang/go/issues/15752
- https://github.com/golang/go/issues/15756
- https://github.com/golang/go/issues/15799
- https://github.com/golang/go/issues/15913
- https://github.com/golang/go/issues/17566
- https://github.com/golang/go/issues/17751
- https://github.com/golang/go/issues/18981
- https://github.com/golang/go/issues/19340
- https://github.com/golang/go/issues/20070
- https://github.com/golang/go/issues/20137
- https://github.com/golang/go/issues/20512
- https://github.com/golang/go/issues/20579
- https://github.com/golang/go/issues/25056
- https://github.com/golang/go/issues/25862
- https://github.com/golang/go/issues/25999
- https://github.com/golang/go/issues/26534
- https://github.com/golang/go/issues/27148
- https://github.com/golang/go/issues/27345
- https://github.com/golang/go/issues/28314
- https://github.com/golang/go/issues/29067

There's a lot of them ^^ some of the linked issues are near / exact matches of my search criteria [from yesterday](https://coilysiren.me/posts/2019-12-25-golang-pr-field-notes-part-1/). This is a good sign, it tells me that even if I can't solve my origin issue, that I'll be able to use the context I'm gaining to look into a nearby issue.

## Concept discovery

Now what? Well, we need to look through the issues to look for a few things. Red flags, yellow flag, potential PRs that might solve the origin issue, and concepts I don't understand. The unknown concepts are going to be what requires the most work here, I'll need to list them out and add gain concrete understanding of them all before I can do any "real work". Scanning through the issues, here's those concepts:

- what is the difference between `$GOROOT/pkg`, `$GOPATH/pkg`? via [#4719](https://github.com/golang/go/issues/4719#issue-51282533)
- what is *.a cache? via [#4719](https://github.com/golang/go/issues/4719#issue-51282533)
- what does "lazy cleaning" mean? via [#4719](https://github.com/golang/go/issues/4719#issue-51282533)
- what are *.a binaries? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-66074024)
- what are binary-only packages? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-66074026)
- what is the difference between go build and go install? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-144121444)
- how could go's build system work without a pkg directory? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-144121444)
- what are object files, what does it mean to link object files? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-144125808)
- what is gb? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-144199351) and [#14271](https://github.com/golang/go/issues/14271#issue-132335366)
- what is cgo, what does it mean to be cgo-enabled? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-341861487)
- what does compilation specifically mean for go? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-470268217)
- how do binaries relate to source code? via [#4719](https://github.com/golang/go/issues/4719#issuecomment-470268217)

Short pause. Certain people are referenced in these issues a TON. I'm getting the impression that programming languages are only really written by a very small number of people (less than a dozen) who have a lot of support infrastructure (of hundreds or thousands). At any rate, back to concepts.

- how does go compilation differ from cgo compilation? via [#9887](https://github.com/golang/go/issues/9887#issue-57753156)
- does golang support compilation to multiple different target languages, eg. C, C++, and Fortran? if so, why? via [#9887](https://github.com/golang/go/issues/9887#issuecomment-456852196)
- what does the go tool "scheduling work" mean? via [#8893](https://github.com/golang/go/issues/8893#issue-51288838)
- what does topological mean, and how could it lead to suboptimal parallelization? via [#8893](https://github.com/golang/go/issues/8893#issue-51288838)
- what is critical path scheduling? via [#8893](https://github.com/golang/go/issues/8893#issue-51288838)
- why is cgo compilation heavy? via [#8893](https://github.com/golang/go/issues/8893#issuecomment-73424189)

Another aside -- I think I just spotted [a remnant](https://github.com/golang/go/issues/8893#issuecomment-100422418) of the point at which golang switched to compiling itself. A quick google and I now know that go was originally written [in C](https://docs.google.com/document/d/1P3BLR31VA8cvLJLfMibSuTdwTuF7WWLux71CYD0eeD8/preview?pli=1). Back to concepts!

- what is asm compilation? via [#8893](https://github.com/golang/go/issues/8893#issuecomment-101070036) and [#17566](https://github.com/golang/go/issues/17566#issuecomment-256156430)
- what is SSA? via [#8893](https://github.com/golang/go/issues/8893#issuecomment-134458436) and [#15736](https://github.com/golang/go/issues/15736#issue-155612156) and [#17566](https://github.com/golang/go/issues/17566#issuecomment-256149722)
- how do you avoid recompiling a package every time you run tests? via [#11193](https://github.com/golang/go/issues/11193#issuecomment-229522796)
- what does it mean to compile versus to link? via [#14271](https://github.com/golang/go/issues/14271#issue-132335366)
- what is cmd/go? via [#14271](https://github.com/golang/go/issues/14271#issue-132335366)
- what is bazel? via [#14271](https://github.com/golang/go/issues/14271#issuecomment-181840701)

Did you know -- if you're spending hours reading GitHub issues in the winter, you can concurrently be applying lotion to your dry skin? It's true! Anyways.

- what are go:cgo_import_dynamic directives? via [#15681](https://github.com/golang/go/issues/15681#issuecomment-239866168)
- what is the relationship between golang and C? what is the relationship between c compilations and the linker? via [#15681](https://github.com/golang/go/issues/15681#issuecomment-240319812)
- how do .a files relate to .o files? via [#15681](https://github.com/golang/go/issues/15681#issuecomment-380967328)
- what are .c files? via [#15681](https://github.com/golang/go/issues/15681#issuecomment-380967328)
- does golang use gcc? via [#15681](https://github.com/golang/go/issues/15681#issuecomment-380967328)
- what is the difference between export data and machine code? via [#15734](https://github.com/golang/go/issues/15734#issue-155608860)
- what are inlined functions? via [#15734](https://github.com/golang/go/issues/15734#issue-155608860) and [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what does it mean to walk a function? via [#15734](https://github.com/golang/go/issues/15734#issue-155608860)
- what is a semaphore? via [#15734](https://github.com/golang/go/issues/15734#issuecomment-220172384)
- what is a VFS? via [#15734](https://github.com/golang/go/issues/15734#issuecomment-220172384)
- how do processes communicate with each other? via [#15734](https://github.com/golang/go/issues/15734#issuecomment-220172384)
- how does export data relate to .a files? via [#15734](https://github.com/golang/go/issues/15734#issuecomment-220173676)
- what is the relationship between export data and objects? via [#15734](https://github.com/golang/go/issues/15734#issuecomment-339211682)
- what is cmd/go? via [#15734](https://github.com/golang/go/issues/15736#issue-155612156)

Something I've noticed while writing this, is that the detail amount of time I can spend reading before encountering a new unknown concept is increasing. I'm also gaining some understanding of the unknown concepts simply via seeing them mentioned in context, eg. without needing to look up their definitions. That said, the next step will definitely be to look up definitions ^^. Alright, back to concepts.

- how are go's cmds organized, eg. cmd/go vs cmd/compile, etc? via [#15736](https://github.com/golang/go/issues/15736#issuecomment-220181188)
- what is typechecking? via [#15756](https://github.com/golang/go/issues/15756#issue-155838129)
- what is escape analysis? via [#15756](https://github.com/golang/go/issues/15756#issue-155838129)
- what steps are required for compilation? via [#15756](https://github.com/golang/go/issues/15756#issue-155838129)
- what does it mean to "rebuild even when target is up to date" eg. what is the target of builds? via [#15799](https://github.com/golang/go/issues/15799#issue-156283605)
- what is yyerrorn? via [#15913](https://github.com/golang/go/issues/15913#issue-157781645)
- what is a gc node? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what are OKEY and OAPPEND nodes? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what does it mean to inline during compilation? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what are bounds checks? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974) and [#25862](https://github.com/golang/go/issues/25862#issue-331945781)
- what does "generating code" mean in the context of compilation? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what would be the benefit of inlining performance critical functions? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what is the cost of inlining a function? via [#17566](https://github.com/golang/go/issues/17566#issue-184877974)
- what is a pragma? via [#17566](https://github.com/golang/go/issues/17566#issuecomment-256139958)
- what is closure conversion? via [#17566](https://github.com/golang/go/issues/17566#issuecomment-256149722)
- what does it mean to export a function? via [#17566](https://github.com/golang/go/issues/17566#issuecomment-262118244)
- what is zero-cost control flow abstraction? via [#17566](https://github.com/golang/go/issues/17566#issuecomment-385211150)
- what is an intrinsic? via [#17566](https://github.com/golang/go/issues/17566#issuecomment-417111586)

I just went through an entire (long) issue without noticing any new concepts! Exciting.

- what is the binary export format? via [#20070](https://github.com/golang/go/issues/20070#issuecomment-296292391)
- what is a package archive? via [#20579](https://github.com/golang/go/issues/20579#issue-233602713)
- what are registers? via [#25999](https://github.com/golang/go/issues/25999#issuecomment-399196221)
- what does it mean to spill a register? via [#25999](https://github.com/golang/go/issues/25999#issuecomment-399199303)
- what is the stack, and how does it relate to optimization? via [#25999](https://github.com/golang/go/issues/25999#issuecomment-400841088)
- what does it mean to preempt a goroutine with signals? via [#25999](https://github.com/golang/go/issues/25999#issuecomment-400843932)
- what are runes? via [#27148](https://github.com/golang/go/issues/27148#issuecomment-415131187)
- what is a goroutine? via [#27345](https://github.com/golang/go/issues/27345#issue-355263332)
- what is an unbuffered channel? via [#27345](https://github.com/golang/go/issues/27345#issuecomment-419254790)
- what is BCE? via [#28314](https://github.com/golang/go/issues/28314)
- what is morestack? via [#29067](https://github.com/golang/go/issues/29067)
- what is a branch target buffer, what are backwards versus forward branches? via [#29067](https://github.com/golang/go/issues/29067#issuecomment-443587472)
- what is icache? via [#29067](https://github.com/golang/go/issues/29067#issuecomment-443887583)

## Wow that was exhausting

So here's what we did:

- dropped into the golang issue tracker with a specific learning goal in mind
- found a specific issue, and walked through all the related issue for concepts that need to be learned

And here's what we will do next:

- define and understand most (not all) of the concepts, focusing on hotspots
- return to the original issue, and determine if we have enough information to create a fix (likely yes, 90% confidence)
- start working on a fix

That'll come later! For today, I'm headed back to video games.


## Up next

===> [part 3 is this way](https://coilysiren.me/posts/2019-12-29-golang-pr-field-notes-part-3/)
