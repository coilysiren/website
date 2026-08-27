# passthrough dialect (execverb)

The default-allow shape of [execverb](execverb.md): a tool wrapped whole rather than verb-by-verb. Where `exec` + `can run` is an allowlist, `passthrough` opens a `can run "*"` funnel and the wrap-level guards subtract from it. It suits interactive tools where naming every shape is impractical, but a few things must still be refused.

```kdl
wrap ward ssh {
    passthrough ssh                                       // exec ssh + an implicit `can run *`
    never pass rm                                         // deny an rm positional over the funnel
    only pass when shell hostname is "*macbook*" "*-laptop" // host gate, fail-closed
}
```

- **`passthrough <bin> [prefix...]`** - sugar for `exec <bin>` plus an implicit `can run "*"`. The first argument is the binary, the rest fixed leading argv, so `passthrough tailscale ssh` execs `tailscale ssh <args...>`. Mutually exclusive with `exec` and `can run`: a wrap is an allowlist or a funnel, never both. Accepts an `{ env ... }` body.
- **`never pass <token...>`** - refuse when any positional matches a token glob.
- **`never pass when <selector> is <glob...>`** - deny on a match. **`only pass when ...`** - pass only on a match, fail closed otherwise.

`is` and `matches` are interchangeable case-insensitive glob comparators. All three guards take an optional `{ describe "..." }` note and are enforced on every leaf, before any exec.

A selector is either an **argv slot** (`any-arg`, `argN`, or a flag name) or an ambient **`shell <cmd> <args...>`** source. The shell source execs the command directly, with no shell interpretation, so a guardfile cannot inject; it runs once at invocation and matches its trimmed stdout. A resolver error fails the guard closed.

## The host gate

The motivating use is `only pass when shell hostname is <workstation globs>`. The local hostname is a value the caller cannot forge, so the gate cleanly answers "may this machine originate the call": workstations match, and servers or CI nodes fail closed. That is what makes a passthrough safe to grant - the funnel is open, but only from trusted origins, and the host fact is ambient rather than argv-derived.

## Limits

A `never pass <token>` over an opaque-argument tool is a speed-bump, not a boundary. `ssh host rm -rf /` is caught, but `ssh host /bin/rm ...`, `ssh host 'foo; rm ...'`, and an `rm` inside a remote shell are not, because ssh runs an opaque string on another box. Real protection for the remote side is the remote host's own controls. The host gate, by contrast, is a genuine boundary: it gates the trusted origin, not the untrusted payload.

## Engine

The wildcard funnel already enforced `when`/`deny-when`, gates, and flag policy at invocation. The passthrough dialect lifts `when`/`deny-when` to wrap scope, applied to every leaf, and adds the `shell` selector source resolved through an injectable `HostResolver`. `Surface.Guards` renders the wrap-level guards in the describe doc.
