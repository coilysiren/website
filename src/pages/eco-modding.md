---
title: "Eco Modding"
---

<div style="text-align: center;">

[![Eco by Strange Loop Games](https://cdn.cloudflare.steamstatic.com/steam/apps/382310/header.jpg)](https://store.steampowered.com/app/382310/Eco/)

<sub>Banner: Steam header for Eco by [Strange Loop Games](https://strangeloopgames.com/). Used here for attribution; not my artwork.</sub>

</div>

Over rolling 6-month windows, modding [Eco](https://play.eco/) is my single biggest open-source output. The darkest greens on my GitHub contribution graph tend to be mods for this game, not day-job code.

Eco is a multiplayer survival and simulation game by [Strange Loop Games](https://strangeloopgames.com/). Players collaborate to build a civilization on a shared procedurally generated planet and stop an incoming meteor, while an ecological simulation tracks the damage their extraction, pollution, and land use do to the biosphere. I run a server called **Eco via Sirens** on ~2-month cycles.

## What I build

My mods live at [coilysiren/eco-mods-public](https://github.com/coilysiren/eco-mods-public). They target `Eco.ReferenceAssemblies`, build with `dotnet build`, and ship as `.zip` bundles. A lot of the repetitive boilerplate (recipes, crafting stations, skill trees) is code-generated from Python templates via `tasks.py` + `main.cs`, which keeps the surface area small enough for one person to maintain across cycles.

The **BunWulf** family fleshes out the mid-game economy with new professions and crop variety:

- **BunWulfAgricultural**: extended farming and crop variety.
- **BunWulfBiochemical**: a plant-based Biochemist profession, intended as an alternative to petrochemical oil.
- **BunWulfEducational**: a Librarian profession that can craft skill books across every discipline.
- **BunWulfHardwareCo**: specialty hardware items.

Standalone mods fill gaps I've hit while playing:

- **DirectCarbonCapture**: late-game atmospheric CO2 mitigation.
- **EcoNil**: weather and moisture mechanics.
- **MinesQuarries**: infinite but expensive mining and quarrying, designed around vertical integration.
- **ShopBoat**: a mobile shop as a world object.
- **WorldCounter**: world statistics tracking.

There's a decent amount of adjacent work on GitHub but the overlap is narrow. On the mod side, there are a few public collections like [TheKye/elixr-mods](https://github.com/TheKye/elixr-mods) (the Elixr Mods family, a long-running community mod pack) and [Kirthos/KirthosMods](https://github.com/Kirthos/KirthosMods) (another single-author multi-mod library). On the ops side, the published projects are almost all Docker-first wrappers around the server binary, e.g. [zokradonh/ecogameserver](https://github.com/zokradonh/ecogameserver) and [stroebs/eco-docker](https://github.com/stroebs/eco-docker).

What I can't find much of is the seam I care about: end-to-end *cycle* automation (seed rolls, preview GIF to Discord, mod sync, cross-server ad templating, go-live flip) against a native Eco install. [eco-cycle-prep](https://github.com/coilysiren/eco-cycle-prep) is the other shape: it assumes steamcmd + systemd on Linux and automates the cycle, not the container.

## Running the server

Eco via Sirens lives on my homelab, reachable over [Tailscale](https://tailscale.com/). The deploy side is handled out of [coilysiren/infrastructure](https://github.com/coilysiren/infrastructure). The server and the mods aren't two projects, they're one feedback loop: things I notice while playing become issues, and things I fix in mods get playtested on the next cycle.

Cycle prep is automated by [eco-cycle-prep](https://github.com/coilysiren/eco-cycle-prep), a set of [Invoke](https://pyinvoke.org/) tasks in Python that handle:

- `steamcmd` updates and git pulls across the config and mod repos.
- Rolling candidate worldgen seeds against a checked-in `WorldGenerator.eco`, waiting for preview renders, and posting the preview GIFs to Discord.
- Syncing mods onto the game server.
- Emitting the cross-server ad on the main Eco Discord plus the longer `#eco-configs` cycle post.
- The actual go-live flip (runtime-only on the server, never committed to git).

## Work in progress

Two newer projects around the edges of the server, both still WIP:

- [eco-mcp-app](https://github.com/coilysiren/eco-mcp-app) — an inline Claude Desktop widget (via the [MCP Apps](https://modelcontextprotocol.io/docs/concepts/apps) spec) for any public Eco server. Ask Claude "what's the Eco server doing?" and a live card comes back: meteor countdown, online/total players, world size, laws, economy, a Discord CTA. Points at Eco via Sirens by default but takes any hostname. Also doubles as a small tech demo — a hand-rolled MCP Apps iframe in ~300 lines of HTML, no bundler or React, useful as a Python/Starlette reference for anyone building MCP Apps off the default TypeScript [ext-apps](https://github.com/modelcontextprotocol/ext-apps) stack.
- [eco-spec-tracker](https://github.com/coilysiren/eco-spec-tracker) — a FastAPI + Jinja2 + HTMX web app that lists every player's jobs (professions/specialties) with `active / total` counts, paired with a C# Eco server mod that exposes the underlying `/api/v1/skills` endpoint. Deployed at [eco-jobs-tracker.coilysiren.me](https://eco-jobs-tracker.coilysiren.me). The "two sides, one repo" shape (Python web app + C# mod, with a standalone C# shell harness so the Python side can iterate against a real HTTP server without booting Eco) is the pattern I expect to reuse for future per-server dashboards.

## Live jobs tracker

[eco-spec-tracker](https://github.com/coilysiren/eco-spec-tracker) (above) runs against the live Eco via Sirens server and shows every player's professions and specialties with `active / total` counts, pulled from a companion C# mod that exposes `/api/v1/skills` on the game server. Embedded below; open it directly at [eco-jobs-tracker.coilysiren.me](https://eco-jobs-tracker.coilysiren.me/) for a full-page view.

<div id="eco-tracker-embed">
  <iframe
    src="https://eco-jobs-tracker.coilysiren.me/"
    title="Eco Jobs Tracker"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
    referrerpolicy="no-referrer-when-downgrade"
    style="width: 100%; height: 720px; border: 0;"
  ></iframe>
  <p id="eco-tracker-offline" style="display: none; font-size: 0.9em; color: #a44; font-style: italic; margin-top: 0.5em;">
    The jobs tracker looks offline right now — Eco via Sirens may be between cycles. Try <a href="https://eco-jobs-tracker.coilysiren.me/">eco-jobs-tracker.coilysiren.me</a> directly.
  </p>
</div>

## If you want to mod Eco yourself

- Official modkit: [StrangeLoopGames/EcoModKit](https://github.com/StrangeLoopGames/EcoModKit).
- Auto-generated API docs (tracks latest Eco): [docs.play.eco](https://docs.play.eco/).
- Wiki: [wiki.play.eco/en/Modding](https://wiki.play.eco/en/Modding).
- SLG's own writeup: [How mods work in Eco](https://strangeloopgames.com/how-mods-work-in-eco/).
- Other community mods, browsable and installable: [mod.io/g/eco](https://mod.io/g/eco).
