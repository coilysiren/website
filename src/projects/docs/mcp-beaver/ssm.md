# `mcp-beaver serve-ssm <spec.mcp.kdl> --http :addr`

The AWS SDK-backed exact-parameter reader. Its KDL policy names one parameter
and grants exactly `get_parameter(name)` plus `get_forgejo_read_token()`.

The general tool rejects every other name before AWS receives a request, while
IAM independently restricts the workload principal to the same parameter ARN.
Two independent bounds rather than one, so a policy mistake on either side
still leaves the other holding.

The built-in readers advertise read-only, non-destructive, idempotent,
open-world behavior and a specific structured parameter output schema.

`serve-ssm` policies use a separate grammar from the `wrap` inline one, so they
are not lintable through [`lint`](lint.md).

See also: [serve.md](serve.md), [upstream.md](upstream.md).
