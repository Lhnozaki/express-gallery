const express = require("express");
const router = express.Router();
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
