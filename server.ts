import { enableProdMode } from "@angular/core";
// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
import assert = require("assert");
import bodyParser = require("body-parser");
import { config as configDotenv } from "dotenv";
import express = require("express");
import fetch = require("make-fetch-happen");
import * as nodeFetch from "node-fetch";
import { join } from "path";
import "reflect-metadata";
import "zone.js/dist/zone-node";

const app: express.Express = express();
const PORT: number | string = process.env.PORT || 3000;
const DIST_FOLDER: string = join(process.cwd(), "dist");

if (process.env.NODE_ENV !== "production") {
  configDotenv();
} else {
  enableProdMode();
  // * NOTE :: leave this as require() since this file is built Dynamically from webpack
  // tslint:disable:no-var-requires
  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
  }: any = require("./dist/server/main");

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  app.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
  );

  app.set("view engine", "html");
  app.set("views", join(DIST_FOLDER, "browser"));
}

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

app.use("/.storybook", express.static(join(__dirname, "/storybook-dist/")));
app.get("/.storybook", (req: express.Request, res: express.Response) => {
  res.sendFile(join(__dirname, "/storybook-dist/index.html"));
});

// Server static files from /browser
app.use(express.static(join(DIST_FOLDER, "browser")));
// app.get(
//   "*.*",
//   express.static(join(DIST_FOLDER, "browser"), {
//     maxAge: "1y"
//   })
// );
// All regular routes use the Universal engine
app.get("*", (req: express.Request, res: express.Response) => {
  res.render("index", { req });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
