#!/usr/bin/env python3
"""Vendor each mounted project's docs/ from its own repository.

Replaces the hand `cp` that produced src/projects/*-docs/. Reads the mount
list from src/data/docs-mounts.json, clones each source repo shallow, copies
the files its exclusion list permits, and writes the snapshot stamp every docs
page prints. Contract and reasoning: docs/project-docs-mount.md.

Verbatim means bytes, so the only transformation is the filename: a source
`CONTRIBUTING.md` mounts as `contributing.md`, because the route is the slug.

Usage:
    python3 scripts/sync-project-docs.py            # sync every mount
    python3 scripts/sync-project-docs.py --check    # report drift, write nothing
    python3 scripts/sync-project-docs.py --project umbra
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
MOUNTS = REPO_ROOT / "src/data/docs-mounts.json"
STAMP = REPO_ROOT / "src/data/docs-mount-source.json"
STAMP_NOTE = "Written by scripts/sync-project-docs.py. Every docs page prints it."


def run(*argv: str, cwd: Path | None = None) -> str:
    proc = subprocess.run(argv, cwd=cwd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise SystemExit(f"{' '.join(argv)}: {proc.stderr.strip()}")
    return proc.stdout.strip()


def clone(mount: dict, into: Path) -> tuple[str, str]:
    """Shallow-clone one source repo. Returns (short commit, commit date)."""
    run(
        "git", "clone", "--quiet", "--depth", "1",
        "--branch", mount.get("branch", "main"),
        mount["repo"] + ".git", str(into),
    )
    return (
        run("git", "-C", str(into), "rev-parse", "--short", "HEAD"),
        run("git", "-C", str(into), "log", "-1", "--format=%cs"),
    )


def wanted(source_docs: Path, exclude: list[str]) -> dict[str, Path]:
    """Map mounted filename to source path, minus the exclusion list."""
    skip = {name.lower() for name in exclude}
    found = {}
    for path in sorted(source_docs.glob("*.md")):
        if path.name.lower() in skip:
            continue
        found[path.name.lower()] = path
    return found


def sync_one(mount: dict, check: bool) -> tuple[dict, list[str]]:
    """Vendor one mount. Returns (stamp entry, list of changed paths)."""
    target = REPO_ROOT / mount["target"]
    changed: list[str] = []
    with tempfile.TemporaryDirectory(prefix="docs-mount-") as tmp:
        source = Path(tmp) / mount["project"]
        commit, date = clone(mount, source)
        docs = source / mount.get("docsDir", "docs")
        if not docs.is_dir():
            raise SystemExit(f"{mount['project']}: no {mount.get('docsDir', 'docs')}/ in {mount['repo']}")
        files = wanted(docs, mount.get("exclude", []))
        if not files:
            raise SystemExit(f"{mount['project']}: the exclusion list left nothing to mount")

        target.mkdir(parents=True, exist_ok=True)
        # A page dropped upstream has to leave here too, or the mount keeps
        # serving a route the source repo no longer has.
        for existing in sorted(target.glob("*.md")):
            if existing.name not in files:
                changed.append(f"- {mount['target']}/{existing.name}")
                if not check:
                    existing.unlink()
        for name, path in files.items():
            destination = target / name
            body = path.read_bytes()
            if destination.exists() and destination.read_bytes() == body:
                continue
            changed.append(f"{'+' if not destination.exists() else '~'} {mount['target']}/{name}")
            if not check:
                destination.write_bytes(body)

    entry = {
        "repo": mount["repo"],
        "docs": f"{mount['repo']}/src/branch/{mount.get('branch', 'main')}/{mount.get('docsDir', 'docs')}",
        "commit": commit,
        "date": date,
        "syncedAt": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
    }
    return entry, changed


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=(__doc__ or "").splitlines()[0])
    ap.add_argument("--check", action="store_true", help="report drift, write nothing")
    ap.add_argument("--project", help="sync one mount by project name")
    args = ap.parse_args(argv)

    config = json.loads(MOUNTS.read_text(encoding="utf-8"))
    mounts = config["mounts"]
    if args.project:
        mounts = [m for m in mounts if m["project"] == args.project]
        if not mounts:
            raise SystemExit(f"no mount named {args.project!r} in {MOUNTS.name}")

    stamp: dict[str, object] = {"$comment": STAMP_NOTE}
    if STAMP.exists():
        stamp = json.loads(STAMP.read_text(encoding="utf-8"))
        stamp["$comment"] = STAMP_NOTE

    drift: list[str] = []
    for mount in mounts:
        entry, changed = sync_one(mount, args.check)
        previous = stamp.get(mount["project"], {})
        assert isinstance(previous, dict)
        stamp[mount["project"]] = entry
        drift.extend(changed)
        moved = previous.get("commit") != entry["commit"]
        print(f"{mount['project']}: {entry['commit']} ({entry['date']}), {len(changed)} file(s) changed"
              + ("" if moved else ", commit unchanged"))
        for line in changed:
            print(f"  {line}")

    if not args.check:
        STAMP.write_text(json.dumps(stamp, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    if args.check and drift:
        print("\nthe vendored copy is behind its source", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
