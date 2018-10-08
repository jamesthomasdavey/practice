const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const passport = require("passport");
const middleware = require("./../middleware")

// root route

router.get("/", (req, res) => {
  res.render("./landing", { pageTitle: "Welcome to YelpCamp" });
});

// register form route

router.get("/register", (req, res) => {
  res.render("./register", { pageTitle: "Register" });
})

// register handle route

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message + ".");
      res.redirect("/register");
    }
    else {
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
        res.redirect("/campgrounds");
      })
    }
  })
})

// login form route

router.get("/login", (req, res) => {
  res.render("./login", { pageTitle: "YelpCamp: Login" });
})

// login handle route

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {})

// logout route

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out.")
  res.redirect("/campgrounds");
})

// export

module.exports = router;
