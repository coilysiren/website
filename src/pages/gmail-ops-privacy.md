---
title: "gmail-ops — Privacy & Contact"
---

> Privacy notice and contact info for the `gmail-ops` Google Workspace OAuth application (GCP project `gmail-ops-494306`). Linked from the Google OAuth consent screen.

## What this app is

`gmail-ops` is a personal-use OAuth client that authenticates the [`gws` CLI](https://github.com/googleworkspace/cli) against my own Google Workspace account. It exists so I can read, send, label, and watch my own Gmail and Calendar from the command line and from local automation.

## Who can use it

Exactly one person: me, Kai Siren (`coilysiren@gmail.com`). There are no other authorized users. If you reached this page from a Google OAuth consent screen asking you to grant access to an app called `gmail-ops`, you are not the intended audience and should cancel the flow.

## What data the app touches

Only data belonging to the single authorized account (`coilysiren@gmail.com`). The app uses Google Workspace API scopes for Gmail and Google Calendar to read, modify, and send on that account's behalf.

## What happens to that data

- Nothing is shared, sold, transferred, or disclosed to any third party.
- Nothing is stored on any server. The app runs locally on my own devices.
- Local caches (OAuth tokens, recent message metadata) live in `~/.config/gws/` and `~/.cache/` on those devices and are not transmitted anywhere.
- No analytics, no telemetry, no logging to external services.

## Retention and deletion

Local caches are deleted on demand via `gws auth logout` or by removing the relevant directories. Since no data leaves my devices, there is no remote store to request deletion from.

## Contact

Questions or concerns: `coilysiren@gmail.com`.
