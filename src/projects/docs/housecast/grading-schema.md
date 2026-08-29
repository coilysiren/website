# Grading schema ids

Schema ids are a wire format, not a package name.

## The ids that keep their old name

`aos-eval.board.v1`, `aos-eval.attributes.v1`, and `aos-eval.export.v1` keep
their names after the port from `agentic-os/aos-eval`. They identify a file
format that committed evidence already carries, not the package that reads it.

Renaming them would make the loader reject boards it wrote itself, so they move
only in a format migration with a version bump behind it.

## A new format takes this package's name

`housecast.grading.v1`, which `serve` hands the page, is the first.

The rule above is a reason not to rename an id that committed evidence carries.
It is not a reason to mint more `aos-eval.*` ids for a package called housecast.

## See also

* [`grading.md`](grading.md) - what the grading half is.
* [`grading-evidence.md`](grading-evidence.md) - what the committed evidence is.
