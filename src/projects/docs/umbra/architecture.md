# Architecture

umbra guards two surfaces an agent uses to cause chaos, plus a shared core. The package tree is organized around those surfaces so the directory you land in tells you which surface you are reading.

## The two surfaces

- **CLI exec** (`cli/`) - the original reason umbra exists: sit between an agent and an existing binary, audit and validate every argv before `execve`.
- **Outbound requests** (`http/`) - the extension for load-bearing platforms with no first-class CLI (Forgejo), and for upstream MCP servers ([mcpverb](mcpverb.md)). Guard the request, not the subprocess.

### The mcp dialect does not make a third surface

It reaches an upstream service, so it belongs to the request surface, and one detail is worth stating rather than leaving to be discovered: **an mcp stdio transport starts a subprocess.** That looks like `cli/` work sitting in `http/`.

It is not, because the split is about what is guarded rather than about syscalls. `cli/` guards a subprocess the operator asked for, where argv **is** the request. An mcp stdio child is transport for a call whose real payload is a tool name and a JSON object, and it is never caller-supplied. The spawn still passes `pkg/policy`, the same argv gate `cli/` uses, so it gains no weaker check by living here. `pkg/mcpclient` holds the client itself, in the core rather than either surface, because it expresses no permission. `pkg/mcpapps` sits there for the same reason one step further out: it answers an MCP App's frames and holds a `Policy` interface with no rules behind it, so the guardfile stays the only place a widget's calls are declared ([mcpapps.md](mcpapps.md)).
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

The downward-only arrow now holds with no exceptions. The last cross-surface import was `cli/passthrough` reaching into `http/egress`, and both left with ward's surface.

## Two front doors, and what that removes

Every package here is reached through **umbra** or through **beaver**. A package no front door reaches does not belong, which is what retired ward's surface: `cli/{gittree,passthrough,repocfg,shell}`, `http/egress`, and eight `pkg/` helpers went with the consumer that was their only caller.

## What stays flat

`cmd/`, `docs/`, `examples/`, and `scripts/` are not surfaces and stay at the repo root. Each `examples/<name>/` runnable still pairs with the primitive it demonstrates, now found under its surface dir.

## See also

- [FEATURES.md](FEATURES.md) - the per-package inventory, grouped by surface.
- [FEATURES.md](FEATURES.md) - per-primitive details.
