const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");
const isAuthenticated = require("../database/isAuthenticated");

router.post("/", isAuthenticated, (req, res, next) => {
  console.log(req.body);
  return new Gallery({
    description: req.body.description,
    url: req.body.url,
    user_id: req.user.id
  })
    .save()
    .then(results => {
      res.status(200).redirect("gallery");
    })
    .catch(err => {
      console.log(err);
      res.send("Error");
    });
});

router.get("/new", isAuthenticated, (re, res, next) => {
  res.status(200).render("new");
});

router.get("/:id", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetchAll({ withrelated: ["user_id"] })
    .then(results => {
      let pics = results.models.map(e => e.attributes);

      console.log(req.user.id);
      console.log(pics[0].user_id);

      if (req.user.id !== pics[0].user_id) {
        req.db.User.where({ id: pics[0].user_id })
          .fetchAll()
          .then(user => {
            let username = user.models.map(e => e.attributes.username);

            res
              .status(200)
              .render("pic_no_btn", { picture: pics, username: [...username] });
          });
      } else {
        req.db.User.where({ id: pics[0].user_id })
          .fetchAll()
          .then(user => {
            let username = user.models.map(e => e.attributes.username);

            res
              .status(200)
              .render("picture", { picture: pics, username: [...username] });
          });
      }
    });
});

router.get("/", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.fetchAll().then(results => {
    let pics = results.models.map(e => e.attributes);
    res.status(200).render("gallery", { picture: pics });
  });
});

module.exports = router;
