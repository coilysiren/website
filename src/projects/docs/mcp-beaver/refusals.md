# An argument the tool does not declare

A tool call carrying an argument its tool does not declare is refused, never
dropped and never forwarded to an upstream that will ignore it.

## Why a refusal

`signoz_aggregate_logs` was called with a `searchText` its schema never declared
and returned the count of every log in the window, with `status: success`.

| call | result | rows scanned |
| --- | --- | --- |
| no filter | 8,759,997 | 6,525,190 |
| `searchText='zzzzz-nonexistent-string-qqqq'` | **8,760,201** | 6,525,483 |
| `filter="body CONTAINS 'zzzzz-nonexistent-string-qqqq'"` | 0 | 0 |

A string that cannot appear in any log returned the unfiltered total, and the
scan count is the tell: the dropped filter scanned everything. An error is
caught and a zero is caught. A large plausible number that is silently the
unfiltered total is not, and a blast-radius estimate was published from one
before a negative control caught it (mcp-beaver#94).


## Where it is enforced

Both paths could produce it. `splitArgs` skipped a name the schema did not carry,
with *"the tool surface is exactly the schema"* given as the reason: the claim
was right and the enforcement was a silent drop. The passthrough proxy forwarded
the argument map verbatim to an upstream that ignored it, and now reads the
declared names off the startup snapshot, the contract this runtime accepted.

An upstream setting `additionalProperties` to anything other than `false` keeps
the permissive contract it declares. An **absent** one is treated as closed,
inverting the JSON Schema default deliberately: that permissive default is what
let this through, and a guard is stricter than the thing it guards.

A pinned parameter is absent from the tool schema, so supplying one is refused
rather than silently overruled. Extra keys **nested inside** a declared property
stay the body mapping's business, which is what lets a webhook post its whole
payload at a tool that wants one field.
