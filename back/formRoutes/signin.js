require("dotenv").config();

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    err && res.status(500).send(err);
    !user && res.status(400).send(info);
    console.log(user);

    const token = jwt.sign(JSON.stringify(user), ACCESS_TOKEN_SECRET);
    const newUser = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    return res.json({
      success: true,
      user: newUser,
      token: token,
      message: "You were authenticated",
    });
  })(req, res, next);
});

module.exports = router;
