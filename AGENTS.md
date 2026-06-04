# Agent instructions

Workspace conventions load globally via `~/.claude/CLAUDE.md` -> `agentic-os-kai/AGENTS.md`. This file covers only what is specific to this repo.

---

`src/pages/about.md` is one of the sync targets for `Resume.md`'s intro paragraphs (see the parent `AGENTS.md` for the full sync list). Direct-to-main per the workspace git workflow, no PR.

---

## Post-push follow-up (auto-schedule)

Per the workspace "Default to proactive scheduling" rule: after pushing to `main`, schedule a wake-up to verify the test workflow passed. The site itself is built and served externally (Gatsby + a static host); the GitHub Actions workflows here cover tests, automerge, the Pulse data refresh, and trufflehog - none of them are the deploy pipeline.

- **Cadence**: 300s after push.
- **Verify CI**: `coily gh run list --repo coilysiren/website --limit 1` should show `completed/success`. Re-schedule once at +180s if in progress; surface and stop on failure.
- **Skip** for trivia (typo fixes, content-only edits where Cypress smoke is irrelevant).
- **Site deploy verification** is out of scope here - whichever host serves coilysiren.me handles that on its own cadence.

## Commands

Route every dev command through coily, which reads [`.coily/coily.yaml`](.coily/coily.yaml). The lockdown denies bare invocations of the underlying tools (`npm`, `npx`, etc.). Add new verbs to that file before invoking them.

## See also

- [README.md](README.md) - human-facing intro.
- [docs/FEATURES.md](docs/FEATURES.md) - inventory of what ships today.
- [.coily/coily.yaml](.coily/coily.yaml) - allowlisted commands. Agents route through coily, not bare `make` / `uv` / `python` / `npm` / `cargo` / `dotnet`.

Cross-reference convention from [coilyco-bridge/agentic-os-kai#313](https://github.com/coilyco-bridge/agentic-os-kai/issues/313).
