require("dotenv").config();

const express = require("express");
const path = require("path");
const fetch = require("make-fetch-happen");

const app = express();
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () =>
  console.log("Listening on port %d", server.address().port)
);

function commitDataRequest() {
  console.log("hit test api endpoint");
  commitCount = 10;
  postBody = `query {
    user(login: "lynncyrin") {
      repositories(last: 1, orderBy: {field: UPDATED_AT, direction: ASC}) {
        nodes {
          nameWithOwner
          url
          refs(refPrefix: "refs/heads/", last: 1) {
            nodes {
              target {
                ... on Commit {
                  history(first: ${commitCount}) {
                    nodes {
                      message
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: postBody }),
    headers: { Authorization: `bearer ${process.env.GITHUB_API_TOKEN}` }
  })
    .then(res => res.json())
    .then(body => body);
}

app.get("/api", (req, res) => {
  commitDataRequest().then(body => {
    res.json(body);
  });
});

app.use("/.storybook", express.static(path.join(__dirname, "/storybook-dist/")));
app.get("/.storybook", (req, res) => {
  res.sendFile(path.join(__dirname, "/storybook-dist/index.html"));
});

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
