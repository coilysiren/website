# Features

Baseline inventory of what `coilysiren/website`
([coilysiren.me](https://coilysiren.me)) ships today. Update a section when a
feature is added, removed, or reshaped, so the diff shows scope drift.

## What ships

- **Stack** - Eleventy, Nunjucks, Markdown, and Sass, output as plain HTML with
  no browser JavaScript. See [the stack](stack.md).
- **Pages** - route-by-route inventory in [site pages](pages.md).
- **Templates and data** - layouts, includes, and data files in
  [templates and data](templates.md).
- **Build scripts** - `build-resume.py` renders the printable resume and
  `clean-output.mjs` clears stale output, both under [scripts/](../scripts/).
- **CI workflows** - every workflow and its trigger in
  [CI workflows](ci-workflows.md).

## Tests, deploy, baseline

- **Cypress** production-output tests under [cypress/e2e/](../cypress/e2e/)
  cover the canonical pages, retired-route and designed 404s, local-only asset
  requests, and the absence of browser scripts and social-image metadata.
- **Deploy** - how a merge reaches production: [deploy](deploy.md).
- **Managed pre-commit block** from agentic-os plus a local offline
  `trufflehog` hook.

## See also

- [README.md](../README.md) - human-facing intro and local-dev quickstart.
- [staging.md](staging.md) - staging image boundary and local verification.
- [AGENTS.md](../AGENTS.md) - agent-facing operating rules.
- [.ward/ward.yaml](../.ward/ward.yaml) - allowlisted commands.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
