const express = require("express");
(path = require("path")),
  (cookieParser = require("cookie-parser")),
  (bodyParser = require("body-parser")),
  (cors = require("cors"));

const users = require("./routes/users");
const categories = require("./routes/categories");

const app = express();

// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", users);
app.use("/api/categories", categories);

app.set("port", process.env.PORT || 3050);
app.listen(app.get("port"));

console.log("Listening on port: " + app.get("port"));

module.exports = app;
