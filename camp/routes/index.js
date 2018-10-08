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
      console.log(err);
      return res.render("./register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    })
  })
})

// login form route

router.get("/login", (req, res) => {
  res.render("./login", { pageTitle: "Login" });
})

// login handle route

router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {})

// logout route

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
})

// export

module.exports = router;
