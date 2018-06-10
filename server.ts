import "reflect-metadata";
import "zone.js/dist/zone-node";

import { enableProdMode } from "@angular/core";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
import bodyParser = require("body-parser");
import { config as configDotenv } from "dotenv";
import express = require("express");
import fetch = require("make-fetch-happen");
import * as nodeFetch from "node-fetch";
import { join } from "path";

import {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} from "./dist/server/main.js";

const app: express.Express = express();
const PORT: number | string = process.env.PORT || 3000;
const DIST_FOLDER: string = join(process.cwd(), "dist");

configDotenv();
enableProdMode();

app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));

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

app.use(express.static(join(DIST_FOLDER, "browser")));
app.get("*", (req: express.Request, res: express.Response) => {
  res.render(join(DIST_FOLDER, "browser", "index.html"), { req });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
