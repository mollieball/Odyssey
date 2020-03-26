const connection = require("../../helpers/db.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/signup", function(req, res, next) {
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname
  };

  connection.query("INSERT INTO users SET ?", user, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.status(500).end();
    } else {
      res.status(200).json(user);
      res.end();
    }
  });
});

module.exports = router;
