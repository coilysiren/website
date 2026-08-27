# Per-repo task manifest. Run `just` (or `just --list`) to see every verb.
#
# Recipes take trailing arguments directly: `just <verb> a b`, where the
# retired form was `ward exec <verb> -- a b`.
#
# One line of comment per recipe on purpose: just reads only the LAST comment
# line above a recipe, so a wrapped description silently truncates to its tail.
#
# `ward exec` is retired. `.ward/ward.yaml` survives carrying catalog metadata
# only, because the catalog hooks upstream in agentic-os pin that exact path.

set positional-arguments

# Default target: list every available recipe.
default:
    @just --list --unsorted

# Install dependencies from pnpm-lock.yaml (frozen).
install *ARGS:
    @pnpm install --frozen-lockfile "$@"

# Report dependencies with newer releases available.
deps-outdated *ARGS:
    @pnpm outdated "$@"

# Validate peer dependency compatibility across the installed graph.
deps-peers *ARGS:
    @pnpm peers check "$@"

# Update dependencies to their latest releases and refresh pnpm-lock.yaml.
deps-update *ARGS:
    @pnpm update --latest "$@"

# Refresh pnpm-lock.yaml after an intentional package.json change.
deps-sync *ARGS:
    @pnpm install --no-frozen-lockfile "$@"

# Clean, build, and serve Eleventy with live reload on port 8000.
dev *ARGS:
    @pnpm run dev "$@"

# Clean and generate the production Eleventy site in dist/.
build *ARGS:
    @pnpm run build "$@"

# Build the static staging image locally.
image-build *ARGS:
    @docker build --tag coilysiren-website:local . "$@"

# Validate the staging image nginx configuration.
image-smoke *ARGS:
    @docker run --rm coilysiren-website:local nginx -t "$@"

# Validate the trusted Forgejo OCI publisher shell contract.
image-publish-check *ARGS:
    @bash -n scripts/publish-image.sh "$@"

# Validate the trusted Forgejo CI and publishing shell contracts.
ci-script-check *ARGS:
    @bash -n scripts/ci/run-in-container.sh scripts/ci/mirror-to-github.sh scripts/publish-image.sh "$@"

# Build and serve the Eleventy site on port 8000.
serve *ARGS:
    @pnpm run serve "$@"

# Build static/resume.pdf from the canonical resume in an isolated Python environment.
build-resume *ARGS:
    @uv run --with pillow --with reportlab scripts/build-resume.py "$@"

# Derive a project page's plate texture, social card, and mark from its banner.
derive-project-assets *ARGS:
    @bash scripts/derive-project-assets.sh "$@"

# Capture the My Life presentation at a widescreen viewport.
playwright-my-life *ARGS:
    @npx --yes playwright@1.57.0 screenshot --browser chromium --channel=chrome --viewport-size=1920,1080 --full-page http://127.0.0.1:8000/my-life/ /private/tmp/my-life-wide.png "$@"

# Format supported repository files with Prettier.
format *ARGS:
    @pnpm run format "$@"

# Check supported repository files with Prettier.
format-check *ARGS:
    @pnpm run format:check "$@"

# Lint JavaScript and TypeScript with zero warnings.
lint *ARGS:
    @pnpm run lint "$@"

# Run every repository pre-commit hook.
pre-commit-all *ARGS:
    @pre-commit run --all-files "$@"

# Type-check application, build, and Cypress code.
typecheck *ARGS:
    @pnpm run typecheck "$@"

# Run formatting, lint, type, and unit checks.
test *ARGS:
    @pnpm run test "$@"

# Format check, lint, type-check, build, and unit tests.
test-quick *ARGS:
    @pnpm run test:quick "$@"

# vitest run. Asserts dist/, so build first.
test-unit *ARGS:
    @pnpm run test:unit "$@"

# Boot serve + open Cypress interactively.
test-e2e-local *ARGS:
    @pnpm run test:e2e:local "$@"

# Boot serve + run Cypress headless. Mirrors CI.
test-e2e-ci *ARGS:
    @pnpm run test:e2e:ci "$@"
