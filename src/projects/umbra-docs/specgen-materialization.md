# specgen materialization: cache, embedded files, skills

`run` and `build` materialize the generated binary out-of-band, so the consumer keeps policy and locks in source control and never commits generated Go.

The materialized module lives under `config.CacheDir()`: generated `main.go`, the `go.mod` and `go.sum` replayed from `specverb.lock`, embedded inputs, and the binary. The cache key is the binary name plus the sorted root-relative member identities, so one project caches both its source build and a renamed `--binary` build, and a tree moved elsewhere keeps its identity.

`.stamp.json` records input hashes for member identities and bytes, spec contracts, dependency lock, and generator version. A rebuild fires only when one changes or the binary is missing. `run` refuses without committed locks rather than silently locking, and `lock` is the only online step, so the first `run` after it works offline.

## The cache lock, and where it is absent

Materialize+build runs under an advisory lock on `<cache>/.lock` via `pkg/flock`, so two concurrent runs against one cache dir serialise rather than race. That lock is **unix-only**. Elsewhere specgen prints to stderr that it is building unserialised and continues, rather than reporting a lock it never took. Continuing is deliberate: specgen ships Windows binaries and the build is idempotent. Being quiet was not.

## Embedded fixed files

An exec grant may `embed "scripts/x.py"` a reviewed file into the binary and place its absolute runtime path at a fixed argv position, so complex logic needs no repository checkout. `argv` fragments and `embed` nodes append in declaration order, and help shows `<embedded:scripts/x.py>` rather than the temporary path. `embed` counts as a pinned argv override, so a grant holding only an embedded file can be `sealed`.

The source path is relative to the declaring guardfile and must be normalized and confined to it. Absolute paths, `..`, symlink escapes, missing files, and artifact collisions fail the build, and one file is limited to 4 MiB. Its identity and bytes join the cache hash, so changing only content still rebuilds.

## Generated skills

`--skills-out <root>` is opt-in; ordinary verbs write no skill into the consumer tree. The selected binary writes `<root>/<binary>/SKILL.md` plus `references/commands.yaml`, listing every reachable leaf and its canonical flags. Identical specs, locks, names, and generator versions produce identical output.

The eager `SKILL.md` stays small: it tells an agent to start with `--help` and use `describe`, while the lazy index makes every leaf discoverable without copying exhaustive prose into startup context. The running CLI remains authoritative: the skill grants no permission and resolves no credential.
