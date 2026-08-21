# Verification

What to run before trusting a build.

Run the repository-owned command surface:

```text
just build
just test
just test-e2e-ci
just pre-commit-all
```

The production Cypress suite verifies canonical content, metadata, direct
legacy pages, retired-route 404s, the designed 404 page, local CSS and font
resources on the critical rendering path, and text-only social-image metadata.
