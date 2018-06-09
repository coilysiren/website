import bodyParser = require("body-parser");
import { config as configDotenv } from "dotenv";
import express = require("express");
import fetch = require("make-fetch-happen");
import * as nodeFetch from "node-fetch";
import { join } from "path";

const app: express.Express = express();
const PORT: number | string = process.env.PORT || 3000;

configDotenv();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function githubApiRequest(queryBody: string): Promise<JSON> {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: `query { ${queryBody} }` }), // very secure, do not hack
    headers: { Authorization: `bearer ${process.env.GITHUB_API_TOKEN}` }
  }).then((res: nodeFetch.Response) => res.json());
}

app.post("/api/github", (req: express.Request, res: express.Response) => {
  githubApiRequest(req.body.queryBody).then((data: JSON) => res.json(data));
});

app.all("/ping", (req: express.Request, res: express.Response) => {
  res.json("pong");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
