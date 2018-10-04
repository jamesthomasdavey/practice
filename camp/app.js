// REQUIRE PACKAGES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");

// REQUIRE MODELS/JS
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

// REQUIRE ROUTES
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

// SETUP

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });

// seed database

seedDB();

// configure passport

app.use(expressSession({
  secret: "I don't sleep anymore",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use middleware, include routes as middleware

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

// run server

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Your server is running, hue man.");
});
