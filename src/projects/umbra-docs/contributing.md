# Contributing to umbra

Thank you for your interest! :wave:

This project is run on volunteer time, so please have patience.

## Before you open a PR

1. **Open an issue first.** Every commit in this repo closes a same-repo issue (`closes #N` in the commit body). Discussion happens in the issue; the PR is the change itself. This applies even to trivial fixes - the issue gives the change a stable URL.
2. **Stay close to scope.** The four cli-* repos are intentionally small. Features that pull this package out of its lane will get pushed back, even when well-intentioned. The [README](https://github.com/coilysiren/cli-guard#readme) and [docs/FEATURES.md](https://github.com/coilysiren/cli-guard/blob/main/docs/FEATURES.md) describe the surface; if your idea expands it, lead with an issue arguing for the expansion.
3. **Run the dev verbs before pushing.** Local dev routes straight through `make` (umbra is the framework itself, not a guarded consumer):

   ```
   make build
   make test
   make vet
   make lint
   ```

   CI runs the same set on every push.

4. **Update `godoc-current.txt` if you touch the public API.** Run `make godoc-update` and commit the diff in the same PR. CI fails if the snapshot is out of sync.

## Code of Conduct

Participation in this community is governed by the [Code of Conduct](CODE_OF_CONDUCT.md), adapted from the [Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## Security disclosures

See [SECURITY.md](SECURITY.md). Do not file vulnerabilities as public issues.

## Agent-driven contributions

Pull requests authored or substantially edited by an LLM-driven agent are welcome. See [AGENTS.md](https://github.com/coilysiren/cli-guard/blob/main/AGENTS.md) for the conventions a contributing agent should follow (issue-first, `Dangerously*` naming, dev-verb routing through `make`, etc).
