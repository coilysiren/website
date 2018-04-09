require("dotenv").config();

const express = require("express");
const path = require("path");
const fetch = require("make-fetch-happen");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(PORT, () =>
  console.log("Listening on port %d", server.address().port)
);

function commitDataRequest(queryBody) {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: queryBody }),
    headers: { Authorization: `bearer ${process.env.GITHUB_API_TOKEN}` }
  })
    .then((res) => res.json())
}

app.get("/api/github", (req, res) => {
  console.log('request successful!');
  res.json({data: 'request successful!'});
});

app.post("/api/github", (req, res) => {
  commitDataRequest(req.body.queryBody).then((data) => res.json(data));
});

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
