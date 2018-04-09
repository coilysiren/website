const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () => {
  console.log("Listening on port %d", server.address().port);
});

app.use(
  "/.storybook",
  express.static(path.join(__dirname, "/storybook-dist/"))
);
app.get("/.storybook", (req, res) => {
  res.sendFile(path.join(__dirname, "/storybook-dist/index.html"));
});

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
