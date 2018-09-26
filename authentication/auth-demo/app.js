// import packages

const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  expressSession = require("express-session");

//===============
//======== SETUP        (order matters here)
//===============

// connect mongoose to our mongodb database, give db a title of "auth-demo-app"
mongoose.connect("mongodb://localhost:27017/auth-demo-app", { useNewUrlParser: true });

// get the returned object of express() and store it in app
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(expressSession({
  secret: "Bernie Sanders would have beat Donald Trump",
  resave: false,
  saveUninitialized: false
}));

// sets passport up so that it will work in our application. both methods are important.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============
//======= ROUTES
//===============

app.get("/", (req, res) => {
  res.render("./home");
})

app.get("/secret", (req, res) => {
  res.render("./secret");
})

// auth routes

app.get("/register", (req, res) => {
  res.render("./register");
})

app.post("/register", (req, res) => {
  req.body.password
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("./register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secret");
    })
  })
})

//===============
//======== SERVE
//===============

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server has started!")
})
