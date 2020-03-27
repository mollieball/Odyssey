const connection = require("../../helpers/db");
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
      res.status(500).json({ flash: error.message });
    } else {
      res.status(200).json({ flash: "User has been signed up!" });
      res.end();
    }
  });
});

module.exports = router;
