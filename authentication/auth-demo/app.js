// import packages.
const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  // passportLocalMongoose = require("passport-local-mongoose"),
  expressSession = require("express-session"),
  // import the User model.
  User = require("./models/user");

//===============
//======== SETUP        (order matters here)
//===============

// connect mongoose to our mongodb database, give db a title of "auth-demo-app".
mongoose.connect("mongodb://localhost:27017/auth-demo-app", { useNewUrlParser: true });

// get the returned object of express() and store it in app.
const app = express();
// set view engine to ejs
app.set("view engine", "ejs");
// tell app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// sets up express-session.
app.use(expressSession({
  // secret used to encode and decode information in sessions.
  secret: "Bernie Sanders would have beat Donald Trump",
  // both these lines are required, don't know why.
  resave: false,
  saveUninitialized: false
}));

// sets up passport so that it will work in our application. both methods are important.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// these lines are responsible for reading the session, taking the data from the session, decoding (deserializing) and encoding (serializing) that data.
// tells passport to use the methods that were automatically defined on the User when we defined the schema and model, thanks to passport-local-mongoose.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//===============
//======= ROUTES
//===============

app.get("/", (req, res) => {
  res.render("./home");
});

app.get("/secret", isLoggedIn, (req, res) => {
  res.render("./secret");
});

// auth routes.

// show sign up form.
app.get("/register", (req, res) => {
  res.render("./register");
});

// handles user sign up as a post request from the form.
app.post("/register", (req, res) => {
  // register method takes 3 argments:
  // - new user from the User instance, using the username from the form.
  // - password, using the password from the form. the "register" method will hash this password to store in the database.
  // - a callback to execute after successfully registering the user, which takes 2 arguments.
  //   - error message.
  //   - the new user, which will have everything in side of it.
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    // handles error if there is one
    if (err) {
      console.log(err);
      // renders the register page again
      res.render("./register");
    }
    else {
      // logs the user in, stores the correct information, runs the serializeUser method from passport-local-mongoose, and using the localStrategy.
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secret");
      })
    }
  })
})

// show the login form.
app.get("/login", (req, res) => {
  res.render("./login");
})

// handles user login.
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), (req, res) => {

})

// handles user logout.
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

//===============
//======== SERVE
//===============

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server has started!")
})
