function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = isAuthenticated;
