const history = require("connect-history-api-fallback");
const express = require("express");
const path = require("path");

const app = express();

app.use(history());
app.use(express.static(path.join(__dirname + "/dist")));

app.listen(process.env.PORT || 80);