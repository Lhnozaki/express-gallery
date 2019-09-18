const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");
const passport = require("passport");

router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureFlash: "Invalid Username or Password combination",
    failureRedirect: "login"
  })
);

module.exports = router;
