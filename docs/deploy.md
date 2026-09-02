# Deploy

How a merged commit reaches production.

- **Netlify** builds production from the GitHub `release` branch. The fleet
  mirror controller in infrastructure fast-forwards `release` to `main` once a
  day at 12:00 UTC, an hour after the docs sync, and never force-pushes or
  deletes, so production lags `main` by up to a day. Each production deploy
  costs Netlify credits and each merge used to be one (#149). The controller,
  its read-back check, and the early-publish verb `just forgejo-github-release`
  live in infrastructure, in
  [docs/forgejo-github-bridge.md](https://forgejo.coilysiren.me/coilyco-bridge/infrastructure/src/branch/main/docs/forgejo-github-bridge.md).
  Build status badge in the README. Site at <https://www.coilysiren.me>, with
  the bare apex 301ing to it.
- **Staging image contract** builds the locked Eleventy site, serves `dist/`
  from unprivileged nginx on port 8080, and publishes the exact source commit
  to Forgejo OCI. Nginx owns the permanent redirects and designed 404 response
  on staging. The deploy repository pulls and rolls that image to
  <https://website.coilysiren.me>. See [staging.md](staging.md).
- **Site-deploy verification is out of scope** here. The workflows cover tests,
  image publication, mirroring, and trufflehog. Netlify and the deploy
  repository roll their respective hosts on their own cadence (see
  [AGENTS.md](../AGENTS.md)).
