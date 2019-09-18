const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");

router.get("/", (req, res) => {
  res.status(200).render("index");
});

module.exports = router;
