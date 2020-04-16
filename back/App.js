require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./database/configs");
require("./auth");

const app = express();

const signupRouter = require("./formRoutes/signup");
const signinRouter = require("./formRoutes/signin");
const profileRouter = require("./formRoutes/profile");

db.connector
  .sync()
  .then(() => console.log("Drop and Create DB"))
  .catch((error) => console.error(`sync failed: ${error}`));

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/profile", profileRouter);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
