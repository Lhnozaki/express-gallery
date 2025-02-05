const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../database/isAuthenticated");

router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/gallery",
    failureFlash: "Invalid Username or Password combination",
    failureRedirect: "/login"
  })
);

module.exports = router;
