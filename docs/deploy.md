# Deploy

How a merged commit reaches production.

- **Netlify** picks up `main`. Build status badge in the README. Site at <https://coilysiren.me>.
- **Staging image contract** builds the locked Eleventy site, serves `dist/`
  from unprivileged nginx on port 8080, and publishes the exact source commit
  to Forgejo OCI. Nginx owns the permanent redirects and designed 404 response
  on staging. The deploy repository pulls and rolls that image to
  <https://website.coilysiren.me>. See [staging.md](staging.md).
- **Site-deploy verification is out of scope** here. The workflows cover tests,
  image publication, mirroring, and trufflehog. Netlify and the deploy
  repository roll their respective hosts on their own cadence (see
  [AGENTS.md](../AGENTS.md)).
