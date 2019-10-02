const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

router.get("/", (req, res) => {
  res.status(200).render("register");
});

router.post("/", (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log(err);
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }

      return new User({
        username: req.body.username,
        password: hash
      })
        .save()
        .then(user => {
          console.log(user);
          return res.status(200).redirect("login");
        })
        .catch(err => {
          console.log(err);
          return res.send("Error creating account");
        });
    });
  });
});

module.exports = router;
