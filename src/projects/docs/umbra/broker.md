# broker - root credential broker, and provenance

`pkg/broker` is the policy core for a **root credential broker**: a versioned request/response protocol over a unix socket through which an unprivileged client asks a privileged server to act on issues and dispatch work, without ever holding the credential.

## Shape

Self-contained by design, carrying **no git, docker, or ward-kdl knowledge**, so ward imports it without a dependency cycle.

The **protocol** carries `ProtocolVersion`, the five write-tier `Op`s (file / edit / comment / label issue, dispatch), and the `Request` / `Response` / `Target` / `Result` types as newline-delimited JSON: one request in, one response out, then close. The **server** serves one request per connection on an already-permissioned socket, holding no token: it authorizes, then delegates to the consumer's injected **executor**, which holds the credential. The **client** is the unprivileged dial-once-per-call side. A nil executor or authorizer is a construction error, and an unknown version or op is refused rather than guessed.

## Fail-closed policy

`Policy` crosses an owner allowlist with an op allowlist plus each op's structural invariants. A caller declares **both** halves, because a policy someone forgot to fill in must not be the one granting the write tier. `Owners` empty denies unless `AnyOwner` is set, the named opt-in for a consumer with no owner boundary of its own; an empty owner is refused even under it. `Ops` empty denies everything; `WriteOps` is the full tier. `Validate` reports an under-declared policy, so a consumer fails at startup rather than at its first refused request.

## Provenance

That authorization is *structural*: which owner, which op. Whether the actor supplying the content is trustworthy is the consumer's decision, and `pkg/provenance` carries the origin claim it reads: `Actor`, `Source`, `SourceID`, `ContentHash`, `ObservedAt`, `Verification`. Every field is opaque, so nothing names an organization, forge, or account. `ObservedAt` is when content was *read*, not authored: only the reader's clock is the reader's to trust.

Four defences are easy to conflate and none substitutes for another: **command-construction safety** (`pkg/policy`; argv cannot smuggle metacharacters into `execve`, and says nothing about who asked), **execution isolation** (umbra performs **none** - it is audit-and-gate, not a sandbox), **provenance**, and **application trust policy**.

Ignorance never reads as trust. The zero `Verification` is `Unknown`, distinct from `Unverified`: never checking and checking without result are different facts. `Complete` names every missing field at once, `Trusted` needs completeness **and** `Verified`, and `CoversContent` re-hashes the bytes in hand.

`pkg/credseed` is the companion: it seeds a child container's credentials through a private (`0600`) env-file, centralizing the env-var names the writer and reader both depend on so the two cannot drift.
