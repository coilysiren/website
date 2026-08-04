# coilysiren.me

my internet website

## Git workflow

Commit directly to `main` without asking for confirmation, including `git add`. Do not open pull requests unless explicitly asked.

Commit whenever a unit of work feels sufficiently complete, such as after fixing a bug, adding a feature, passing tests, or reaching any other natural stopping point. Don't wait for the user to ask.

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/b6cfcd3d-e5e6-4893-86da-2a218fa8587f/deploy-status)](https://app.netlify.com/sites/coilysiren-dot-me/deploys)

## Local development

The site uses Node.js 24 LTS and pnpm 11. Corepack reads the exact pnpm release
from `package.json`, while `.node-version` keeps local development and hosted
builds on the same Node release.

Eleventy renders the site to ordinary static files in `dist/`. The production
output contains no browser JavaScript, hydration runtime, analytics, or remote
asset dependencies.

## Commands

Dev commands are declared in [`.ward/ward.yaml`](.ward/ward.yaml). Run them as `ward exec <verb>`.

- `ward exec install` - install the locked dependency graph.
- `ward exec dev` - clean, build, and serve Eleventy with live reload.
- `ward exec test` - run formatting, lint, type, and unit checks.
- `ward exec build` - create the production site in `dist/`.
- `ward exec build-resume` - regenerate the PDF from the checked-in resume page in an isolated `uv` environment.
- `ward exec image-build` - build the static staging image.
- `ward exec image-smoke` - validate nginx inside the staging image.
- `ward exec image-publish-check` - validate the trusted publisher script.
- `ward exec test-e2e-ci` - serve the production build and run the Cypress smoke test.
- `ward exec deps-outdated` - report dependency releases available upstream.

The dependency updater keeps Node types on the Node 24 runtime line and
TypeScript on 6.x until typescript-eslint supports TypeScript 7.

See [docs/static-generation.md](docs/static-generation.md) for the template,
content, asset, metadata, and output contracts.

## Hosting

Netlify remains the production host for the canonical
<https://coilysiren.me> site. The [staging image](docs/staging.md) supplies the
same static build to <https://website.coilysiren.me>. The
source repository publishes an immutable private image to Forgejo OCI.
`coilyco-bridge/deploy` owns its Kubernetes rollout, DNS, and TLS.

## See also

- [AGENTS.md](AGENTS.md) - agent-facing operating rules.
- [docs/FEATURES.md](docs/FEATURES.md) - inventory of what ships today.
- [.ward/ward.yaml](.ward/ward.yaml) - allowlisted commands. Agents route through ward, not bare `make` / `uv` / `python` / `npm` / `cargo` / `dotnet`.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
