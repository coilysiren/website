// Every route the build emits, in one place so the accessibility and weight
// specs cannot disagree about what the site is. A unit assertion in
// src/build-output.test.ts compares this to dist/ and fails on drift, because
// the first accessibility pass listed eight of eighteen routes and missed a
// real defect on a promoted post.
//
// It is a module rather than derived at run time because `allowCypressEnv` is
// deliberately false here, and a spec cannot generate its tests from a promise.
// The /projects/umbra/docs/ mount is a hand-vendored draft of the docs section
// in coilysiren/inbox#438. Its pages are noindex and out of CANONICAL_ROUTES,
// but they are emitted, so accessibility and weight still cover them.
export const ROUTES = [
  "/",
  "/404.html",
  "/about/",
  "/coilysiren-personal-gmail-privacy/",
  "/cool-people/",
  "/hiring/",
  "/posts/3-cloud-standoff/",
  "/posts/azure-openai-terraform/",
  "/posts/code-janitor/",
  "/posts/deleting-the-mechanical-scorer/",
  "/posts/golang-pr-notes-1/",
  "/posts/golang-pr-notes-2/",
  "/posts/golang-pr-notes-3/",
  "/posts/heroku-django-sass/",
  "/posts/on-permissions-models-for-cloud-platform-providers/",
  "/posts/stochastic-design-iteration/",
  "/projects/agent-compose/",
  "/projects/mcp-beaver/",
  "/projects/umbra/",
  "/projects/umbra/docs/",
  "/projects/umbra/docs/architecture/",
  "/projects/umbra/docs/broker/",
  "/projects/umbra/docs/contributing/",
  "/projects/umbra/docs/execverb/",
  "/projects/umbra/docs/features/",
  "/projects/umbra/docs/getting-started/",
  "/projects/umbra/docs/opcore-body/",
  "/projects/umbra/docs/opcore-inline/",
  "/projects/umbra/docs/passthrough/",
  "/projects/umbra/docs/release-pipeline/",
  "/projects/umbra/docs/specgen-materialization/",
  "/projects/umbra/docs/specgen/",
  "/projects/umbra/docs/specverb-actions/",
  "/projects/umbra/docs/specverb-describe/",
  "/projects/umbra/docs/specverb-fetch/",
  "/projects/umbra/docs/specverb-policy/",
  "/projects/umbra/docs/specverb-request/",
  "/projects/umbra/docs/specverb-resolution/",
  "/projects/umbra/docs/specverb/",
  "/projects/umbra/docs/value-providers/",
  "/projects/umbra/docs/ward-helpers/",
  "/resume/",
  "/writing/",
]
