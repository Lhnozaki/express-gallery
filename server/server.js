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
const registerRouter = require("./routes/register");
const galleryRouter = require("./routes/gallery");
const logoutRouter = require("./routes/logout");

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

// Routes
app.use("/logout", logoutRouter);
app.use("/gallery", galleryRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
