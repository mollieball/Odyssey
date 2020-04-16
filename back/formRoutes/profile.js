const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newUser = {
      id: req.user.id,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
    };
    res.status(200).send(newUser);
  }
);

module.exports = router;
