import { config as configDotenv } from "dotenv";
import * as nodeFetch from "node-fetch";

import bodyParser = require("body-parser");
import express = require("express");
import fetch = require("make-fetch-happen");
import path = require("path");

if (process.env.NODE_ENV !== "production") {
  configDotenv();
}

const app: express.Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);

function githubApiRequest(queryBody: string): Promise<JSON> {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: `query { ${queryBody} }` }), // very secure, do not hack
    headers: { Authorization: `bearer ${process.env.GITHUB_API_TOKEN}` }
  })
    .then((res: nodeFetch.Response) => res.json());
}

app.post("/api/github", (req: express.Request, res: express.Response) => {
  githubApiRequest(req.body.queryBody)
    .then((data: JSON) => res.json(data));
});

app.use("/.storybook", express.static(path.join(__dirname, "/storybook-dist/")));
app.get("/.storybook", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "/storybook-dist/index.html"));
});

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
