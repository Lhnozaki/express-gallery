const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");
const isAuthenticated = require("../database/isAuthenticated");

router.put("/:id", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetchAll()
    .then(results => {
      return new Gallery({ id: req.params.id })
        .save(
          {
            description: req.body.description,
            url: req.body.url,
            user_id: req.user.id
          },
          { patch: false }
        )
        .then(results => {
          res.status(200).redirect("/gallery");
        });
    });
});

router.post("/", isAuthenticated, (req, res, next) => {
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

router.get("/:id/edit", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetchAll()
    .then(results => {
      let picId = results.models.map(e => e.attributes.id);
      res.status(200).render("edit", { id: [...picId] });
    });
});

router.get("/:id", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetchAll({ withrelated: ["user_id"] })
    .then(results => {
      let pics = results.models.map(e => e.attributes);

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
            let picId = results.models.map(e => e.attributes.id);
            res.status(200).render("picture", {
              picture: pics,
              username: [...username],
              id: [...picId]
            });
          });
      }
    });
});

router.get("/", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.forge()
    .orderBy("id", "ASC")
    .fetchAll()
    .then(results => {
      let pics = results.models.map(e => e.attributes);
      res.status(200).render("gallery", { picture: pics });
    });
});

module.exports = router;
