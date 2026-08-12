#!/usr/bin/env python3
"""Send a CI failure alert to Telegram.

Called from the `failure() && refs/heads/main` guard in the Forgejo workflows.
Every caller runs it under `continue-on-error: true`, so a Telegram outage
reports itself here without masking the build failure that triggered it.
"""

import os
import urllib.error
import urllib.parse
import urllib.request

FIELDS = (
    ("repo", "REPO"),
    ("workflow", "WORKFLOW"),
    ("job", "JOB"),
    ("ref", "REF"),
    ("sha", "SHA"),
    ("run", "RUN_URL"),
)


def main() -> int:
    bot_token = os.environ.get("BOT_TOKEN", "")
    chat_id = os.environ.get("CHAT_ID", "")
    if not bot_token or not chat_id:
        print("alert-telegram: TELEGRAM_* secrets not set; skipping.")
        return 0

    lines = ["CI failed on main"]
    lines += [f"{label}: {os.environ.get(name, '')}" for label, name in FIELDS]

    api_base = os.environ.get("API_BASE", "https://api.telegram.org").rstrip("/")
    payload = urllib.parse.urlencode(
        {
            "chat_id": chat_id,
            "text": "\n".join(lines),
            "disable_web_page_preview": "true",
        }
    ).encode("utf-8")

    request = urllib.request.Request(
        f"{api_base}/bot{bot_token}/sendMessage", data=payload, method="POST"
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            response.read()
    except urllib.error.URLError as exc:
        print(f"alert-telegram: delivery failed: {exc}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
