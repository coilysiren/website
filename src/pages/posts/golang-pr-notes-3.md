---
template-key: blog-post
title: Golang PR Field Notes (Part 3)
date: 2019-12-29T06:56:16.003Z
description: 'In this part, we start building foundational knowledge.'

---

if you're looking for part 2, [it's back this way <===](https://lynncyrin.me/posts/2019-12-26-golang-pr-field-notes-part-2/)

## When we last saw our protagonist

The last time we were here, we took the time to identify some concepts we may need to understand, in order to do our work. That list of concepts is very long, and the actual relevance of the individual concepts varies fairly dramatically.

Today, we're going to build up the knowledge we don't have, and start identifying and defining our "foundational concepts". Those are the things we _absolutely need to understand_ in order to do any well grounded work in this space.

## The foundational concepts

Judging from how they were mentioned and the frequency of mentions, here's what I think I need to understand first. I've included links to the place where they appear in the golang issue tracker, links to various places on the internet that contain definitions or helpful information, and finally my personal re-definition of the term.

### high level programming concepts

- **code compilation** *([wikipedia](https://en.wikipedia.org/wiki/Compiler))*
  - In a general sense, **code compilation** is any process of turning one programming language into another. It's most common specific usage is in turning a high level language (like python or go) into a low level language (like assembly or machine code) to create an executable.
- **compiler optimization** *([wikipedia](https://en.wikipedia.org/wiki/Optimizing_compiler))*
  - **compiler optimization** is the practice of trying to optimize the process of code compilation for any of the following attributes: compile time, code output size, memory requirements, and power consumption.
- **assembly code** *([wikipedia](https://en.wikipedia.org/wiki/Code_generation_(compiler)))*
  - **assembly code** is the code that computers actually know how to read. Most compilers work by turning some source code into some machine code, where the target machine code is often an assembly language. It's possible, but very annoying, to write assembly code directly.

### computer processor concepts

- **inter process communication (IPC)** *([github](https://github.com/golang/go/issues/15734#issuecomment-220172384)) ([wikipedia](https://en.wikipedia.org/wiki/Inter-process_communication))*
  - by "default" processes share no memory and cannot directly communicate with each other. **IPC** is a set of techniques on can use to share data between processes.
- **semaphore** *([github](https://github.com/golang/go/issues/15734#issuecomment-220172384)) ([wikipedia](https://en.wikipedia.org/wiki/Semaphore_(programming)))*
  - a **semaphore** is a construct that is used to control access to shared data across multiple concurrent processes. Semaphores are conceptually related to UNIX pipes, although it's unclear to me if pipes specifically are semaphores. In general, semaphores become required for certain kinds of complex work across multiple processes.
- **instruction cache (icache)** *([github](https://github.com/golang/go/issues/29067#issuecomment-443887583)) ([wikipedia](https://en.wikipedia.org/wiki/CPU_cache#ICACHE))*
  - a cache is a place where you store things so that you can access them more quickly. An **icache** is a cache for instructions to be run by the CPU. Instructions in this context are lines of source code that are compiled to some machine code. CPUs may have some mechanism for moving instructions into / out of the icache, but that's a subject for another day.
- **registers** *([github](https://github.com/golang/go/issues/25999#issuecomment-399196221)) ([wikipedia](https://en.wikipedia.org/wiki/Processor_register))*
  - processor **registers** are a type of cache used by the CPU. They are the top of the pyramid in the [memory hierarchy](https://en.wikipedia.org/wiki/Memory_hierarchy), which is to say that they are the fastest memory location available to the CPU. Registers are very very small, their maximum size typically being registered in bits. The amount of memory available to registers (~32 bits) can be contrasted with the memory available to RAM (~8GB, so 10^9 larger) and the memory available to hard drives (~1TB, so 10^12 larger)

### general compilation concepts

- **bounds checks** *(github [1](https://github.com/golang/go/issues/17566), [2](https://github.com/golang/go/issues/25862)) ([wikipedia](https://en.wikipedia.org/wiki/Bounds_checking))*
  - **bounds checking** is a process via which a CPU can check that a variable meets some conditions before it is used. One common type of bounds checking is range checking, where a variable is checked to see if it fits into a given type, like a u8 (unsigned 8 bit int) or i16 (signed 16 bit int). Another common type of bounds checking is index checking, where an index to an array is checked to see if it actually fits in that array.
- **compiled function nodes / abstract syntax trees (ASTs)** *([github](https://github.com/golang/go/issues/17566)) ([wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree))*
  - **ASTs** are an abstract representation of some source code, generally created by some kind of parser or compiler. ASTs represent certain elements as nodes in the tree, such as functions, if statements, and comparisons. The term **compiled function node** can refer to either the literal individual node in an AST representing the function, or the individual function node and all of it's children in the tree.
- **inlining functions** *([github](https://github.com/golang/go/issues/17566)) ([wikipedia](https://en.wikipedia.org/wiki/Inline_expansion))*
  - this concept primarily relates to compiler optimization. For some parent function that calls some child function, the child function can either be represented as a separate function "node" - or it can be **inlined** into the parent **function** in a manner functionally equivalent to copy pasting. The dynamics of when something should vs should not be inlined are a matter of long and frequent discussion within golang, in particular [in this issue](https://github.com/golang/go/issues/17566).
- **intrinsic functions** *([github](https://github.com/golang/go/issues/17566#issuecomment-417111586)) ([wikipedia](https://en.wikipedia.org/wiki/Intrinsic_function))*
  - **intrinsic functions** are special and fancy functions within a language, that have some extra tricks that leverage more low level processor / memory resources. They're sometimes written directly in assembly, and are often architecture specific (eg. like specific to AMD processors).

### compilation concepts with large impact on golang

- **static single assignment (SSA)** *(github [1](https://github.com/golang/go/issues/8893#issuecomment-134458436), [2](https://github.com/golang/go/issues/15736#issue-155612156), [3](https://github.com/golang/go/issues/17566#issuecomment-256149722)) ([godoc](https://godoc.org/golang.org/x/tools/go/ssa)) ([wikipedia](https://en.wikipedia.org/wiki/Static_single_assignment_form))*
  - **SSA** is a compiler design mechanism, wherein each variable is assigned to be assigned once and only once. In SSA, if a new value is assigned to a variable then a new version of that variable if created. SSA is primarily used for compiler optimization, since the guarantee of "a variable's value will never change" can enable a variety of compiler optimization algorithms.
  - golang has a large [SSA package](https://godoc.org/golang.org/x/tools/go/ssa) that does various activities related to SSA.
- **binary files / executables** _(github [1](https://github.com/golang/go/issues/4719#issuecomment-66074026) [2](https://github.com/golang/go/issues/4719#issuecomment-470268217) [3](https://github.com/golang/go/issues/20070#issuecomment-296292391)) ([wikipedia](https://en.wikipedia.org/wiki/Executable))_
  - An **executable** is a file that can be run by a machine in order to do some task. Executable files contrast most sharply with data files, which do not contain task instructions and instead contain information. Many executables are **binary files** mean to be run by a machine directly, although the term executable can also be applied to the source code files of scripting languages (like python, and _unlike go_).
  - In golang care has been taken to make the generation of executable binary files both fast and reliable.
- **`*.o` object files** *(github [1](https://github.com/golang/go/issues/4719#issuecomment-144125808), [2](https://github.com/golang/go/issues/15734#issuecomment-339211682)) ([googlesource](https://go.googlesource.com/proposal/+/master/design/14386-zip-package-archives.md)) (wikipedia [1](https://en.wikipedia.org/wiki/Object_file), [2](https://en.wikipedia.org/wiki/Object_code))*
  - **object files** are the output of a compiler, and it's contents are usually in a machine language such as binary. Object files usually contain data points that a linker can use to fill in code from other places.
  - Go's compiler produces object files as one of the compiler outputs.
- **`*.a` files** *(github [1](https://github.com/golang/go/issues/4719), [2](https://github.com/golang/go/issues/15681#issuecomment-380967328), [3](https://github.com/golang/go/issues/15734#issuecomment-220173676)) ([stackoverflow](https://stackoverflow.com/questions/15551293/what-are-a-files-in-go)) ([googlesource](https://go.googlesource.com/proposal/+/master/design/14386-zip-package-archives.md)) ([wikipedia](https://en.wikipedia.org/wiki/Ar_(Unix)))*
  - Go's `*.a` files are package archive files, they were originally in the [ar archive format](https://en.wikipedia.org/wiki/Ar_(Unix)). There was at some point [a proposal](https://github.com/golang/go/issues/14386) to change them to the more standard zip file format. Archive files contain compiled package code, and additionally some debugging information.
- **file linking / static vs dynamic linking** *(github [1](https://github.com/golang/go/issues/14271), [2](https://github.com/golang/go/issues/4719#issuecomment-144125808), [3](https://github.com/golang/go/issues/15681#issuecomment-240319812)) ([wikipedia](https://en.wikipedia.org/wiki/Static_library)) (stackoverflow [1](https://stackoverflow.com/questions/26418883/golang-how-to-link-c-objects-using-cgo-ofiles), [2](https://stackoverflow.com/questions/1993390/static-linking-vs-dynamic-linking)) ([reddit](https://www.reddit.com/r/golang/comments/53nl4b/why_all_go_binaries_are_staticallylinked/))*
  - **linking** is the process by which an object file can request that other code be inserted into it. **dynamic linking** is a linking process where the linking is not truly resolved until runtime, creating a dependency on external files (like DDLs). **static linking** is a linking process where any links are resolved at compile time, creating a fully self-contained object.
  - static linking is the better choice in like 99% of all cases.
  - golang's compiler uses static linking, either exclusively or by default (I'm not sure which).
- **export data** _(github [1](https://github.com/golang/go/issues/15752), [2](https://github.com/golang/go/issues/15734), [3](https://github.com/golang/go/issues/20070)) (godoc [1](https://godoc.org/golang.org/x/tools/go/internal/gcimporter), [2](https://godoc.org/golang.org/x/tools/go/gcexportdata), [3](https://godoc.org/golang.org/x/tools/cmd/godex))_
  - the literal reference for _"the **data** that is **exported** from a package"_.
  - it's usage within golang is golang specific, because there are standard library tools (linked above) in golang built around managing export data. Those tools are responsible for the format and content of the export data.
  - that said, the term itself is fairly generic since "exported data" can mean an entire universe of things.

### general computer science concepts

- **runes** _([github](https://github.com/golang/go/issues/27148#issuecomment-415131187)) ([stackoverflow](https://stackoverflow.com/questions/19310700/what-is-a-rune)) ([blog.golang.org](https://blog.golang.org/strings))_
  - **runes** are integer values that point to particular unicode code points.
- **the stack vs the heap** _([github](https://github.com/golang/go/issues/25999#issuecomment-400841088)) ([stackoverflow](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap))_
  - the **stack** is an area of memory that uses last-in-first-out access patterns, and is used for rapid access to small data. The term stack can be remembered by thinking of someone quickly stacking a pile of plates as they're being washed.
  - the **heap** is an area of memory where access is done in an ad-hoc manner, and is used for longer term access to large data. In general, high level scripting languages (ex. ruby and python) allocate most / all of their memory of the heap, for the sake of simplicity at the cost of performance. The term heap can be remembered by thinking of a large pile (eg. a "heap") of objects scattered about randomly.

### golang general concepts

- **goroutines** _(github [1](https://github.com/golang/go/issues/27345), [2](https://github.com/golang/go/issues/25999#issuecomment-400843932)) ([gobyexample](https://gobyexample.com/goroutines)) ([golang-book](https://www.golang-book.com/books/intro/10))_
  - **goroutines** are [not threads](https://codeburst.io/why-goroutines-are-not-lightweight-threads-7c460c1f155f) 😅. They're go's concurrency model. goroutines are to go as processes are to a CPU.
- **buffering and channels** _([github](https://github.com/golang/go/issues/27345#issuecomment-419254790)) ([gobyexample](https://gobyexample.com/channel-buffering)) ([stackoverflow](https://stackoverflow.com/questions/22747711/what-is-the-use-of-buffered-channels-in-go)) ([medium](https://medium.com/capital-one-tech/buffered-channels-in-go-what-are-they-good-for-43703871828)) ([tour.golang.org](https://tour.golang.org/concurrency/3))_
  - **channels** are like IPC except for goroutines. They allow communication and synchronization between goroutines. **buffering** allows channels to act asynchronously by creating little pools (buffers) that each side can interact with without blocking.

## Wow! What have we learned?

...everything 😆. Interestingly, a lot (most?) of these concepts were concepts that I already had some awareness of, I just wasn't able to define them. Now empowered with these definitions, when I read issues like https://github.com/golang/go/issues/15752 I have a much much stronger understanding of what's being described.

## Up next

Now that I know **a ton** more about this space, I can more accurately judge whether or not a particular github issue is a good fit for me to work on. There are several types of issues that I now know aren't quite a good fit for a first-timer, for example this issue about [improving inlining](https://github.com/golang/go/issues/17566). In my next post I'll setup a more targeted framework for determining who approachable the various issues are, and (🤞🏽ideally🤞🏽) pick one to start working on.
