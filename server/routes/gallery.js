const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");

router.get("/", (req, res) => {
  return req.db.Gallery.fetchAll().then(results => {
    let pics = results.models.map(e => e.attributes);
    res.status(200).render("gallery", { picture: pics });
  });
});

module.exports = router;
