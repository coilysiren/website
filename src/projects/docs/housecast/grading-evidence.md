# Grading evidence

The public and private halves of one run, and why committed evidence is left alone
once it ages out of the loader.

## Two directions, one run

`export` projects a run one way onto a display surface, and `serve` is the other
direction. The split is a safety property, not a layering preference.

* A **built artifact** embeds the public export. It has no critique, no evidence,
  and no way to write a label, so a file opened on a projector cannot leak one.
  That is enforced by absence rather than by a flag.
* **`serve`** holds the private payload in memory for as long as the process
  runs, and writes decisions back to `annotations.yaml`.

`serve` binds loopback and refuses anything else unless `--expose` says
otherwise, because the payload it hands the page carries the words the grader
wrote for herself. It refuses rather than warns, matching how the exporter treats
a public target. `serve` deliberately does **not** run the exporter's secret scan. That scan
guards a public projection. Refusing to show a grader her own board because a
response quotes an email address would be the wrong instrument pointed at the
wrong target.

## Committed evidence ages out of the loader

`evaluations/pilot/ops-board-2026-08-12` and its regraded sibling predate the
current `Challenge`. They carry `role`, `trait`, and `boundary` where the schema
now wants `entity` and `attribute`, so neither `export` nor `serve` can load
them, and both fail the same way.

**That is correct and they are left alone.** A committed dataset records what was
true when the run executed, and rewriting it to match today is the exact failure
a committed dataset exists to prevent. Point a new tool at
`evaluations/reflow-v3/board-2026-08-26`, 91 cases on the current vocabulary.

## See also

* [`grading.md`](grading.md) - what the grading half is.
