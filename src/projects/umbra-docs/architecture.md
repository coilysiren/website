# Architecture

umbra guards two surfaces an agent uses to cause chaos, plus a shared core. The package tree is organized around those surfaces so the directory you land in tells you which surface you are reading.

## The two surfaces

- **CLI passthrough** (`cli/`) - the original reason umbra exists: sit between an agent and an existing binary, audit and validate every argv before `execve`.
- **HTTP requests** (`http/`) - the extension for load-bearing platforms with no first-class CLI (Forgejo). Guard the request, not the subprocess.
## The shared core

- **pkg** (`pkg/`) - everything the two surfaces share: audit, policy, scope, exit-code taxonomy, the config/cache plumbing, and the generic skill/command-tree renderers.

## Import rule

The dependency arrow runs **downward only**: a surface depends on `pkg/`, never on another surface.

```
cli/  ─┐
http/ ─┴─►  pkg/
```

`pkg/` imports nothing from `cli/` or `http/`. This keeps the surfaces independently coherent: a reader looking for "how do we guard an HTTP call" lands in one subtree, and shared machinery has exactly one home.

## Config validation is core, not a fourth surface

The two surfaces express **permissions**; **config validation does not**, so it lives in the core (`pkg/`), never as a third guarded surface. `pkg/config` supplies the layered-config primitives - loading, overlay, and typing - and its vocabulary structurally cannot express a grant: no `mount`, no `exec`, no `can run`. That package boundary **is** the config/permission partition. Keeping config in core is what keeps the two-surface least-privilege identity legible: `cli/` and `http/` stay the whole permission story, and a reader never has to wonder whether a config file is also a policy file. This is the config-placement doctrine's landing in umbra, generalizing the downward-only arrow above.

Some legacy cross-surface imports still exist (for example `cli/passthrough` reaches into `http/egress` to wire a single guarded command end-to-end). Those predate the split and are being unwound; the directory layout makes them visible so they can be removed rather than multiplied. New code must respect the downward-only arrow.

## What stays flat

`cmd/`, `docs/`, `examples/`, and `scripts/` are not surfaces and stay at the repo root. Each `examples/<name>/` runnable still pairs with the primitive it demonstrates, now found under its surface dir.

## See also

- [FEATURES.md](FEATURES.md) - the per-package inventory, grouped by surface.
- [features-detail.md](features-detail.md) - per-primitive details.
