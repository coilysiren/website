# coilysiren.me

my internet website

## Git workflow

Commit directly to `main` without asking for confirmation, including `git add`. Do not open pull requests unless explicitly asked.

Commit whenever a unit of work feels sufficiently complete — after fixing a bug, adding a feature, passing tests, or reaching any other natural stopping point. Don't wait for the user to ask.

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/b6cfcd3d-e5e6-4893-86da-2a218fa8587f/deploy-status)](https://app.netlify.com/sites/coilysiren-dot-me/deploys)

## Local Developement

Create a `.env.development` file with these contents:

```bash
GATSBY_API_URL=http://localhost:4000 # or whatever port you are running the API on
```
