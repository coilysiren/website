# Agent instructions

Workspace conventions load globally via `~/.claude/CLAUDE.md` -> `agentic-os-kai/AGENTS.md`. This file covers only what is specific to this repo.

---

`src/about.njk` is one of the sync targets for `src/pages/resume.md`'s intro
paragraphs (see the parent `AGENTS.md` for the full sync list). Direct-to-main
per the workspace git workflow, no PR.

---

## Post-push follow-up (auto-schedule)

Per the workspace "Default to proactive scheduling" rule: after pushing to
`main`, schedule a wake-up to verify the test workflow passed. The site itself
is built and served externally (Eleventy plus static hosts). Forgejo Actions
cover tests, image publication, mirroring, and trufflehog. They do not own the
Netlify or Kubernetes rollout.

- **Cadence**: 300s after push.
- **Verify CI**: `aosguard ops forgejo tasks list coilysiren website --limit 2`
  should show `completed/success` for the test and staging-image publish jobs.
  Re-schedule once at +180s if either is in progress. Surface and stop on
  failure.
- **Skip** for trivia (typo fixes, content-only edits where Cypress smoke is irrelevant).
- **Site deploy verification** is out of scope here. Netlify and the deploy
  repository own their respective rollout health. This repository proves the
  Eleventy output and staging image contract before the push.

## Commands

Route every dev command through ward, which reads [`.ward/ward.yaml`](.ward/ward.yaml) (run verbs with `ward exec <verb>`). The lockdown denies bare invocations of the underlying tools (`npm`, `npx`, etc.). Add new verbs to that file before invoking them.

## See also

- [README.md](README.md) - human-facing intro.
- [docs/FEATURES.md](docs/FEATURES.md) - inventory of what ships today.
- [.ward/ward.yaml](.ward/ward.yaml) - allowlisted commands. Agents route through ward, not bare `make` / `uv` / `python` / `npm` / `cargo` / `dotnet`.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
