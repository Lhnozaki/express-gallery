const express = require("express");
const router = express.Router();
const User = require("../database/models/Users");
const Gallery = require("../database/models/Gallery");
const knex = require("../database/knex");
const isAuthenticated = require("../database/isAuthenticated");

router.delete("/:id", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .destroy()
    .then(results => {
      res.status(200).redirect("/gallery");
    });
});

router.put("/:id", isAuthenticated, (req, res, next) => {
  if (req.body.description === "" || req.body.url === "") {
    res.redirect(`/gallery/${req.params.id}/edit`);
    return;
  }

  return req.db.Gallery.where({ id: req.params.id })
    .fetch()
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
  if (req.body.description === "" || req.body.url === "") {
    res.redirect("gallery/new");
    return;
  }

  return new Gallery({
    description: req.body.description,
    url: req.body.url,
    user_id: req.user.id
  })
    .save()
    .then(results => {
      res.status(200).redirect("gallery");
    });
});

router.get("/new", isAuthenticated, (re, res, next) => {
  res.status(200).render("new");
});

router.get("/:id/edit", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetch()
    .then(results => {
      let userID = results.toJSON().user_id;
      if (req.user.id !== userID) {
        res.redirect("/gallery");
        return;
      }
      let picId = results.toJSON().id;
      res.status(200).render("edit", { id: picId });
    });
});

router.get("/:id", isAuthenticated, (req, res, next) => {
  return req.db.Gallery.where({ id: req.params.id })
    .fetchAll({ withRelated: ["users"] })
    .then(results => {
      let picture = results.toJSON()[0];
      let user = picture.users;
      let url = picture.url;
      let description = picture.description;

      if (req.user.id !== user.id) {
        res.status(200).render("pic_no_btn", {
          url: url,
          description: description,
          username: user.username
        });
      } else {
        res.status(200).render("picture", {
          url: url,
          description: description,
          username: user.username,
          id: picture.id
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
