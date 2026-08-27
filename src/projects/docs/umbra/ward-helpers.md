# ward helper packages

Reusable helpers lifted out of ward so any consumer imports one source of truth instead of carrying its own copy. Each is standalone, dependency-free beyond the stdlib, and importable from a different binary without consumer-specific types leaking in. Indexed from [FEATURES.md](FEATURES.md).

## `pkg/scan` - junk-scan

Pure policy over a caller-supplied `[]Entry`. `Diff` returns one `Finding` per flagged path: vendored or generated trees (`node_modules`, `vendor`, `.venv`, `target`), credential-shaped files (`.env`, `id_rsa`, `*.pem`, with `.example` / `.sample` allowed), and oversized (>=5 MiB) or large-binary (>=1 MiB) blobs. First rule per path wins. No git or filesystem access, so a reaper, a pre-merge gate, and a CI step share one ruleset.

## `pkg/attribution` - agent identity and signing

`Identity{Name, Pronouns}.Label()` renders "Claude (she/her)" or "Goose". A `Signer` carries that identity plus consumer-supplied text: an idempotency `Marker`, a footer tail `Via`, and a trailer `Email`. `SignBody` appends a hidden-marker footer exactly once, idempotent and empty-body-safe, and `CommitTrailer` renders a git `Co-Authored-By` line. No baked-in agent roster: the caller supplies who signs.

## `pkg/flock` - advisory file lock

`Exclusive` / `Unlock` over a shared lock `*os.File`, wrapping BSD advisory `flock(2)` for cross-process mutual exclusion, one warm-cache writer at a time.

**Unix-only, and it says so.** The syscall exists nowhere else, so a non-unix caller is refused with `flock.ErrUnsupported` naming the `GOOS`, never `nil`. A no-op reporting success is indistinguishable from a held lock, the one answer a lock must never give. Match it with `errors.Is`; it is distinct from contention, since nobody holds the lock and there is no lock. A non-unix build still compiles for every consumer that never takes one.

## `pkg/version` - release-tag compare

`Parse` splits a `vX.Y.Z` tag into three ints, tolerating a missing `v`, a short tag, and a `-pre` / `+build` suffix. `Behind(current, latest)` powers a self-update nag, returning true only when both tags parse and `current` unambiguously trails, so it never cries wolf on a dev or unparseable build. `LooksReleased` screens the `dev` or blank build.

## `pkg/issueref` - issue-ref parse

`Parse(s, baseURL)` turns a ref into `Ref{Owner, Repo, Number}`. Three forms parse: `owner/repo#N`, a bare `#N` or `N` with owner and repo left for the caller to fill from context, and a Forgejo issue URL tolerating a trailing slash, query, or fragment. An empty `baseURL` disables URL parsing.

## `pkg/ownertrust` - owner allow-list gate

`List{Primary, Extra}.Allowed(owner)` is the single yes/no an elevated agent needs before fanning out into a repo, and an empty owner is never allowed. `Label` renders the accepted set for a refusal message: `primary/*` for one owner, `{primary, a, b}/*` when `Extra` adds more.
