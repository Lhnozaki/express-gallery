const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const knex = require("./database/knex");
const flash = require("connect-flash");
const saltRounds = 12;

// Routers
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");

// REDIS
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIX_URL });

// DB Models
const User = require("./database/models/Users");
const Gallery = require("./database/models/Gallery");

// PORT
const PORT = process.env.PORT || 8080;

require("dotenv").config();
require("./config/passport")(passport);

const app = express();

//Middleware
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(methodOverride("_method"));
app.use(decorator);

//Sessions
app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("login");
  }
}

// app.use(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "login"
//   })
// );

app.use("/login", loginRouter);

// Create user accounts
app.post("/register", (req, res) => {
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
          return res.redirect("login");
        })
        .catch(err => {
          console.log(err);
          return res.send("Error creating account");
        });
    });
  });
});

app.get("/secret", isAuthenticated, (req, res) => {
  return res.send("You found the secret!");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
