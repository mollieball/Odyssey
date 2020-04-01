require("dotenv").config();
const connection = require("../../helpers/db");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());

router.post("/signup", function(req, res, next) {
  console.log(req.body);
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
    saltRounds: 10
  };
  bcrypt.hash(user.password, user.saltRounds, function(err, hash) {
    connection.query(
      "INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)",
      [user.email, hash, user.name, user.lastname],
      function(error, results, fields) {
        if (error) {
          res.status(500).json({ flash: error.message });
        } else {
          res.status(200).json({ flash: "User has been signed up!" });
          res.end();
        }
      }
    );
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    function(email, password, done) {
      console.log(email);
      console.log(password);
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async function(err, results) {
          if (err) {
            return done(err);
          }
          if (!results[0]) {
            console.log("Email Incorrect!");
            return done(null, false, { message: "Incorrect Email" });
          }
          const validPassword = await bcrypt.compare(
            password,
            results[0].password
          );
          if (!validPassword) {
            console.log("Password Incorrect!");
            return done(null, false, { message: "Incorrect Password" });
          }
          return done(null, results[0]);
        }
      );
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    },
    function(jwtPayLoad, done) {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [jwtPayLoad.email],
        function(err, results) {
          if (err) {
            return done(err);
          }
          console.log("jwt");
          return done(null, results[0]);
        }
      );
    }
  )
);

router.post("/signin", (req, res, next) => {
  console.log("testing");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("error");
      return res.status(500).send(err);
    }
    if (!user) return res.status(400).json({ message: info.message });
    if (user.hasOwnProperty("email")) {
      const token = jwt.sign(
        JSON.stringify(user),
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.send({ user, token });
    }
    return res.send(user);
  })(req, res);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.send(req.user);
  }
);

module.exports = router;
