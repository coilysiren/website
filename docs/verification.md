# Verification

What to run before trusting a build.

Run the repository-owned command surface:

```text
ward exec build
ward exec test
ward exec test-e2e-ci
ward exec pre-commit-all
```

The production Cypress suite verifies canonical content, metadata, direct
legacy pages, retired-route 404s, the designed 404 page, local-only assets, and
the absence of browser scripts or social-image metadata.
