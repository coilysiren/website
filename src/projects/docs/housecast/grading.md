# Grading

The grading half, `housecast.grade`, and the `housecast grade` command that
drives it. Ported here from `agentic-os/aos-eval`, which is deleted once its
last consumer moves.

## What it is

Committed YAML in, human decisions and one-way display payloads out. It holds no
runner and no model client. The runner is `evalkit`, which reaches Inspect and
Agent Proxy, and the seam between them is deliberate: a board can be regraded
without re-running it, and a run can be repeated without regrading it.

    housecast grade help

is the long form. Every verb ends with the next one to run.

## Why it lives in the eval extra

The engine core installs with a YAML parser and nothing else, because a consumer
composing a bundle should not pay for a grading stack. `housecast.grade` and
`evalkit` both ride `housecast[eval]`, and `housecast grade` says so rather than
failing on an import error when the extra is absent.

`test_no_runner_reaches_the_dependency_set` pins the half that matters: no runner
reaches the **core** dependency set, whatever the extra carries.

## The profile is the deployment's

`Profile` exists so a deployment declares its own test types without this schema
growing a branch per consumer. `evalkit/profile.py` is agent-compose's, carrying
`boundary`, `role-fit`, `personality`, and `voice`. sirens-echo declares its own.
Adding a test type is a profile edit, never a schema edit.

## See also

* [`grading-surfaces.md`](grading-surfaces.md) - the terminal and browser loops.
* [`grading-evidence.md`](grading-evidence.md) - the public and private halves.
* [`grading-schema.md`](grading-schema.md) - schema ids as a wire format.
