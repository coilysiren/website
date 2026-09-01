# Deploy

How a merged commit reaches production.

- **Netlify** builds production from the GitHub `release` branch, which the
  [daily release sync](ci-workflows.md#daily-release-syncyml---daily-release-sync)
  fast-forwards to `main` once a day at 12:00 UTC. Each production deploy
  costs Netlify credits and each merge to `main` used to be one, so production
  now lags `main` by up to a day, and a `workflow_dispatch` of that workflow
  publishes early. Netlify branch deploys are free, so `main` can keep a live
  preview URL ahead of publish once branch deploys cover it. Build status badge in the README. Site at
  <https://www.coilysiren.me>, with the bare apex 301ing to it.
- **Staging image contract** builds the locked Eleventy site, serves `dist/`
  from unprivileged nginx on port 8080, and publishes the exact source commit
  to Forgejo OCI. Nginx owns the permanent redirects and designed 404 response
  on staging. The deploy repository pulls and rolls that image to
  <https://website.coilysiren.me>. See [staging.md](staging.md).
- **Site-deploy verification is out of scope** here. The workflows cover tests,
  image publication, mirroring, and trufflehog. Netlify and the deploy
  repository roll their respective hosts on their own cadence (see
  [AGENTS.md](../AGENTS.md)).
