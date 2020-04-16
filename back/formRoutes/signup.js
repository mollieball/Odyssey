const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("../database/configs");
const User = db.user;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
  console.log(req.body);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  bcrypt
    .hash(user.password, 10)
    .then((hashedPassword) => {
      User.create({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: hashedPassword,
      })
        .then((newUser) =>
          res.status(200).send({ message: "You've successfully signed up!" })
        )
        .catch((userErr) => console.error({ flash: `User error: ${userErr}` }));
    })
    .catch((hashErr) =>
      console.error({ flash: `Hashing gave errors: ${hashErr}` })
    );
});

module.exports = router;
