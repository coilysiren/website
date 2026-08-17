# Staging image

The repository ships a static container image for the
<https://website.coilysiren.me> staging site. The canonical
<https://coilysiren.me> site remains on Netlify.

## Ownership

The split between this repo and deploy: [staging ownership](staging-ownership.md).

## Local verification

Ward exposes the container checks through the repository command boundary:

```text
just image-build
just image-smoke
just image-publish-check
```

The build has no API or remote browser dependency. Eleventy metadata keeps
`https://coilysiren.me` as the canonical site URL on both hosts. The image
contains only static HTML, CSS, images, fonts, and documents.
