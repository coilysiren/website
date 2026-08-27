# Server-side argument pins

`--pin <tool>.<arg>=<value>` on `serve-upstream` fixes one argument of one
proxied tool, applied by the wrapper rather than supplied by the caller.

`upstream.tools` allowlists tool **names**, which is the whole authority only
while the verb carries the scope. It fails whenever scope rides in an argument:
allowlisting one Bluesky read tool grants every account, because the account is
a parameter.

- **Non-overridable** - a caller naming the pinned argument with a different
  value is refused, not silently corrected. Quiet rewriting would let a model
  believe it read one scope while reading another, and a refusal is the outcome
  a prompt injection cannot widen. Supplying the pinned value passes.
- **Validated at startup** - a pin naming a tool outside the allowlist is a
  startup error. An operator believing a surface is scoped while nothing
  applies it is the failure worth refusing to boot over.
- **Exact values only** - conjunctive pinning of free-form filter expressions
  is deliberately not implemented. AND-ing expressions needs the upstream's
  query language, and a wrong conjunction silently widens rather than failing
  loudly. Exact-value pinning either matches or refuses.

## Reading a pin out of a URL

`from="query:<parameter>"` reads one query parameter out of a URL the resolved
value holds, for a credential that arrives embedded in a URL: a private RSS or
Atom feed, a signed link, a webhook endpoint. Without it the only way to pin
one is to store a second, pre-split copy of the same credential, which is two
things to rotate and one of them going stale silently.

The extraction only ever narrows. It takes a component of an already-resolved
server-side value, reaches no new source, and the pinned name stays out of the
tool schema. A value that is not a URL, or that carries no such parameter,
fails the call, and the error names the parameter rather than echoing the
value.

See also: [upstream.md](upstream.md),
[guardfile-controls.md](guardfile-controls.md).
