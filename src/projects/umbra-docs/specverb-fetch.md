# fetch overlays

`fetch` is the non-Swagger companion to the spec-driven `can` surface. It mounts fixed HTTP leaves directly from the Guardfile, so a consumer can replace a cwd-relative shell bridge with a reviewable request shape.

```kdl
wrap ward ops forgejo {
    base-url "https://forgejo.example/api/v1"
    fetch "actions logs" {
        method "GET"
        path "/repos/{owner}/{repo}/actions/runs/{run}/logs"
        output "raw"
        env FORGEJO_TOKEN { value ssm "/forgejo/token" }
        header "Authorization" "token ${FORGEJO_TOKEN}"
        header "Accept" "text/plain"
        when first input matches coily*
    }
}
```

## Rules

- `method` and `path` are required, and `path` placeholders become positional arguments in `{placeholder}` order.
- `output` is required and must currently be `raw`.
- `env <name> { value ... }` resolves a template variable through the shared value-provider registry.
- `header "<name>" "<template>"` may interpolate `${NAME}` placeholders from the declared fetch envs.
- `when first input matches ...` is sugar for `when arg0 matches ...`.
- Unknown nodes and malformed templates fail closed.

## Runtime

Dry-run prints the resolved request and redacts env-backed header values. A live fetch prints the raw response body to stdout, and a non-2xx fails closed with the HTTP status and trimmed body in the error. Redirect handling follows the shared opcore client floor: `GET` and `HEAD` may follow, while mutating methods refuse silent redirects.

See [specverb.md](specverb.md) for the wider engine and [specverb-request.md](specverb-request.md) for request assembly.
