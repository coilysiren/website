---
template-key: blog-post
title: Golang PR Field Notes (Part 3)
date: 2019-12-29T06:56:16.003Z
description: 'In this part, we start building foundational knowledge.'

---

---

🚧 WIP 🚧

---

if you're looking for part 2, [it's back this way <===](https://lynncyrin.me/posts/2019-12-26-golang-pr-field-notes-part-2/)

## When we last saw our protagonist

The last time we were here, we took the time to identify some concepts we may need to understand, in order to do our work. That list of concepts is very long, and the actual relevance of the individual concepts varies fairly dramatically.

Today, we're going to build up the knowledge we don't have, and start identifying and defining our "foundational concepts". Those are the things we _absolutely need to understand_ in order to do any well grounded work in this space.

## The foundational concepts

Judging from how they were mentioned and the frequency of mentions, here's what I think I need to understand first. I've included links to the place where they appear in the golang issue tracker, links to various places on the internet that contain definitions or helpful information.

### high level programming concepts

- code compilation *([wikipedia](https://en.wikipedia.org/wiki/Compiler))*
- compiler optimization *([wikipedia](https://en.wikipedia.org/wiki/Optimizing_compiler))*
- generating assembly code *([github](https://github.com/golang/go/issues/17566)) ([wikipedia](https://en.wikipedia.org/wiki/Code_generation_(compiler)))*

### computer processor concepts

- inter process communication (IPC) *([github](https://github.com/golang/go/issues/15734#issuecomment-220172384)) ([wikipedia](https://en.wikipedia.org/wiki/Inter-process_communication))*
- semaphore *([github](https://github.com/golang/go/issues/15734#issuecomment-220172384)) ([wikipedia](https://en.wikipedia.org/wiki/Semaphore_(programming)))*
- instruction cache (icache) *([github](https://github.com/golang/go/issues/29067#issuecomment-443887583)) ([wikipedia](https://en.wikipedia.org/wiki/CPU_cache#ICACHE))*
- registers *([github](https://github.com/golang/go/issues/25999#issuecomment-399196221)) ([wikipedia](https://en.wikipedia.org/wiki/Processor_register))*

### general compilation concepts

- bounds checks *(github [1](https://github.com/golang/go/issues/17566), [2](https://github.com/golang/go/issues/25862)) ([wikipedia](https://en.wikipedia.org/wiki/Bounds_checking))*
- function walking / `walk` *([github](https://github.com/golang/go/issues/15734)) ([wikipedia](https://en.wikipedia.org/wiki/Interpreter_(computing)))*
- typechecking *([github](https://github.com/golang/go/issues/15756)) ([wikipedia](https://en.wikipedia.org/wiki/Type_system))*
- compiled function nodes / abstract syntax trees (ASTs) *([github](https://github.com/golang/go/issues/17566)) ([wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree))*
- inlining functions *([github](https://github.com/golang/go/issues/17566)) ([wikipedia](https://en.wikipedia.org/wiki/Inline_expansion))*
- intrinsic functions *([github](https://github.com/golang/go/issues/17566#issuecomment-417111586)) ([wikipedia](https://en.wikipedia.org/wiki/Intrinsic_function))*

### compilation concepts with large impact on golang

- static single assignment (SSA) *(github [1](https://github.com/golang/go/issues/8893#issuecomment-134458436), [2](https://github.com/golang/go/issues/15736#issue-155612156), [3](https://github.com/golang/go/issues/17566#issuecomment-256149722)) ([godoc](https://godoc.org/golang.org/x/tools/go/ssa)) ([wikipedia](https://en.wikipedia.org/wiki/Static_single_assignment_form))*
- binary files / executables _(github [1](https://github.com/golang/go/issues/4719#issuecomment-66074026) [2](https://github.com/golang/go/issues/4719#issuecomment-470268217) [3](https://github.com/golang/go/issues/20070#issuecomment-296292391)) ([wikipedia](https://en.wikipedia.org/wiki/Executable))_
- `*.o` object files *(github [1](https://github.com/golang/go/issues/4719#issuecomment-144125808), [2](https://github.com/golang/go/issues/15734#issuecomment-339211682)) ([googlesource](https://go.googlesource.com/proposal/+/master/design/14386-zip-package-archives.md)) ([wikipedia](https://en.wikipedia.org/wiki/Object_file)*
- `*.a` archive files, the `ar` format *(github [1](https://github.com/golang/go/issues/4719), [2](https://github.com/golang/go/issues/15681#issuecomment-380967328), [3](https://github.com/golang/go/issues/15734#issuecomment-220173676)) ([stackoverflow](https://stackoverflow.com/questions/15551293/what-are-a-files-in-go)) ([googlesource](https://go.googlesource.com/proposal/+/master/design/14386-zip-package-archives.md)) ([wikipedia](https://en.wikipedia.org/wiki/Ar_(Unix)))*
- file linking / static vs dynamic linking *(github [1](https://github.com/golang/go/issues/14271), [2](https://github.com/golang/go/issues/4719#issuecomment-144125808), [3](https://github.com/golang/go/issues/15681#issuecomment-240319812)) ([wikipedia](https://en.wikipedia.org/wiki/Static_library)) (stackoverflow [1](https://stackoverflow.com/questions/26418883/golang-how-to-link-c-objects-using-cgo-ofiles), [2](https://stackoverflow.com/questions/1993390/static-linking-vs-dynamic-linking)) ([reddit](https://www.reddit.com/r/golang/comments/53nl4b/why_all_go_binaries_are_staticallylinked/))*
- export data _(github [1](https://github.com/golang/go/issues/15752), [2](https://github.com/golang/go/issues/15734), [3](https://github.com/golang/go/issues/20070)) (godoc [1](https://godoc.org/golang.org/x/tools/go/internal/gcimporter), [2](https://godoc.org/golang.org/x/tools/go/gcexportdata), [3](https://godoc.org/golang.org/x/tools/cmd/godex))_

### general computer science concepts

- runes _([github](https://github.com/golang/go/issues/27148#issuecomment-415131187)) ([stackoverflow](https://stackoverflow.com/questions/19310700/what-is-a-rune)) ([wikipedia](https://en.wikipedia.org/wiki/Runes))_
- the stack vs the heap _([github](https://github.com/golang/go/issues/25999#issuecomment-400841088)) ([stackoverflow](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap))_
- control flow *([github](https://github.com/golang/go/issues/17566#issuecomment-385211150)) ([wikipedia](https://en.wikipedia.org/wiki/Control_flow))*

### golang general concepts

- goroutines _(github [1](https://github.com/golang/go/issues/27345), [2](https://github.com/golang/go/issues/25999#issuecomment-400843932)) ([gobyexample](https://gobyexample.com/goroutines)) ([golang-book](https://www.golang-book.com/books/intro/10))_
- buffering and channels _([github](https://github.com/golang/go/issues/27345#issuecomment-419254790)) ([gobyexample](https://gobyexample.com/channel-buffering)) ([stackoverflow](https://stackoverflow.com/questions/22747711/what-is-the-use-of-buffered-channels-in-go)) ([medium](https://medium.com/capital-one-tech/buffered-channels-in-go-what-are-they-good-for-43703871828)) ([tour.golang.org](https://tour.golang.org/concurrency/3))_

---

🚧 WIP 🚧

---
