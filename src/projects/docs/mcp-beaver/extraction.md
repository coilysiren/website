# Extraction

`extract "<tool>" as="<kind>"` projects a response an agent cannot read into one
it can. Every kind requires the grant to declare `raw-response`, checked at
build, and a bound belonging to another kind is a build error rather than a
silently ignored property. Parsing is in-process, bounded per kind below.

## `as="pdf-text" max-pages="20"`

Turns a PDF into text. Much authoritative reference material - statistics,
standards, filings, equipment documentation - is published only as PDF, so a
grant reaching one returned bytes no model could use. Text only: table
extraction and OCR are separate decisions.

Bounds: a 32MB size gate before the parser, a page bound defaulting to 20 and
ceilinged at 200, and a parse off the request goroutine so a wedged document
returns a stated timeout. Malformed documents are clean tool errors, a parser
panic is recovered into one, and coverage gains `pages: {shown, total}`.

## `as="feed-entries" max-items="25"`

Turns RSS or Atom into entries carrying `title`, `link`, `author`, `id`,
`published`, `updated`, and `categories`, each omitted when the source did not
supply it. Both dialects land in that one shape, so a guardfile author does not
have to know which their upstream picked. The entry body is deliberately
dropped: Atom `content` and RSS `description` carry the full item as HTML, and
they are most of the bytes this exists to remove.

Bounds: an 8MB size gate, an item bound defaulting to 25 and ceilinged at 250,
and coverage gaining `entries: {shown, total}`. A feed carries its whole item
set in one document, so that total is measured rather than guessed. A non-feed
is a clean tool error; an empty feed is not, and returns `0 of 0`.

stdlib `encoding/xml` rather than a feed library, because this runtime carries
one parser dependency total and #60 treated that footprint as deciding. Verified
live against reddit.com through `examples/reddit.mcp.kdl`: `get_subreddit_rss`
went from 53,381 bytes of Atom with `over_budget` true to 7,895 bytes of entries
with it false, at 25 of 25.

See also: [guardfile-controls.md](guardfile-controls.md), [serve.md](serve.md).
